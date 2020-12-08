export class User {
    head; 
    body;
    constructor(scene) {
        this.head = BABYLON.Mesh.CreateBox("head", 4, scene);
        this.body = BABYLON.Mesh.CreateCylinder("cylinder", 8, 6, 4, 6, 1, scene, false);
    }

    setPosition(x, y, z) {
        this.head.position.set(x, y, z);
        this.body.position.set(x, y - 7, z);
    }
    

    setRotation(x, y, z) {
        this.head.rotation.set(x, y, z);
    }

    removeMesh(scene) {
        scene.removeMesh(this.head);
        scene.removeMesh(this.body);
    }
}