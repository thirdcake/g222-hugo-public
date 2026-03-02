'use strict';
class SBCanvas {
    // ホーリーナンバー
    #number = {
        a: 38,
        b: 41.5,
        c: 39.3,
        d: 40.1,
        e: 55.8,
        f: 39.4,
        g: 36.7,
        h: 65.7,
        i: 49,
        j: 50,
        k: 61.9,
        l: 7.8,
        m: 15,
    }

    // 制御用
    #config = {
        start: false,
        animationID: undefined,
        prevTimestamp: undefined,
        angle: 0,
        width: 300,
        height: 150,
    }
    // 点の位置
    #pointsL = {
        rotate: 1,
        A0: { x: 112, y: 50 },
        M0: {},
        M1: {},
        B1: {},
        C1: {},
        D1: {},
        F1: {},
        H1: {},
    }
    #pointsR = {
        rotate: -1,
        A0: { x: 188, y: 50 },
        M0: {},
    }
    #dom = document.createElement('canvas');
    #ctx;  // 2d context
    constructor() {
        this.#ctx = this.#dom.getContext('2d');
        this.#dom.width = this.#config.width;
        this.#dom.height = this.#config.height;
        this.#dom.style.width = '100%';
        this.#dom.style.height = 'auto';
        this.#dom.style.maxWidth = '500px';
        this.#dom.style.display = 'block';

        this.#pointsL.M0 = { x: this.#pointsL.A0.x + this.#number.a, y: this.#pointsL.A0.y - this.#number.l }
        this.#pointsR.M0 = { x: this.#pointsR.A0.x - this.#number.a, y: this.#pointsR.A0.y - this.#number.l };

    }
    get canvas() {
        return this.#dom;
    }
    drawCanvas(angle) {
        this.#ctx.clearRect(0, 0, this.#config.width, this.#config.height);
        this.#drawFrame(this.#pointsL, angle, 'skyblue');
        this.#drawFrame(this.#pointsR, angle, 'skyblue');
        this.#drawFrame(this.#pointsL, angle - Math.PI, 'red');
        this.#drawFrame(this.#pointsR, angle - Math.PI, 'red');
    }
    // 機構を描画
    #drawFrame(points, angle, color = 'red') {
        points.M1 = { x: points.M0.x + Math.cos(angle) * this.#number.m, y: points.M0.y + Math.sin(angle) * this.#number.m };
        points.B1 = this.#triangle(points.M1, points.A0, this.#number.j, this.#number.b, points.rotate);
        points.C1 = this.#triangle(points.A0, points.M1, this.#number.c, this.#number.k, points.rotate);
        points.D1 = this.#triangle(points.B1, points.A0, this.#number.e, this.#number.d, points.rotate);
        points.F1 = this.#triangle(points.D1, points.C1, this.#number.f, this.#number.g, points.rotate);
        points.H1 = this.#triangle(points.F1, points.C1, this.#number.h, this.#number.i, points.rotate);

        this.#ctx.strokeStyle = color;
        this.#ctx.beginPath();
        this.#ctx.moveTo(points.M0.x, points.M0.y);
        this.#ctx.lineTo(points.M1.x, points.M1.y);
        this.#ctx.lineTo(points.B1.x, points.B1.y);
        this.#ctx.lineTo(points.A0.x, points.A0.y);
        this.#ctx.lineTo(points.C1.x, points.C1.y);
        this.#ctx.lineTo(points.M1.x, points.M1.y);
        this.#ctx.moveTo(points.B1.x, points.B1.y);
        this.#ctx.lineTo(points.D1.x, points.D1.y);
        this.#ctx.lineTo(points.A0.x, points.A0.y);
        this.#ctx.moveTo(points.D1.x, points.D1.y);
        this.#ctx.lineTo(points.F1.x, points.F1.y);
        this.#ctx.lineTo(points.C1.x, points.C1.y);
        this.#ctx.lineTo(points.H1.x, points.H1.y);
        this.#ctx.lineTo(points.F1.x, points.F1.y);
        this.#ctx.closePath();
        this.#ctx.stroke();
    }
    //点Aと点Bの座標と辺AC,BCの長さから点Cを求める。
    #triangle(pointA, pointB, AC, BC, rotate = 1) {
        const dx = pointB.x - pointA.x,
            dy = pointB.y - pointA.y,
            AB = Math.sqrt(dx ** 2 + dy ** 2);

        const cosA = (AB ** 2 + AC ** 2 - BC ** 2) / (2 * AC * AB),
            sinA = Math.sqrt(1 - cosA ** 2) * rotate;

        const pointC = {
            x: (cosA * dx - sinA * dy) * AC / AB + pointA.x,
            y: (sinA * dx + cosA * dy) * AC / AB + pointA.y,
        }
        return pointC;
    }
    startStop() {
        if (this.#config.start === false) {
            this.#config.start = true;
            this.#config.prevTimestamp = performance.now();
            this.#step(performance.now());
        } else {
            cancelAnimationFrame(this.#config.animationID);
            this.#config.start = false;
        }
    }

    #step = (timestamp) => {
        this.#config.angle += (this.#config.prevTimestamp - timestamp) / 500;
        this.#config.angle %= 2 * Math.PI;
        this.drawCanvas(this.#config.angle);
        this.#config.prevTimestamp = timestamp;
        this.#config.animationID = window.requestAnimationFrame(this.#step);
    }

}

class StrandBeest extends HTMLElement {
    constructor() {
        super();

        const canvas = new SBCanvas();
        this.appendChild(canvas.canvas);

        const btn = this.createButton();
        this.appendChild(btn);
        
        canvas.drawCanvas(0);
        btn.addEventListener('click', ()=>{ canvas.startStop() }, false);
    }


    createButton() {
        const div = document.createElement('div');
        const btn = document.createElement('button');
        btn.textContent = 'Start/Stop';
        btn.classList.add('btn', 'btn-outline-primary');
        div.appendChild(btn);
        return div;
    }

}

// 実行
customElements.define("strand-beest", StrandBeest);
