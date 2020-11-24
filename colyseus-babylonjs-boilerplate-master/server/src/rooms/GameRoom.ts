import { Room, Client } from "colyseus";

import { StateHandler } from "./StateHandler";
import { Player } from "../entities/Player";

export class GameRoom extends Room<StateHandler> {
    maxClients = 8;

    onCreate (options) {
        this.setSimulationInterval(() => this.onUpdate());
        this.setState(new StateHandler());
        this.onMessage("position", (client, message) => {
            this.state.players.get(client.sessionId).newCoordinate = message;
        });
    }

    onJoin (client) {
        const player = new Player();
        player.name = `Player ${ this.clients.length }`;
        player.position.x = Math.random();
        player.position.y = Math.random();
        player.position.z = Math.random();

        this.state.players.set(client.sessionId, player);
    }

    onUpdate () {
        this.state.players.forEach((player, sessionId) => {
            // player.position.x = player.pressedKeys.x;
            // player.position.z = player.pressedKeys.y;
            player.position.x = player.newCoordinate.x;
            player.position.z = player.newCoordinate.z;
        });
    }

    onLeave (client: Client) {
        this.state.players.delete(client.sessionId);
    }

    onDispose () {
    }

}
