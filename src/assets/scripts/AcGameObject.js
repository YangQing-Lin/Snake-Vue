const AC_GAME_OBJECTS = [];

export class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);
        this.timedelta = 0;
        this.has_called_start = false;
    }

    start() {

    }

    update() {

    }

    late_update() {

    }

    on_destroy() {

    }

    destroy() {
        this.on_destroy();

        for (let i in AC_GAME_OBJECTS) {
            const obj = AC_GAME_OBJECTS[i];
            if (obj === this) {
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;
const step = timestamp => {
    for (let obj of AC_GAME_OBJECTS) {
        if (!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    for (let obj of AC_GAME_OBJECTS) {
        obj.late_update();
    }

    last_timestamp = timestamp;
    requestAnimationFrame(step);
};

requestAnimationFrame(step);