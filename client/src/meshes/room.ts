export class Room {
    ROOM_X;
    ROOM_Y;
    ROOM_Z;
    constructor(scene) {
        this.ROOM_X = 150;
        this.ROOM_Y = 40;
        this.ROOM_Z = 150;

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        /* Boundaries */
        var ground = BABYLON.MeshBuilder.CreateGround("ground", 
        {width: this.ROOM_Z, height: this.ROOM_X}, scene);
        ground.checkCollisions = true;

        var wall_N = BABYLON.MeshBuilder.CreateBox("myPlane", 
        {width: this.ROOM_Z, height: this.ROOM_Y, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        wall_N.position.y = this.ROOM_Y / 2;
        wall_N.position.z = this.ROOM_X / 2;
        wall_N.checkCollisions = true;

        var wall_S = BABYLON.MeshBuilder.CreateBox("myPlane", 
        {width: this.ROOM_Z, height: this.ROOM_Y, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        wall_S.position.y = this.ROOM_Y / 2;
        wall_S.position.z = -this.ROOM_X / 2;
        wall_S.checkCollisions = true;
        wall_S.rotate(BABYLON.Axis.Z, Math.PI, BABYLON.Space.WORLD);

        var wall_W = BABYLON.MeshBuilder.CreateBox("myPlane", 
        {width: this.ROOM_X, height: this.ROOM_Y, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        wall_W.position.y = this.ROOM_Y / 2;
        wall_W.position.x = -this.ROOM_Z / 2;
        wall_W.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        wall_W.rotate(BABYLON.Axis.X, Math.PI, BABYLON.Space.WORLD);
        wall_W.checkCollisions = true;

        var wall_E = BABYLON.MeshBuilder.CreateBox("myPlane", 
        {width: this.ROOM_X, height: this.ROOM_Y, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        wall_E.position.y = this.ROOM_Y / 2;
        wall_E.position.x = this.ROOM_Z / 2;
        wall_E.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        wall_E.checkCollisions = true;

        var ceiling = BABYLON.MeshBuilder.CreateBox("myPlane", 
        {width: this.ROOM_Z, height: this.ROOM_X, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        ceiling.position.y = this.ROOM_Y;
        ceiling.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);
        ceiling.checkCollisions = true;

        /* Textures */
        var ground_mat = new BABYLON.StandardMaterial("wood floor", scene);
        ground_mat.diffuseTexture = new BABYLON.Texture(
        "https://i.imgur.com/wUGRD2s.png", scene);

        var window_mat = new BABYLON.StandardMaterial("window wall", scene);
        window_mat.diffuseTexture = new BABYLON.Texture(
        "https://i.imgur.com/oqodmI9.jpeg", scene);

        var wall_mat = new BABYLON.StandardMaterial("chair wall", scene);
        wall_mat.diffuseTexture = new BABYLON.Texture(
        "https://i.imgur.com/MO034Uh.png", scene);

        var door_mat = new BABYLON.StandardMaterial("door wall", scene);
        door_mat.diffuseTexture = new BABYLON.Texture(
        "https://i.imgur.com/m6WMVCi.jpg", scene);

        var ceiling_mat = new BABYLON.StandardMaterial("ceiling", scene);
        ceiling_mat.diffuseTexture = new BABYLON.Texture(
        "https://i.imgur.com/zVW0Lmk.png", scene);

        /* Boundary Texture Selection */
        ground.material = ground_mat;
        wall_N.material = window_mat;
        wall_S.material = window_mat;
        wall_W.material = wall_mat;
        wall_E.material = door_mat;
        ceiling.material = ceiling_mat;
    }
}