export class PianoKey {
    box;
    startingNote = 36;
    
    setKeyAction(triggerKey, changeKey, soundTrigger, pressTrigger, upTrigger, pressColor, originalColor, keyNumber, startingNote, instrument, room, camera, Soundfont, audioContext) {
        triggerKey.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                    soundTrigger,
                    function () {
                        var dist = Math.sqrt(
                            Math.pow(changeKey.position.x - camera.position.x, 2) 
                            + Math.pow(changeKey.position.z - camera.position.z, 2));

                        console.log("dist away from " + instrument + ": " + dist);

                        if (dist <= 30) {
                            Soundfont.instrument(audioContext, instrument, { gain: 2 }).then(function (piano) {
                                console.log("You played " + instrument);
                                piano.play(startingNote + keyNumber).stop(audioContext.currentTime + 0.5);
                            });
                        }
                    })
        );
        const message = {noteNumber: keyNumber, ispressed: false, pressedBy: room.sessionId, instrument: ""};
        
        triggerKey.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                pressTrigger,
                function () {
                    var dist = Math.sqrt(
                        Math.pow(changeKey.position.x - camera.position.x, 2) 
                        + Math.pow(changeKey.position.z - camera.position.z, 2));
                        
                    if (dist <= 30) {
                        changeKey.material.emissiveColor = pressColor;
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
                        changeKey.material.emissiveColor = originalColor;
                        message.instrument = instrument;
                        message.ispressed = false;
                        room.send('notes', message);
                    }
                }
            )
        )
            
        // triggerKey.actionManager.registerAction(new BABYLON.SetValueAction(
        //             pressTrigger, 
        //             changeKey.material, 
        //             "emissiveColor", 
        //             pressColor
        // ));
        // triggerKey.actionManager.registerAction(new BABYLON.SetValueAction(
        //             upTrigger, 
        //             changeKey.material, 
        //             "emissiveColor", 
        //             originalColor
        // ));
    }

    constructor(scene, originalColor, pressColor, x, y, z, h, w, d, keyNumber, instrument, room, camera) {
        var Soundfont = require('soundfont-player');
        var audioContext = new AudioContext();       
        this.box = BABYLON.MeshBuilder.CreateBox("box", {height: h, width: w, depth: d}, scene);
        this.box.position = new BABYLON.Vector3(x, y, z);
        var mat = new BABYLON.StandardMaterial("ground", scene);
        mat.diffuseColor = originalColor;
        mat.specularColor = originalColor;
        mat.emissiveColor = originalColor;
        this.box.material = mat;

        this.box.actionManager = new BABYLON.ActionManager(scene);
        var keyboard = ['a', 's', 'd', 'f', 'g','h','j','k','l','q','w','e','r','t','y','u','i','o','p','1','2','3','4','5','6','7','8','9','0','z','x','c','v','b','n','m',',','.','/']
        this.setKeyAction(this.box, this.box, BABYLON.ActionManager.OnPickDownTrigger, BABYLON.ActionManager.OnPickDownTrigger, BABYLON.ActionManager.OnPickUpTrigger, pressColor, originalColor, keyNumber, this.startingNote, instrument, room, camera, Soundfont, audioContext);
        if(keyNumber < keyboard.length) {
            this.setKeyAction(scene, this.box, { trigger: BABYLON.ActionManager.OnKeyDownTrigger, parameter: keyboard[keyNumber] }, 
                { trigger: BABYLON.ActionManager.OnKeyDownTrigger, parameter: keyboard[keyNumber] }, { trigger: BABYLON.ActionManager.OnKeyUpTrigger, parameter: keyboard[keyNumber] }, pressColor, originalColor, keyNumber, this.startingNote, instrument, room, camera, Soundfont, audioContext);
        }
    }
}

export class Piano {
    pianoFrame;
    keys = [];
    constructor(x, y, z, scene, instrument, room, camera) {
        this.pianoFrame = BABYLON.SceneLoader.ImportMesh("", "", "./untitled.obj", scene, function (newMeshes) {
            // Set the target of the camera to the first imported mesh
            for(var id in newMeshes) {
                var mesh = newMeshes[id];
                var mat = new BABYLON.StandardMaterial("piano", scene);
                mat.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
                mat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
                // mat.emissiveColor = new BABYLON.Color3.Black();
                mesh.material = mat;
                mesh.scaling = new BABYLON.Vector3(2,4,2);
                mesh.position = new BABYLON.Vector3(x, y, z);
            }
        });
        var pianoStand = BABYLON.SceneLoader.ImportMesh("", "", "./stand.obj", scene, function (newMeshes) {
            // Set the target of the camera to the first imported mesh
            for(var id in newMeshes) {
                var mesh = newMeshes[id];
                var mat = new BABYLON.StandardMaterial("stand", scene);
                mat.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
                mat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
                // mat.emissiveColor = new BABYLON.Color3.Black();
                mesh.material = mat;
                mesh.scaling = new BABYLON.Vector3(2,2,2);
                mesh.position = new BABYLON.Vector3(x, y, z);
            }
        });
        
        
        var keyNumber = 0;
        for(var i = -13.5; i <= 13.5; i++) {
            if([1,2,4,5,6].includes((i+13.5) % 7)) {
                this.keys.push(new PianoKey(scene, BABYLON.Color3.Black(), BABYLON.Color3.Red(), 2.9 + x, 1.7 + y, i + z - 0.5, 0.5, 5, 0.6, keyNumber++, instrument, room, camera).box);
            }
            this.keys.push(new PianoKey(scene, new BABYLON.Color3(0.8, 0.8, 0.8), BABYLON.Color3.Red(), 3.4 + x, 1 + y, i + z, 1, 6, 0.9, keyNumber++, instrument, room, camera).box);
        }

    }
}