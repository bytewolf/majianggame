/**
 * @kenson
 * 对象池管理类
 */
var GamePool = (function () {
    function GamePool() {
        this._pool1 = [];
        this._pool2 = [];
        this._pool3 = [];
        this._pool4 = [];
    }
    var d = __define,c=GamePool,p=c.prototype;
    GamePool.getInstance = function () {
        if (!this._instance)
            this._instance = new GamePool();
        return this._instance;
    };
    p.setJilu = function (bb) {
        this._pool4.push(bb);
    };
    p.getJilu = function () {
        var res;
        if (this._pool1.length) {
            res = this._pool4.shift();
        }
        else {
            res = new Jilulist();
        }
        return res;
    };
    p.setPNG = function (bb, num) {
        if (num === void 0) { num = 1; }
        bb.name = null;
        bb.texture = null;
        if (num == 1)
            this._pool1.push(bb);
        else if (num == 2)
            this._pool2.push(bb);
        else if (num == 3)
            this._pool3.push(bb);
    };
    p.getPNG = function (num) {
        if (num === void 0) { num = 1; }
        var res;
        if (num == 1) {
            if (this._pool1.length) {
                res = this._pool1.shift();
            }
            else {
                res = new eui.Image();
            }
        }
        else if (num == 2) {
            if (this._pool2.length) {
                res = this._pool2.shift();
            }
            else {
                res = new eui.Image();
            }
        }
        else if (num == 3) {
            if (this._pool3.length) {
                res = this._pool3.shift();
            }
            else {
                res = new eui.Image();
            }
        }
        res.visible = true;
        res.x = 0;
        res.y = 0;
        res.alpha = 1;
        res.name = null;
        return res;
    };
    return GamePool;
}());
egret.registerClass(GamePool,'GamePool');
//# sourceMappingURL=GamePool.js.map