BandXR project demo can be found here [BANDXR](https://bandxr.herokuapp.com/)  

## User Interaction  
* Use the arrow keys (left, right, up, down) to move your character in the room.  
* Hold left click and move the mouse to turn the camera.  
* Use left click to press keys in pianos and drum.  
* Use keys (a,s,d,f...) to press keys in pianos when you standing right next to the pianos.  
* Use left click to focus the whiteboard (while focused, you can't move your character or turn around), then hold left click and drag the mouse to draw something. Reclick the white board to stop focusing on the white board.  

## Why the project is useful
BandXR is a project allow multiple users to play instruments in a virtual room. This help users stay productive by learning how to play music. Users can entertain themselves during the pandemic without spending money.
 
## What the project does
![Storyboard](/images/storyboard.png)
Due to the pandemic, musicians are stuck at home and cannot 
have in-person meetings to play music with each other. BandXR
serves as a virtual and remote way for musicians of all skill
levels to congregate and play together with the added benefit
of not having to spend money to try new instruments and bother
neighbors with loud music.

Our features consist of:

**Piano**\
![Piano](/images/feature_piano.png)
* 48-key piano for a total of 4 octaves
* Potential to change the soundfont of the piano
* Keys will flash red when pressed on

**Drum**\
![Drum](/images/feature_drum.png)
* Hitting both the head and rim of the drum makes different sounds
* The head drum will flash red and the rim will flash green when hit

**Whiteboard**\
![Whiteboard](/images/feature_whiteboard.png)
* The user may click on the whiteboard to upload any image for sheet music
* The user can drag their mouse on the whiteboard to draw or write on it

**Multiuser support**\
![Multiuser support](/images/feature_multiuser.png)
* Up to 16 users can join simultaneously (for now)
* All users can hear each other play notes in real time

**Modularity**\
![Modularity](/images/modularity.png)
Our application is handled mostly on the client side thus most of our 
reuseable code is located in the client, such as the room, instruments, 
and user objects. The server mostly utilizes Player.ts and GameRoom.ts
to update what is going on in the room.

**Architecture**\
![Architecture](/images/architecture.png)
On the client side, we used babylon.js for the graphics, soundfont-player for its
musical capability, blender for the 3D models, and Colyseus to send data to the
server. On the server side, we use Colyseus to process the client requests and
Node.js as the back-end framework.

**Dataflow**\
![Dataflow](/images/dataflow.png)
The dataflow of BandXR consists of the client sending their position,
rotation angle, and any note they are playing to the server. The server
then broadcasts the information to all other users, which their own
client then reconstructs players' movement and sound on the client side.

## How users can get started with the project
Explain and link to the general structure of the Github repository
Point to the main components of your code with links to specific repository folders

This project contains two main folders including [client](/client/) and [server](/server/). 

The client folder includes
* [dist](/client/dist) includes all the 3D model you need for the project.
* [soundfont](/client/soundfont/) includes all the music sound file for the project.
* [src](/client/src/) includes all the source code. 
* [src/index.ts](/client/src/index.ts) is the main source file that will be used to create the scene, the user and all the module. 
* [src/meshes](/client/src/meshes) is the folder that containing all the module we write for creating the room including virtual instruments, user character and the room itself. 
* [src/game](/client/src/game/network.ts) includes the network communitation pre-defined by Colyseus. 

The server folder includes 
* [server/entities](/server/src/entities/) includes class that the server use to describe a user. It also defines the data structure got communicated between the server and the client. 
* [server/rooms](server/src/rooms/) includes the code that handle all the situation related to user behavior, including when new user join the room, user send messages(position update, music sound update) through the network and user leave the room. 

To begin with our project, the most important files are listed above. In order to add a new instrument, follow the following steps. 
1. Create a new model from blender or BABYLON JS meshes, download sound file. 
2. Create a class under [client/src/meshes](/client/src/meshes/). 
3. Import the instrument in the [client/src/index.ts](/client/src/index.ts), create the instrument. 
4. Add new member variable in [server/entities](/server/src/entities/), this will be communicated between client and server. 
5. Play the corresponding sound in [client/src/index.ts](/client/src/index.ts) when client receive message from server. 
6. Recompile the project and run. 

## Who maintains and contributes to the project
Team 229  
Hongxiang Jiang, Graduate Student at UC San Diego  
Yucheng Bian, Graduate Student at UC San Diego  
Yuepeng Shen, Graduate Student at UC San Diego  
Brandon Tran, Undergraduate Student at UC San Diego  

## Where users can get help with your project
yus012@ucsd.edu Yuepeng Shen  
h9jiang@ucsd.edu Hongxiang Jiang  
blt005@ucsd.edu Brandon Tran  
y2bian@ucsd.edu Yucheng Bian  
