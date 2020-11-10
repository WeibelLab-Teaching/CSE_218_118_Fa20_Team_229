/**
 * File: room_prototype.js
 * Author: Brandon Tran
 * Date: 11/6/2020
 * 
 * Description:
 * This program generates the scene, camera and its properties, 
 * and an empty rehearsal room with textures found on the internet.
 * 
 * I used 5 planes and 1 ground object to create this room. There is an
 * unfortunate bug of being able to clip through walls for some reason
 * (especially around the corners). I haven't figured out a good way
 * to prevent this without creating a box. As a side note, the player
 * may use WASD to move. Collision has been applied and works.
 * Gravity is enabled, though it may not be necessary.
 * 
 * I didn't use a box to make the room because I didn't understand 
 * how to use different textures for individual sides of a box. Another issue 
 * is that textures are applied from outside the box, so they will look
 * mirrored to the player since they are looking from inside the box.
 * I may try to solve these issues later, but right now it looks like
 * it is more trouble than it is worth.
 */

var createScene = function () {

    // CONSTANTS
    const ROOM_X = 150;
    const ROOM_Y = 40;
    const ROOM_Z = 150;

    const PLAYER_HEIGHT = 10;

    /* Scene */
    var scene = new BABYLON.Scene(engine);

    /* Camera */
    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera(
        "camera1", new BABYLON.Vector3(0, 2*PLAYER_HEIGHT, 0), scene);

    camera.setTarget(new BABYLON.Vector3(0, PLAYER_HEIGHT, ROOM_Z));

    // Player camera
    camera.ellipsoid = new BABYLON.Vector3(1, PLAYER_HEIGHT, 1);

    // Jump?

    // Gravity and collision
    scene.gravity = new BABYLON.Vector3(0, -1, 0);
    camera.applyGravity = true; 
    scene.collisionsEnabled = true;
    camera.checkCollisions = true;  

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // Move camera using keyboard
    camera.keysUp.push(87); // w
    camera.keysLeft.push(65); // a
    camera.keysDown.push(83); // s
    camera.keysRight.push(68); // d
    camera.speed = 1.5;

    /* Light */
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // light.diffuse = new BABYLON.Color3(1, 1, 1);
    // light.specular = new BABYLON.Color3(1, 1, 1);
    light.groundColor = new BABYLON.Color3(1, 1, 1);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

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

    /* Objects */
    // None at the moment

    return scene;
};

