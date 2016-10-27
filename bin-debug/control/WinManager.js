/**
 *
 * @author
 *提示框
 */
var WinManager = (function (_super) {
    __extends(WinManager, _super);
    function WinManager() {
        _super.call(this);
        this.isLogin = false;
        this.skinName = "resource/SKIN/WinMsg.exml";
        this.init();
    }
    var d = __define,c=WinManager,p=c.prototype;
    /**
     * 这里初始化
     */
    p.init = function () {
        this.visible = false;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
    };
    p.showWin = function (str) {
        this.visible = true;
        this.txt.text = str;
    };
    /**
     * closewin
     */
    p.closeWin = function () {
        this.visible = false;
    };
    p.jiesan = function () {
        this.visible = true;
        this.txt.text = "房主离开房间，房间自动解散，是否解散";
        this.YBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabBtn1, this);
        this.NBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabBtn2, this);
        this.NBtn.visible = true;
        this.YBtn.visible = true;
    };
    p.onTouchTabBtn1 = function (event) {
        ServerManager.getInstance().exitGame();
        this.unableBtn();
    };
    p.onTouchTabBtn2 = function (event) {
        this.unableBtn();
    };
    p.dissolve = function (obj) {
        if (this.dissolveid == obj.id) {
            return;
        }
        this.dissolveid = obj.id;
        this.visible = true;
        this.txt.text = "是否同意解散房间";
        this.YBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabBtn, this);
        this.NBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabBtnN, this);
        this.NBtn.visible = true;
        this.YBtn.visible = true;
    };
    p.onTouchTabBtn = function (event) {
        ServerManager.getInstance().senDissolve("Y", this.dissolveid);
        this.unableBtn();
    };
    p.onTouchTabBtnN = function (event) {
        ServerManager.getInstance().senDissolve("N", this.dissolveid);
        this.unableBtn();
    };
    p.unableBtn = function () {
        this.YBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabBtn, this);
        this.NBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabBtnN, this);
        this.YBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabBtn1, this);
        this.NBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabBtn2, this);
        this.NBtn.visible = false;
        this.YBtn.visible = false;
        this.visible = false;
    };
    p.onTouchTab = function (e) {
        this.visible = false;
    };
    WinManager.getInstance = function () {
        if (WinManager.instance == null) {
            WinManager.instance = new WinManager();
        }
        return WinManager.instance;
    };
    return WinManager;
}(eui.Component));
egret.registerClass(WinManager,'WinManager');
//# sourceMappingURL=WinManager.js.map