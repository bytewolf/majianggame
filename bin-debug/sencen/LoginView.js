/**
 *
 * @author
 *
 */
var LoginView = (function (_super) {
    __extends(LoginView, _super);
    function LoginView() {
        _super.call(this);
        this.skinName = "resource/SKIN/LoginSkin.exml";
        this.jizhuGou.visible = false;
        this.jizhuGou.$touchEnabled = false;
        this.tongyiGou.$touchEnabled = false;
    }
    var d = __define,c=LoginView,p=c.prototype;
    p.start = function () {
        this.loginBtn.touchEnabled = true;
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.jizhuBtn.touchEnabled = true;
        this.jizhuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJizhuClick, this);
        this.tongyiBtn.touchEnabled = true;
        this.tongyiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTongyiClick, this);
        this.quiteBtn.touchEnabled = true;
        this.quiteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuiteiClick, this);
        this.wxBtn.touchEnabled = true;
        this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWXClick, this);
        this.searchPassBtn.touchEnabled = true;
        this.searchPassBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSearchClick, this);
        this.regitBtn.touchEnabled = true;
        this.regitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegitClick, this);
        this.wanfaBtn.touchEnabled = true;
        this.wanfaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWanfaClick, this);
        if (egret.localStorage.getItem("jizhumima")) {
            this.jizhuGou.visible = true;
            this.idTxt.text = egret.localStorage.getItem("id");
            this.passwordTxt.text = egret.localStorage.getItem("pwd");
        }
    };
    /**
    *玩法介绍
    */
    p.onWanfaClick = function (e) {
        console.log("玩法介绍");
    };
    /**
    *注册
    */
    p.onRegitClick = function (e) {
        if (this.redigitSen == null) {
            this.redigitSen = new Redigit();
        }
        this.redigitSen.start();
        this.addChild(this.redigitSen);
    };
    /**
    *找回密码
    */
    p.onSearchClick = function (e) {
        console.log("找回密码");
    };
    /**
    *微信登录
    */
    p.onWXClick = function (e) {
        console.log("微信登录");
    };
    /**
    *快速游戏
    */
    p.onQuiteiClick = function (e) {
        if (this.tongyiGou.visible == false) {
            console.log("需要先同意协议");
            return;
        }
        ServerManager.getInstance().onQuickGame();
    };
    /**
    *同意协议
    */
    p.onTongyiClick = function (e) {
        this.tongyiGou.visible = !this.tongyiGou.visible;
        if (this.tongyiGou.visible == true) {
            SoundManager.getInstance().playYx("1_mp3", false);
        }
        else {
            SoundManager.getInstance().playYx("1_mp3", true);
        }
    };
    /**
    *记住密码
    */
    p.onJizhuClick = function (e) {
        this.jizhuGou.visible = !this.jizhuGou.visible;
    };
    p.onButtonClick2 = function (e) {
        console.log("需要先同意协议222222222");
    };
    /**
     *登录按钮
     */
    p.onButtonClick = function (e) {
        if (this.tongyiGou.visible == false) {
            console.log("需要先同意协议");
            return;
        }
        if (this.jizhuGou.visible == true) {
            egret.localStorage.setItem("jizhumima", "1");
            egret.localStorage.setItem("id", this.idTxt.text);
            egret.localStorage.setItem("pwd", this.passwordTxt.text);
        }
        else {
            egret.localStorage.removeItem("jizhumima");
            egret.localStorage.removeItem("id");
            egret.localStorage.removeItem("pwd");
        }
        ServerManager.getInstance().onLogin(this.idTxt.text, this.passwordTxt.text);
        // var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
        // changeEvent.eventType = ServerManager.LOGIN_SUCC;
        // changeEvent.obj = ViewManager.getInstance().getChildAt(0);
        // ViewManager.getInstance().dispatchEvent(changeEvent);
    };
    /**
    *获取注册成功
    */
    p.getRedigit = function (obj) {
        this.redigitSen.end();
        this.removeChild(this.redigitSen);
    };
    //结束界面，释放监听
    p.end = function () {
        this.loginBtn.touchEnabled = false;
        this.loginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.jizhuBtn.touchEnabled = false;
        this.jizhuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJizhuClick, this);
        this.tongyiBtn.touchEnabled = false;
        this.tongyiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTongyiClick, this);
        this.quiteBtn.touchEnabled = false;
        this.quiteBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuiteiClick, this);
        this.wxBtn.touchEnabled = false;
        this.wxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onWXClick, this);
        this.searchPassBtn.touchEnabled = false;
        this.searchPassBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSearchClick, this);
        this.regitBtn.touchEnabled = false;
        this.regitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegitClick, this);
        this.wanfaBtn.touchEnabled = false;
        this.wanfaBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onWanfaClick, this);
    };
    return LoginView;
}(eui.Component));
egret.registerClass(LoginView,'LoginView');
//# sourceMappingURL=LoginView.js.map