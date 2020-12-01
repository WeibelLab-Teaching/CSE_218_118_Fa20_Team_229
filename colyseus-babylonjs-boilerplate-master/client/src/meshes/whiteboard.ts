import * as BABYLON from "babylonjs";
import 'babylonjs-loaders';

export class WhiteBoard {
    whiteBoard;
    setKeyAction(board, context, texture, camera, scene, size, canvas) {
        this.whiteBoard.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction (
                {
                    trigger: BABYLON.ActionManager.OnDoublePickTrigger
                },
                function() {
                    var x;
                    var pdf = prompt("Please enter your sheet music URL");
                    if (pdf!=null){
                        console.log("pdf not empty");
                        //board_mat.diffuseTexture = new BABYLON.Texture(pdf, scene);
                        
                        var img = new Image();
                        img.crossOrigin = "anonymous";
                        img.src = pdf;
                        img.onload = function() {
                            console.log(img.width + " " + img.height + " " + board.width);
                            context.drawImage(this, 0, 0, img.width, img.height, 0, 0, 520, 480);
                            texture.update();
                        }
                        //board_mat.diffuseTexture = new BABYLON.Texture(        
                        //    "https://i.imgur.com/AyZgq.png", scene);
                    }
                }
            )
        );

        var stable = false;
        this.whiteBoard.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction (
                {
                    trigger: BABYLON.ActionManager.OnPickTrigger
                },
                function() {
                    stable = true;
                    console.log(camera.angularSensibility);
                    camera.speed = 0;
                    camera.angularSensibility = 10000000;
                }
            )
        )
        .then(
            new BABYLON.ExecuteCodeAction (
                {
                    trigger: BABYLON.ActionManager.OnPickTrigger
                },
                function() {
                    stable = false;
                    camera.speed = 1.5;
                    camera.angularSensibility = 2000;
                }
            )
        );
            
            
        var draw = false;
        var onPointerDown = function (eyt) {
            draw = true;
        };
        var onPointerUp = function (eyt) {
            draw = false;
        }
        var onPointerMove = function (eyt) {
            if (draw && stable) {
                var pickResult = scene.pick(scene.pointerX, scene.pointerY);		
                var texcoords = pickResult.getTextureCoordinates();
                
                var centerX = texcoords.x * size.width;
                var centerY = size.height - texcoords.y * size.height;
                var radius = 1;

                // draw circle
                context.beginPath();
                context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                context.fillStyle = 'red';
                context.fill();
                context.lineWidth = 4;
                context.strokeStyle = 'red';
                context.stroke();

                texture.update(true);
            }
        };
        var content = this.whiteBoard.content;
        //"https://i.imgur.com/AyZgq.png"
        canvas.addEventListener("pointerdown", onPointerDown, false);
        canvas.addEventListener("pointerup", onPointerUp, false);
        canvas.addEventListener("pointermove", onPointerMove, false);
    }

    constructor(w, h, x, y, z, scene, parent, camera, canvas) {
        this.whiteBoard = BABYLON.MeshBuilder.CreatePlane("whiteboard",         
            {width: w, height: h}, scene);
        this.whiteBoard.parent = parent;
        this.whiteBoard.position.x = x - 5;   
        this.whiteBoard.position.y = y + 10;
        this.whiteBoard.position.z = z;
        this.whiteBoard.rotate(BABYLON.Axis.Y,  Math.PI * 1.5, BABYLON.Space.WORLD);
        this.whiteBoard.rotate(BABYLON.Axis.Z,  Math.PI * 0.2, BABYLON.Space.WORLD);
        this.whiteBoard.checkCollisions = true;
            
        var board_mat = new BABYLON.StandardMaterial("sheet music", scene);
        var texture = new BABYLON.DynamicTexture("dynamicTexture", 512, scene, false);
        board_mat.diffuseTexture = texture;
        this.whiteBoard.material = board_mat;
        var font = "bold 30px monospace";
        texture.drawText("Upload you sheet music here", 20, 45, font, "grey", "white", true, true);
        var context = texture.getContext();
        var size = texture.getSize();
        this.whiteBoard.actionManager = new BABYLON.ActionManager(scene);
        this.setKeyAction(this.whiteBoard, context, texture, camera, scene, size, canvas);
    }
}