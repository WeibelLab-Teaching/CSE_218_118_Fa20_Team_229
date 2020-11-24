import { Schema, type } from "@colyseus/schema";

export interface PressedKeys {
    x: number;
    y: number;
}

export interface Coordinate {
    x: number;
    z: number;
}

export class Position extends Schema {
    @type("number") x: number = 0;
    @type("number") y: number = 0;
    @type("number") z: number = 0;
}

export class Player extends Schema {
    @type("string") name: string;
    @type(Position) position = new Position();

    newCoordinate: Coordinate = { x: 0, z: 0 };
    pressedKeys: PressedKeys = { x: 0, y: 0 };
}
