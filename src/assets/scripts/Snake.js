import { AcGameObject } from "./AcGameObject"
import { Cell } from "./Cell";

export class Snake extends AcGameObject {
    constructor(ctx, game_map) {
        super();
        this.ctx = ctx;
        this.game_map = game_map;

        this.cells = [];
        this.color = "#4876EC";
        this.dirs = [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
        ];
        this.direction = 1;
        this.eps = 0.07;
        this.speed = 8;  // 每秒钟走几格
        this.apple_cell = new Cell(-1, -1);
        this.apple_img = new Image();
        this.apple_img.src = "https://app2556.acapp.acwing.com.cn:4431/static/images/apple.png";
        this.eating = false;  // 是否吃到苹果
        this.tail_cell = null;  // 临时存放蛇尾
    }

    start() {
        // 蛇头会用两节来表示，一节影分身用来实现过渡动画
        this.cells.push(new Cell(4, 7))
        for (let i = 4; i >= 1; i--) {
            this.cells.push(new Cell(i, 7));
        }

        this.put_an_apple();
    }

    put_an_apple() {
        const positions = new Set();
        // 加入所有的位置
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 15; j++) {
                positions.add(`${i}-${j}`);
            }
        }

        // 从中删除蛇身
        for (let cell of this.cells) {
            positions.delete(`${cell.i}-${cell.j}`);
        }

        // 从所有空的位置中随机找一个生成苹果
        const items = Array.from(positions);
        if (items.length === 0) {
            this.game_map.win();
        } else {
            let [x, y] = items[Math.floor(Math.random() * items.length)].split('-');
            x = parseInt(x), y = parseInt(y);
            this.apple_cell = new Cell(x, y);
        }
    }

    // 计算两个点的方向
    get_direction(a, b) {
        if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps) {
            return -1;
        }
        // 如果在同一条水平线上，那么只有上下两个方向
        if (Math.abs(a.x - b.x) < this.eps) {
            if (b.y < a.y) return 0;  // 上
            return 2;  // 下
        }
        // 接下来是水平方向的判断
        if (b.x > a.x) {
            return 1;  // 右
        }
        return 3;  // 左
    }

    // 判断是否创死了
    check_die() {
        const head = this.cells[0];
        if (head.i < 0 || head.i >= 17 || head.j < 0 || head.j >= 15) {
            return true;
        }

        for (let i = 2; i < this.cells.length; i++) {
            if (head.i === this.cells[i].i && head.j === this.cells[i].j) {
                return true;
            }
        }

        return false;
    }

    update_body() {
        const k = this.cells.length - 1;
        // 通过最后两节的位置来计算蛇尾的移动方向
        const d = this.get_direction(this.cells[k], this.cells[k - 1]);
        if (d >= 0) {
            // 计算一帧的移动距离
            const distance = this.speed * this.timedelta / 1000;
            // 蛇尾的移动
            this.cells[k].x += this.dirs[d].x * distance;
            this.cells[k].y += this.dirs[d].y * distance;

            // 蛇头的移动
            this.cells[0].x += this.dirs[this.direction].x * distance;
            this.cells[0].y += this.dirs[this.direction].y * distance;
        } else {
            const new_cells = [];
            // 计算蛇头的横坐标位置
            const headi = this.cells[1].i + this.dirs[this.direction].x;
            const headj = this.cells[1].j + this.dirs[this.direction].y;
            new_cells.push(new Cell(headi, headj));
            new_cells.push(new Cell(headi, headj));
            for (let i = 1; i < k; i++) {
                new_cells.push(this.cells[i]);
            }
            this.cells = new_cells;

            // 如果正在吃的话就要真的变长，也就是将蛇尾残影加到数组里
            if (this.eating) {
                this.cells.push(this.tail_cell);
                this.eating = false;
                this.tail_cell = null;
            }

            // 从缓存中读取操作
            const ds = this.game_map.directions;
            // 删除和当前方向相同或相反的操作
            // 0 ^ 2 = 2 | 2 ^ 2 = 0 | 1 ^ 2 = 3 | 3 ^ 2 = 1
            while (ds.length > 0 && (ds[0] === this.direction || ds[0] === (this.direction ^ 2))) {
                ds.splice(0, 1);
            }

            if (ds.length > 0) {
                this.direction = ds[0];
                ds.splice(0, 1);
            }

            // 每次走到下一格的时候才需要判断是否创死了
            if (this.check_die()) {
                this.game_map.lose();
            }

            // 判断是否吃到苹果
            if (headi === this.apple_cell.i && headj === this.apple_cell.j) {
                this.eating = true;
                const cell = this.cells[this.cells.length - 1];
                this.tail_cell = new Cell(cell.i, cell.j);
                this.put_an_apple();

                // 吃到苹果后加分
                // 更新全局变量的分数（调用mutations里面的函数需要用commit）
                const score = this.game_map.store.state.score + 1;
                this.game_map.store.commit('updateScore', score);
                this.game_map.store.commit('updateRecord', score);
            }
        }
    }

    update() {
        // 只有游戏状态才需要更新位置
        if (this.game_map.status === "playing") {
            this.update_body();
        }
        this.render();
    }

    render() {
        const L = this.game_map.L;
        const mag = 0.8;  // 蛇宽度占格子宽度的百分比
        this.ctx.fillStyle = this.color;

        // 如果吃了就要把蛇尾残影加到数组里
        if (this.eating) {
            this.cells.push(this.tail_cell);
        }

        // 渲染苹果图片
        this.ctx.drawImage(
            this.apple_img,
            this.apple_cell.i * L, this.apple_cell.j * L
            , L, L
        );

        // 绘制蛇身的圆
        for (let cell of this.cells) {
            this.ctx.beginPath();
            this.ctx.arc(cell.x * L, cell.y * L, L / 2 * mag, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // 绘制蛇身的矩形
        for (let i = 1; i < this.cells.length; i++) {
            const a = this.cells[i - 1], b = this.cells[i];
            if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps) {
                continue;
            }
            if (Math.abs(a.x - b.x) < this.eps) {
                // 上下方向
                // TODO 为什么这里用a.x？
                this.ctx.fillRect((a.x - 0.5) * L + (1 - mag) / 2 * L, Math.min(a.y, b.y) * L, L * mag, Math.abs(a.y - b.y) * L);
            } else {
                // 水平方向
                this.ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.5) * L + (1 - mag) / 2 * L, Math.abs(a.x - b.x) * L, L * mag);
            }
        }

        // 删除残影
        if (this.eating) {
            this.cells.pop();
        }
    }
}