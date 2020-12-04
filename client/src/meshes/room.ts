export class Room {
    constructor(scene) {
        const ROOM_X = 150;
        const ROOM_Y = 40;
        const ROOM_Z = 150;

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        /* Boundaries */
        var ground = BABYLON.MeshBuilder.CreateGround("ground", 
        {width: ROOM_Z + 10, height: ROOM_X + 10}, scene);
        ground.checkCollisions = true;

        var wall_N = BABYLON.MeshBuilder.CreatePlane("myPlane", 
        {width: ROOM_Z + 10, height: ROOM_Y + 10, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        wall_N.position.y = ROOM_Y / 2;
        wall_N.position.z = ROOM_X / 2;
        wall_N.checkCollisions = true;

        var wall_S = BABYLON.MeshBuilder.CreatePlane("myPlane", 
        {width: ROOM_Z + 10, height: ROOM_Y + 10, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        wall_S.position.y = ROOM_Y / 2;
        wall_S.position.z = -ROOM_X / 2;
        wall_S.checkCollisions = true;

        var wall_W = BABYLON.MeshBuilder.CreatePlane("myPlane", 
        {width: ROOM_X + 10, height: ROOM_Y + 10, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        wall_W.position.y = ROOM_Y / 2;
        wall_W.position.x = -ROOM_Z / 2;
        wall_W.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        wall_W.checkCollisions = true;

        var wall_E = BABYLON.MeshBuilder.CreatePlane("myPlane", 
        {width: ROOM_X + 10, height: ROOM_Y + 10, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        wall_E.position.y = ROOM_Y / 2;
        wall_E.position.x = ROOM_Z / 2;
        wall_E.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        wall_E.checkCollisions = true;

        var ceiling = BABYLON.MeshBuilder.CreatePlane("myPlane", 
        {width: ROOM_Z, height: ROOM_X, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        ceiling.position.y = ROOM_Y;
        ceiling.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);
        // ceiling.checkCollisions = true;

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