import { AudioContext } from 'angular-audio-context';

export class AnimFramePlayer {
    cursor: number = 0;
    notes: any[] = [];
    playing: boolean = false;

    preTime: number;
    progress: number = 0;

    buffers: any;
    audio: AudioContext;

    onStateChange: (event) => void;

    constructor(audio: AudioContext, buffers: any) {
        this.audio = audio;
        this.buffers = buffers;
    }

    setNotes(notes: any[]) {
        this.notes = notes;
    }

    play() {
        this.preTime = new Date().getTime();
        this.playing = true;
        this.tick();

        this.output('play');
    }

    pause() {
        this.playing = false;

        this.output('pause');
    }

    stop() {
        this.playing = false;
        this.progress = 0;
        this.cursor = 0;

        this.output('stop');
    }

    toggle() {
        this.playing = !this.playing;
        if (this.playing) {
            this.play();
        } else {
            this.pause();
        }
    }

    output(event) {
        if (this.onStateChange) {
            this.onStateChange(event);
        }
    }

    tick() {
        let now = new Date().getTime();
        let duration = now - this.preTime;
        this.progress += duration;
        this.preTime = now;

        let next = this.notes[this.cursor].time;
        if (this.progress >= next) {
            let buffer = this.buffers[this.notes[this.cursor].id];
            if (buffer !== undefined) {
                let bufferSource = this.audio.createBufferSource();
                bufferSource.buffer = buffer;
                bufferSource.connect(this.audio.destination);
                bufferSource.start(0);
            }

            this.cursor++;
        }

        if (this.cursor >= this.notes.length) {
            this.stop();
        }

        if (this.playing) {
            requestAnimationFrame(this.tick.bind(this))
        }
    }
}