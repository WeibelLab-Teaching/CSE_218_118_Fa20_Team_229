"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.Key = exports.Rotation = exports.Position = void 0;
const schema_1 = require("@colyseus/schema");
class Position extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}
__decorate([
    schema_1.type("number")
], Position.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], Position.prototype, "y", void 0);
__decorate([
    schema_1.type("number")
], Position.prototype, "z", void 0);
exports.Position = Position;
class Rotation extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}
__decorate([
    schema_1.type("number")
], Rotation.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], Rotation.prototype, "y", void 0);
__decorate([
    schema_1.type("number")
], Rotation.prototype, "z", void 0);
exports.Rotation = Rotation;
class Key extends schema_1.Schema {
    constructor(kN) {
        super();
        this.instrumentId = 0;
        this.ispressed = false;
        this.ispressed2 = false;
        this.keyNumber = 0;
        this.pressedBy = "";
        this.pressedBy2 = "";
        this.keyNumber = kN;
    }
}
__decorate([
    schema_1.type("number")
], Key.prototype, "instrumentId", void 0);
__decorate([
    schema_1.type("boolean")
], Key.prototype, "ispressed", void 0);
__decorate([
    schema_1.type("boolean")
], Key.prototype, "ispressed2", void 0);
__decorate([
    schema_1.type("number")
], Key.prototype, "keyNumber", void 0);
__decorate([
    schema_1.type("string")
], Key.prototype, "pressedBy", void 0);
__decorate([
    schema_1.type("string")
], Key.prototype, "pressedBy2", void 0);
exports.Key = Key;
class Player extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.position = new Position();
        this.rotation = new Rotation();
        this.keyA1 = new Key(0);
        this.keyA2 = new Key(1);
        this.keyA3 = new Key(2);
        this.keyA4 = new Key(3);
        this.keyA5 = new Key(4);
        this.keyA6 = new Key(5);
        this.keyA7 = new Key(6);
        this.keyA8 = new Key(7);
        this.keyA9 = new Key(8);
        this.keyA10 = new Key(9);
        this.keyA11 = new Key(10);
        this.keyA12 = new Key(11);
        this.keyB1 = new Key(12);
        this.keyB2 = new Key(13);
        this.keyB3 = new Key(14);
        this.keyB4 = new Key(15);
        this.keyB5 = new Key(16);
        this.keyB6 = new Key(17);
        this.keyB7 = new Key(18);
        this.keyB8 = new Key(19);
        this.keyB9 = new Key(20);
        this.keyB10 = new Key(21);
        this.keyB11 = new Key(22);
        this.keyB12 = new Key(23);
        this.keyC1 = new Key(24);
        this.keyC2 = new Key(25);
        this.keyC3 = new Key(26);
        this.keyC4 = new Key(27);
        this.keyC5 = new Key(28);
        this.keyC6 = new Key(29);
        this.keyC7 = new Key(30);
        this.keyC8 = new Key(31);
        this.keyC9 = new Key(32);
        this.keyC10 = new Key(33);
        this.keyC11 = new Key(34);
        this.keyC12 = new Key(35);
        this.keyD1 = new Key(36);
        this.keyD2 = new Key(37);
        this.keyD3 = new Key(38);
        this.keyD4 = new Key(39);
        this.keyD5 = new Key(40);
        this.keyD6 = new Key(41);
        this.keyD7 = new Key(42);
        this.keyD8 = new Key(43);
        this.keyD9 = new Key(44);
        this.keyD10 = new Key(45);
        this.keyD11 = new Key(46);
        this.keyD12 = new Key(47);
        // @type(Key) key2A1 = new Key(0);
        // @type(Key) key2A2 = new Key(1);
        // @type(Key) key2A3 = new Key(2);
        // @type(Key) key2A4 = new Key(3);
        // @type(Key) key2A5 = new Key(4);
        // @type(Key) key2A6 = new Key(5);
        // @type(Key) key2A7 = new Key(6);
        // @type(Key) key2A8 = new Key(7);
        // @type(Key) key2A9 = new Key(8);
        // @type(Key) key2A10 = new Key(9);
        // @type(Key) key2A11 = new Key(10);
        // @type(Key) key2A12 = new Key(11);
        // @type(Key) key2B1 = new Key(12);
        // @type(Key) key2B2 = new Key(13);
        // @type(Key) key2B3 = new Key(14);
        // @type(Key) key2B4 = new Key(15);
        // @type(Key) key2B5 = new Key(16);
        // @type(Key) key2B6 = new Key(17);
        // @type(Key) key2B7 = new Key(18);
        // @type(Key) key2B8 = new Key(19);
        // @type(Key) key2B9 = new Key(20);
        // @type(Key) key2B10 = new Key(21);
        // @type(Key) key2B11 = new Key(22);
        // @type(Key) key2B12 = new Key(23);
        // @type(Key) key2C1 = new Key(24);
        // @type(Key) key2C2 = new Key(25);
        // @type(Key) key2C3 = new Key(26);
        // @type(Key) key2C4 = new Key(27);
        // @type(Key) key2C5 = new Key(28);
        // @type(Key) key2C6 = new Key(29);
        // @type(Key) key2C7 = new Key(30);
        // @type(Key) key2C8 = new Key(31);
        // @type(Key) key2C9 = new Key(32);
        // @type(Key) key2C10 = new Key(33);
        // @type(Key) key2C11 = new Key(34);
        // @type(Key) key2C12 = new Key(35);
        // @type(Key) key2D1 = new Key(36);
        // @type(Key) key2D2 = new Key(37);
        // @type(Key) key2D3 = new Key(38);
        // @type(Key) key2D4 = new Key(39);
        // @type(Key) key2D5 = new Key(40);
        // @type(Key) key2D6 = new Key(41);
        // @type(Key) key2D7 = new Key(42);
        // @type(Key) key2D8 = new Key(43);
        // @type(Key) key2D9 = new Key(44);
        // @type(Key) key2D10 = new Key(45);
        // @type(Key) key2D11 = new Key(46);
        // @type(Key) key2D12 = new Key(47);
        this.newCoordinate = { x: 0, y: 0, z: 0 };
        this.newRotation = { x: 0, y: 0, z: 0 };
    }
}
__decorate([
    schema_1.type("string")
], Player.prototype, "name", void 0);
__decorate([
    schema_1.type(Position)
], Player.prototype, "position", void 0);
__decorate([
    schema_1.type(Rotation)
], Player.prototype, "rotation", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyA1", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyA2", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyA3", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyA4", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyA5", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyA6", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyA7", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyA8", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyA9", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyA10", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyA11", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyA12", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyB1", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyB2", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyB3", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyB4", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyB5", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyB6", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyB7", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyB8", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyB9", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyB10", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyB11", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyB12", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyC1", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyC2", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyC3", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyC4", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyC5", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyC6", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyC7", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyC8", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyC9", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyC10", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyC11", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyC12", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyD1", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyD2", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyD3", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyD4", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyD5", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyD6", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyD7", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyD8", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyD9", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyD10", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyD11", void 0);
__decorate([
    schema_1.type(Key)
], Player.prototype, "keyD12", void 0);
exports.Player = Player;
