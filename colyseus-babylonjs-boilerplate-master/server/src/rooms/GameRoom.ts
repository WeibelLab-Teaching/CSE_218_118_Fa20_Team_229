import { Room, Client } from "colyseus";

import { StateHandler } from "./StateHandler";
import { Player } from "../entities/Player";

export class GameRoom extends Room<StateHandler> {
    maxClients = 8;

    onCreate (options) {
        this.setSimulationInterval(() => this.onUpdate());
        this.setState(new StateHandler());

        this.onMessage("key", (client, message) => {
            this.state.players.get(client.sessionId).pressedKeys = message;
        });

        this.onMessage("notes", (client, message) => {
            this.state.players.forEach((player, sessionId) => {
                const keys = [player.keyA1, player.keyA2, player.keyA3, player.keyA4,
                    player.keyA5, player.keyA6, player.keyA7, player.keyA8, player.keyA9, 
                    player.keyA10, player.keyA11, player.keyA12, player.keyB1, player.keyB2, player.keyB3, 
                    player.keyB4, player.keyB5, player.keyB6, player.keyB7, player.keyB8, 
                    player.keyB9, player.keyB10, player.keyB11, player.keyB12, player.keyC1, player.keyC2,
                    player.keyC3, player.keyC4, player.keyC5, player.keyC6, player.keyC7,
                    player.keyC8, player.keyC9, player.keyC10, player.keyC11, player.keyC12, player.keyD1, 
                    player.keyD2, player.keyD3, player.keyD4, player.keyD5, player.keyD6,
                    player.keyD7, player.keyD8, player.keyD9, player.keyD10, player.keyD11, player.keyD12]  
                keys[message.noteNumber].ispressed = Boolean(message.ispressed);
                keys[message.noteNumber].pressedBy = message.pressedBy;
            });
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
            player.position.x += player.pressedKeys.x * 0.1;
            player.position.z -= player.pressedKeys.y * 0.1;
        });
    }

    onLeave (client: Client) {
        this.state.players.delete(client.sessionId);
    }

    onDispose () {
    }

}
