/**
 *
 * @author
 *
 */
var ShangchengSen = (function (_super) {
    __extends(ShangchengSen, _super);
    function ShangchengSen() {
        _super.call(this);
        this.skinName = "resource/SKIN/Shangcheng.exml";
    }
    var d = __define,c=ShangchengSen,p=c.prototype;
    p.start = function () {
        this.closeBtn.touchEnabled = true;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.jinbiBtn.touchEnabled = true;
        this.jinbiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJinbi, this);
        this.daojuBtn.touchEnabled = true;
        this.daojuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaoju, this);
    };
    p.onDaoju = function (event) {
        this.jinbuGroup.visible = false;
        this.daojuGroup.visible = true;
    };
    p.onJinbi = function (event) {
        this.jinbuGroup.visible = true;
        this.daojuGroup.visible = false;
    };
    p.onClose = function (event) {
        if (event === void 0) { event = null; }
        this.end();
        if (this.parent)
            this.parent.removeChild(this);
    };
    //结束界面，释放监听
    p.end = function (str) {
        if (str === void 0) { str = null; }
        this.closeBtn.touchEnabled = false;
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    };
    return ShangchengSen;
}(eui.Component));
egret.registerClass(ShangchengSen,'ShangchengSen');
//# sourceMappingURL=ShangchengSen.js.map