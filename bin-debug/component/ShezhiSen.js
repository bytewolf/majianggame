/**
 *
 * @author
 *
 */
var ShezhiSen = (function (_super) {
    __extends(ShezhiSen, _super);
    function ShezhiSen() {
        _super.call(this);
        this.skinName = "resource/SKIN/Shezhi.exml";
        this.bgSound.minimum = 0; //定义最小值
        this.bgSound.maximum = 100; //定义最大值
        this.bgSound.value = 100; //定义默认值
        this.yxSound.minimum = 0; //定义最小值
        this.yxSound.maximum = 100; //定义最大值
        this.yxSound.value = 100; //定义默认值
        this.qingsongPng.touchEnabled = false;
        this.youxianPng.touchEnabled = false;
        this.jingdianPng.touchEnabled = false;
        this.qingsongBtn.name = "0";
        this.youxianBtn.name = "1";
        this.jingdianBtn.name = "2";
        this.qingsongPng.visible = true;
        this.qingsongPng.visible = false;
        this.youxianPng.visible = false;
        this.jingdianPng.visible = false;
    }
    var d = __define,c=ShezhiSen,p=c.prototype;
    p.start = function () {
        var bgss;
        if (egret.localStorage.getItem("bgsound")) {
            bgss = egret.localStorage.getItem("bgsound");
        }
        else {
            bgss = "0";
        }
        switch (bgss) {
            case "0":
                this.qingsongPng.visible = true;
                break;
            case "1":
                this.youxianPng.visible = true;
                break;
            case "2":
                this.jingdianPng.visible = true;
                break;
            default:
                break;
        }
        console.log(egret.localStorage.getItem("yxnum"));
        if (egret.localStorage.getItem("yxnum")) {
            this.yxSound.value = Number(egret.localStorage.getItem("yxnum")) * 100;
        }
        console.log(egret.localStorage.getItem("bgyxnum"));
        if (egret.localStorage.getItem("bgyxnum")) {
            this.bgSound.value = Number(egret.localStorage.getItem("bgyxnum")) * 100;
        }
        this.closeBtn.touchEnabled = true;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.qingsongBtn.touchEnabled = true;
        this.qingsongBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBg, this);
        this.youxianBtn.touchEnabled = true;
        this.youxianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBg, this);
        this.jingdianBtn.touchEnabled = true;
        this.jingdianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBg, this);
        this.yxSound.addEventListener(eui.UIEvent.CHANGE_END, this.yxchangeHandler, this);
        this.bgSound.addEventListener(eui.UIEvent.CHANGE_END, this.changeHandler, this);
        if (ViewManager.getInstance().gameView.quanNumText.visible == true) {
            this.jiesanBtn.visible = true;
            this.jiesanBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jiesanHandler, this);
        }
    };
    p.jiesanHandler = function (event) {
        ServerManager.getInstance().senDissolve("Y");
    };
    p.onBg = function (event) {
        this.qingsongPng.visible = false;
        this.youxianPng.visible = false;
        this.jingdianPng.visible = false;
        switch (event.target.name) {
            case "0":
                this.qingsongPng.visible = true;
                break;
            case "1":
                this.youxianPng.visible = true;
                break;
            case "2":
                this.jingdianPng.visible = true;
                break;
            default:
                break;
        }
        SoundManager.getInstance().playBG(event.target.name);
    };
    p.changeHandler = function (evt) {
        SoundManager.getInstance().setBgVol(evt.target.value);
    };
    p.yxchangeHandler = function (evt) {
        SoundManager.getInstance().setYxVol(evt.target.value);
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
        this.qingsongBtn.touchEnabled = false;
        this.qingsongBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBg, this);
        this.youxianBtn.touchEnabled = false;
        this.youxianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBg, this);
        this.jingdianBtn.touchEnabled = false;
        this.jingdianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBg, this);
        this.yxSound.removeEventListener(eui.UIEvent.CHANGE_END, this.yxchangeHandler, this);
        this.bgSound.removeEventListener(eui.UIEvent.CHANGE_END, this.changeHandler, this);
    };
    return ShezhiSen;
}(eui.Component));
egret.registerClass(ShezhiSen,'ShezhiSen');
//# sourceMappingURL=ShezhiSen.js.map