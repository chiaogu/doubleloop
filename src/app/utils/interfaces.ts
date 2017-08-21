export interface Brick {
    id: string;
    name: string;
    color: string;
    url: string;
}

export interface BrickPressEvent {
    brick: Brick,
    time: Date
}

export interface Config {
    row: number;
    column: number;
    bricks: any;
    keys: any;
}


export interface IPlayer {
    onStateChange: (event) => void;
    progress: number;
    setNotes:(notes: any[]) => void;
    play: () => void;
    pause: () => void;
    stop: () => void;
    toggle: () => void;
}