import { Vector3 } from "babylonjs";

export class Drum {
    head;
    rim;
    leg;

    setKeyAction(triggerKey, changeKey, soundTrigger, pressTrigger, upTrigger, pressColor, originalColor, startingNote, instrument, room, camera, Soundfont, audioContext) {
        triggerKey.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                    soundTrigger,
                    function () {
                        
                        var dist = Math.sqrt(
                            Math.pow(changeKey.position.x - camera.position.x, 2) 
                            + Math.pow(changeKey.position.z - camera.position.z, 2));

                        console.log(instrument + " located at (" 
                            + changeKey.position.x + ", " + changeKey.position.z + ")");

                        console.log("dist away from " + instrument + ": " + dist);

                        if (dist <= 30) {
                            var loudness = 2;

                            if (instrument == "woodblock"){
                                loudness = 5;
                            }

                            Soundfont.instrument(audioContext, instrument, { gain: loudness }).then(function (drum) {
                                console.log("You played " + instrument);
                                drum.play(startingNote).stop(audioContext.currentTime + 0.05);
                            });
                        }
                    })
        );
        const message = {noteNumber: 0, ispressed: false, pressedBy: room.sessionId, instrument: ""};
        
        triggerKey.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                pressTrigger,
                function () {
                    var dist = Math.sqrt(
                        Math.pow(changeKey.position.x - camera.position.x, 2) 
                        + Math.pow(changeKey.position.z - camera.position.z, 2));
                        
                    if (dist <= 30) {
                        changeKey.material.diffuseColor = pressColor;
                        message.instrument = instrument;
                        message.ispressed = true;
                        room.send('notes', message);
                        console.log("sent");
                    }
                }
            )
        );
        triggerKey.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                upTrigger,
                function () {
                    var dist = Math.sqrt(
                        Math.pow(changeKey.position.x - camera.position.x, 2) 
                        + Math.pow(changeKey.position.z - camera.position.z, 2));
                            
                    if (dist <= 30) {
                        changeKey.material.diffuseColor = originalColor;
                        message.instrument = instrument;
                        message.ispressed = false;
                        room.send('notes', message);
                    }
                }
            )
        )
    }

    constructor(x, y, z, scene, room, camera) {
        var Soundfont = require('soundfont-player');
        var audioContext = new AudioContext(); 

        // Drum head
        this.head = BABYLON.MeshBuilder.CreateCylinder("drum head", {height: 4, diameter: 10}, scene);
        this.head.position = new BABYLON.Vector3(x, y, z);
        this.head.actionManager = new BABYLON.ActionManager(scene);

        var mat = new BABYLON.StandardMaterial("drum head", scene);
        mat.diffuseColor = new BABYLON.Color3(1.2, 1.2, 1.1);
        this.head.material = mat;

        // Drum rim
        var myPath = [
            new BABYLON.Vector3(0, -2, 0),
            new BABYLON.Vector3(0, 2, 0)];

        this.rim = BABYLON.MeshBuilder.CreateTube("drum rim", {path: myPath, radius: 5}, scene);
        this.rim.position = new BABYLON.Vector3(x, y, z);
        this.rim.actionManager = new BABYLON.ActionManager(scene);

        var mat = new BABYLON.StandardMaterial("drum rim", scene);
        mat.diffuseColor = new BABYLON.Color3(1.1, 0.3, 0.3);
        this.rim.material = mat;
        

        // Leg 1
        this.leg = BABYLON.MeshBuilder.CreateCylinder("drum leg", {height: 16, diameter: 0.5}, scene);
        this.leg.position = new BABYLON.Vector3(x + 3, y / 2, z - 5);
        this.leg.rotation = new Vector3(Math.PI/8, -Math.PI/8, 0);

        var mat = new BABYLON.StandardMaterial("drum leg", scene);
        mat.diffuseColor = new BABYLON.Color3(1, 0.5, 0.5);
        this.leg.material = mat;
        
        // Leg 2
        this.leg = BABYLON.MeshBuilder.CreateCylinder("drum leg", {height: 16, diameter: 0.5}, scene);
        this.leg.position = new BABYLON.Vector3(x + 3, y / 2, z + 5);
        this.leg.rotation = new Vector3(-Math.PI/8, Math.PI/8, 0);

        var mat = new BABYLON.StandardMaterial("drum leg", scene);
        mat.diffuseColor = new BABYLON.Color3(1, 0.5, 0.5);
        this.leg.material = mat;

        // Leg 3
        this.leg = BABYLON.MeshBuilder.CreateCylinder("drum leg", {height: 16, diameter: 0.5}, scene);
        this.leg.position = new BABYLON.Vector3(x - 5, y / 2, z);
        this.leg.rotation = new Vector3(0, 0, -Math.PI/8);

        var mat = new BABYLON.StandardMaterial("drum leg", scene);
        mat.diffuseColor = new BABYLON.Color3(1, 0.5, 0.5);
        this.leg.material = mat;

     
        this.setKeyAction(this.head, this.head, BABYLON.ActionManager.OnPickDownTrigger, BABYLON.ActionManager.OnPickDownTrigger, BABYLON.ActionManager.OnPickUpTrigger, 
            new BABYLON.Color3(1.2, 0.8, 0.8), new BABYLON.Color3(1.2, 1.2, 1.1), 70, "gunshot", room, camera, Soundfont, audioContext);

        this.setKeyAction(this.rim, this.rim, BABYLON.ActionManager.OnPickDownTrigger, BABYLON.ActionManager.OnPickDownTrigger, BABYLON.ActionManager.OnPickUpTrigger, 
            new BABYLON.Color3(0.6, 1.1, 0.6), new BABYLON.Color3(1.1, 0.3, 0.3), 76, "woodblock", room, camera, Soundfont, audioContext);

    }
}