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

export class Key extends Schema {
    @type("number") instrumentId: number = 0;
    @type("boolean") ispressed: boolean = false;
    @type("boolean") ispressed2: boolean = false;
    @type("number") keyNumber: number = 0;
    @type("string") pressedBy: String = "";
    @type("string") pressedBy2: String = "";
    constructor(kN) {
        super();
        this.keyNumber = kN;
    }
}

export class Player extends Schema {
    @type("string") name: string;
    @type(Position) position = new Position();
    @type(Key) keyA1 = new Key(0);
    @type(Key) keyA2 = new Key(1);
    @type(Key) keyA3 = new Key(2);
    @type(Key) keyA4 = new Key(3);
    @type(Key) keyA5 = new Key(4);
    @type(Key) keyA6 = new Key(5);
    @type(Key) keyA7 = new Key(6);
    @type(Key) keyA8 = new Key(7);
    @type(Key) keyA9 = new Key(8);
    @type(Key) keyA10 = new Key(9);
    @type(Key) keyA11 = new Key(10);
    @type(Key) keyA12 = new Key(11);
    @type(Key) keyB1 = new Key(12);
    @type(Key) keyB2 = new Key(13);
    @type(Key) keyB3 = new Key(14);
    @type(Key) keyB4 = new Key(15);
    @type(Key) keyB5 = new Key(16);
    @type(Key) keyB6 = new Key(17);
    @type(Key) keyB7 = new Key(18);
    @type(Key) keyB8 = new Key(19);
    @type(Key) keyB9 = new Key(20);
    @type(Key) keyB10 = new Key(21);
    @type(Key) keyB11 = new Key(22);
    @type(Key) keyB12 = new Key(23);
    @type(Key) keyC1 = new Key(24);
    @type(Key) keyC2 = new Key(25);
    @type(Key) keyC3 = new Key(26);
    @type(Key) keyC4 = new Key(27);
    @type(Key) keyC5 = new Key(28);
    @type(Key) keyC6 = new Key(29);
    @type(Key) keyC7 = new Key(30);
    @type(Key) keyC8 = new Key(31);
    @type(Key) keyC9 = new Key(32);
    @type(Key) keyC10 = new Key(33);
    @type(Key) keyC11 = new Key(34);
    @type(Key) keyC12 = new Key(35);
    @type(Key) keyD1 = new Key(36);
    @type(Key) keyD2 = new Key(37);
    @type(Key) keyD3 = new Key(38);
    @type(Key) keyD4 = new Key(39);
    @type(Key) keyD5 = new Key(40);
    @type(Key) keyD6 = new Key(41);
    @type(Key) keyD7 = new Key(42);
    @type(Key) keyD8 = new Key(43);
    @type(Key) keyD9 = new Key(44);
    @type(Key) keyD10 = new Key(45);
    @type(Key) keyD11 = new Key(46);
    @type(Key) keyD12 = new Key(47);
    
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
    

    newCoordinate: Coordinate = { x: 0, z: 0 };
    pressedKeys: PressedKeys = { x: 0, y: 0 };
}
