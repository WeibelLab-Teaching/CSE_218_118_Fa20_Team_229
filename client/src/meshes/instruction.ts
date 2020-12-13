import * as BABYLON from "babylonjs";
import 'babylonjs-loaders';

export class Instruction {
    instruction;
    constructor(w, h, x, y, scene) {
        this.instruction = BABYLON.MeshBuilder.CreateBox("myPlane", 
        {width: w, height: h, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene); 
        this.instruction.position.z = 40;
        this.instruction.position.y = y;
        this.instruction.position.x = x;
        this.instruction.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        this.instruction.rotate(BABYLON.Axis.X, Math.PI, BABYLON.Space.WORLD);
        this.instruction.checkCollisions = true;
            
        var mat = new BABYLON.StandardMaterial("wood floor", scene);
        mat.diffuseTexture = new BABYLON.Texture(
        "./instruction.png", scene);
        this.instruction.material = mat;
    }
}