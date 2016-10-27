/**
 * @kenson  
 * 对象池管理类
 */
class GamePool {
    public _pool1: eui.Image[];
    public _pool2: eui.Image[];
    public _pool3: eui.Image[];
    public _pool4: Jilulist[];

    private static _instance: GamePool;

    public constructor() {
        this._pool1 = [];
        this._pool2 = [];
        this._pool3 = [];
        this._pool4 = [];
    }
    public static getInstance(): GamePool {
        if (!this._instance)
            this._instance = new GamePool();
        return this._instance;
    }
    public setJilu(bb: Jilulist): void {
        this._pool4.push(bb);
    }
    public getJilu(): Jilulist {
        var res: Jilulist;
        if (this._pool1.length) {
            res = this._pool4.shift();
        } else {
            res = new Jilulist();
        }
        return res
    }
    public setPNG(bb: eui.Image, num: Number = 1): void {
        bb.name = null;
        bb.texture = null;
        if (num == 1)
            this._pool1.push(bb);
        else if (num == 2)
            this._pool2.push(bb);
        else if (num == 3)
            this._pool3.push(bb);
    }
    public getPNG(num: Number = 1): eui.Image {
        var res: eui.Image;
        if (num == 1) {
            if (this._pool1.length) {
                res = this._pool1.shift();
            } else {
                res = new eui.Image();
            }
        } else if (num == 2) {
            if (this._pool2.length) {
                res = this._pool2.shift();
            } else {
                res = new eui.Image();
            }
        } else if (num == 3) {
            if (this._pool3.length) {
                res = this._pool3.shift();
            } else {
                res = new eui.Image();
            }
        }
        res.visible = true;
        res.x = 0;
        res.y = 0;
        res.alpha = 1;
        res.name = null;
        return res;
    }
}
