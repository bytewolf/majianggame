/**
 *
 * @author
 *
 */
var Redigit = (function (_super) {
    __extends(Redigit, _super);
    function Redigit() {
        _super.call(this);
        this.skinName = "resource/SKIN/Redigit.exml";
    }
    var d = __define,c=Redigit,p=c.prototype;
    p.start = function () {
        this.closeBtn.touchEnabled = true;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.regitBtn.touchEnabled = true;
        this.regitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBg, this);
    };
    p.onBg = function (event) {
        if (this.nameTxt.text.length > 4) {
            WinManager.getInstance().showWin("昵称不能超过4个字");
            return;
        }
        if (this.idTxt.text.length > 18) {
            WinManager.getInstance().showWin("昵称不能超过18个字");
            return;
        }
        if (this.idTxt.text == "" || this.passwordTxt.text == "" || this.passwordTxt2.text == "" || this.nameTxt.text == "") {
            WinManager.getInstance().showWin("请输入完整信息");
            return;
        }
        if (this.passwordTxt.text != this.passwordTxt2.text) {
            WinManager.getInstance().showWin("两次密码不一致，请检查");
            return;
        }
        ServerManager.getInstance().onRedigit(this.idTxt.text, this.passwordTxt.text, this.nameTxt.text);
    };
    p.onClose = function (event) {
        this.end();
        this.parent.removeChild(this);
    };
    //结束界面，释放监听
    p.end = function (str) {
        if (str === void 0) { str = null; }
        this.closeBtn.touchEnabled = false;
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.regitBtn.touchEnabled = false;
        this.regitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBg, this);
    };
    return Redigit;
}(eui.Component));
egret.registerClass(Redigit,'Redigit');
//# sourceMappingURL=Redigit.js.map