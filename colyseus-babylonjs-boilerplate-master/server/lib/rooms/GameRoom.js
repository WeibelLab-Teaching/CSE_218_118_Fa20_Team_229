"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoom = void 0;
const colyseus_1 = require("colyseus");
const StateHandler_1 = require("./StateHandler");
const Player_1 = require("../entities/Player");
class GameRoom extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 8;
    }
    onCreate(options) {
        this.setSimulationInterval(() => this.onUpdate());
        this.setState(new StateHandler_1.StateHandler());
        this.onMessage("key", (client, message) => {
            this.state.players.get(client.sessionId).pressedKeys = message;
        });
    }
    onJoin(client) {
        const player = new Player_1.Player();
        player.name = `Player ${this.clients.length}`;
        player.position.x = Math.random();
        player.position.y = Math.random();
        player.position.z = Math.random();
        this.state.players.set(client.sessionId, player);
    }
    onUpdate() {
        this.state.players.forEach((player, sessionId) => {
            player.position.x += player.pressedKeys.x * 0.1;
            player.position.z -= player.pressedKeys.y * 0.1;
        });
    }
    onLeave(client) {
        this.state.players.delete(client.sessionId);
    }
    onDispose() {
    }
}
exports.GameRoom = GameRoom;
