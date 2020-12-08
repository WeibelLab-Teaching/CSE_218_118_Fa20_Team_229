"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const colyseus_1 = require("colyseus");
const GameRoom_1 = require("./rooms/GameRoom");
exports.port = process.env.PORT || 2657;
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "..", "client", "dist")));
// Create HTTP & WebSocket servers
const server = http_1.default.createServer(app);
const gameServer = new colyseus_1.Server({
    server: server,
    express: app
});
gameServer.define("game", GameRoom_1.GameRoom);
server.listen(exports.port);
console.log(`Listening on ${exports.port}`);
