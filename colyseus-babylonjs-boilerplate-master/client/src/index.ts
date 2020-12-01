import "./index.css";

import * as BABYLON from "babylonjs";
import 'babylonjs-loaders';
import Keycode from "keycode.js";
import { client } from "./game/network";
import { StateHandler } from "../../server/src/rooms/StateHandler";
import { Coordinate } from "../../server/src/entities/Player";
import { WhiteBoard } from "./meshes/whiteboard";
import { Piano } from "./meshes/piano";
import { Room } from "./meshes/room";

const canvas = document.getElementById('game') as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true);

// This creates a basic Babylon Scene object (non-mesh)
var scene = new BABYLON.Scene(engine);
scene.actionManager = new BABYLON.ActionManager(scene);
scene.gravity = new BABYLON.Vector3(0, -1, 0);
scene.collisionsEnabled = true;

const PLAYER_HEIGHT = 15;

var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 0.7;
light.groundColor = new BABYLON.Color3(1, 1, 1);
light.intensity = 0.7;

// Set camera to follow current player
var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 2*PLAYER_HEIGHT, 0), scene);
camera.attachControl(canvas, true);
camera.applyGravity = true; 
camera.checkCollisions = true;
camera.setTarget(new BABYLON.Vector3(0, PLAYER_HEIGHT, 150)); // Look at the north wall
camera.ellipsoid = new BABYLON.Vector3(1, PLAYER_HEIGHT, 1);
camera.speed = 1.0;
console.log("camera created!");

// Colyseus / Join Room
client.joinOrCreate<StateHandler>("game").then(room => {
    const playerViews: {[id: string]: BABYLON.Mesh} = {};

    const keyState = [];

    for(let i=0;i<48;i++) {
        keyState.push([false, false]);
    }

    room.state.players.onAdd = function(player, key) {
        if (key === room.sessionId) {
            // Don't change the position of piano before talking to Yuepeng!!
            const piano1x = 25, piano1y = 16, piano1z = 35;
            const piano2x = 25, piano2y = 16, piano2z = -35;
            var virtualRoom = new Room(scene); 
            var pianoSample1 = new Piano(piano1x, piano1y, piano1z, scene, "celesta", room, camera);
            var pianoSample2 = new Piano(piano2x, piano2y, piano2z, scene, "piano", room, camera);
            var whiteboard1 = new WhiteBoard(16, 10, piano1x, piano1y,piano1z, scene, pianoSample1.pianoFrame.Mesh, camera, canvas);
            player.position.y = 2 * PLAYER_HEIGHT;
            camera.position.set(player.position.x, player.position.y, player.position.z);
        } else {
            playerViews[key] = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

            // Move the sphere upward 1/2 its height
            player.position.y = 2*PLAYER_HEIGHT;
            playerViews[key].position.set(player.position.x, player.position.y, player.position.z);

            // Update player position based on changes from the server.
            player.position.onChange = () => {
                playerViews[key].position.set(player.position.x, player.position.y, player.position.z);
            };
            console.log("here");

            const keys = [player.keyA1, player.keyA2, player.keyA3, player.keyA4,
                player.keyA5, player.keyA6, player.keyA7, player.keyA8, player.keyA9, 
                player.keyA10, player.keyA11, player.keyA12, player.keyB1, player.keyB2, player.keyB3, 
                player.keyB4, player.keyB5, player.keyB6, player.keyB7, player.keyB8, 
                player.keyB9, player.keyB10, player.keyB11, player.keyB12, player.keyC1, player.keyC2,
                player.keyC3, player.keyC4, player.keyC5, player.keyC6, player.keyC7,
                player.keyC8, player.keyC9, player.keyC10, player.keyC11, player.keyC12, player.keyD1, 
                player.keyD2, player.keyD3, player.keyD4, player.keyD5, player.keyD6,
                player.keyD7, player.keyD8, player.keyD9, player.keyD10, player.keyD11, player.keyD12]  
            for(let i=0;i<keys.length;i++) {
                keys[i].onChange = () => {
                    // 0 is piano
                    if (keyState[i][0] != keys[i].ispressed) {
                        if (keys[i].pressedBy != room.sessionId) {
                            if (keys[i].ispressed) 
                                console.log(String(i) + " of piano is pressed");
                            else console.log(String(i) + " of piano is released!");
                        }
                        keyState[i][0] = keys[i].ispressed
                    }
                    // 1 is celesta
                    if (keyState[i][1] != keys[i].ispressed2) {
                        if (keys[i].pressedBy2 != room.sessionId) {
                            if (keys[i].ispressed2) 
                                console.log(String(i) + " of celesta is pressed");
                            else console.log(String(i) + " of celesta is released!");
                        }
                        keyState[i][1] = keys[i].ispressed2
                    }
                    // if (keys[i].pressedBy != room.sessionId) {
                    //     if (keys[i].ispressed) 
                    //         console.log(String(i) + " is pressed");
                    //     else console.log(String(i) + " is released!");
                    // }
                }
            }
        }
    };

    room.state.players.onRemove = function(player, key) {
        scene.removeMesh(playerViews[key]);
        delete playerViews[key];
    };

    room.onStateChange((state) => {
        console.log("New room state:", state.toJSON());
    });

    // Keyboard listeners
    const keyboard: Coordinate = { x: 0, z: 0 };
    window.addEventListener("keydown", function(e) {
        if (e.which === Keycode.LEFT || e.which === Keycode.RIGHT || e.which === Keycode.UP || e.which === Keycode.DOWN) {
            keyboard.x = camera.position.x;
            keyboard.z = camera.position.z;
            room.send('position', keyboard);
        }
    });

    window.addEventListener("keyup", function(e) {
        if (e.which === Keycode.LEFT || e.which === Keycode.RIGHT || e.which === Keycode.UP || e.which === Keycode.DOWN) {
            keyboard.x = camera.position.x;
            keyboard.z = camera.position.z;
            room.send('position', keyboard);
        }
    });

    // Resize the engine on window resize
    window.addEventListener('resize', function() {
        engine.resize();
    });
});

// Scene render loop
engine.runRenderLoop(function() {
    scene.render();
});