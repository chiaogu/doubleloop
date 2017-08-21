export class Recorder {
    recording: boolean = false;
    events: any[] = [];

    finish: (events: any[]) => void;

    toggle() {
        this.recording = !this.recording;
        if (!this.recording) {
            this.events.push({
                time: new Date(),
                id: 'END'
            });
            let track = this.events.splice(0);

            if (track.length > 2 && this.finish !== undefined) {
                this.finish(track);
            }
        } else {
            this.events.push({
                time: new Date(),
                id: 'START'
            });
        }
    }

    input(event) {
        if (this.recording) {
            this.events.push(event);
        }
    }
}
