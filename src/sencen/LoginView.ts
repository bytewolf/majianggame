/**
 *
 * @author 
 *
 */
class LoginView extends eui.Component {
    public tongyiBtn: eui.Button;
    public jizhuBtn: eui.Button;
    public tongyiGou: eui.Button;
    public jizhuGou: eui.Button;
    public quiteBtn: eui.Button;
    public wxBtn: eui.Button;
    public searchPassBtn: eui.Button;
    public loginBtn: eui.Button;
    public wanfaBtn: eui.Button;
    public regitBtn: eui.Button;
    public idTxt: eui.EditableText;
    public passwordTxt: eui.EditableText;
    private redigitSen: Redigit;
    public constructor() {
        super();
        this.skinName = "resource/SKIN/LoginSkin.exml";
        this.jizhuGou.visible = false;
        this.jizhuGou.$touchEnabled = false;
        this.tongyiGou.$touchEnabled = false;

    }
    public start() {
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

    }
    /**
    *玩法介绍
    */
    private onWanfaClick(e: egret.TouchEvent) {
        console.log("玩法介绍");
    }
    /**
    *注册
    */
    private onRegitClick(e: egret.TouchEvent) {
        if (this.redigitSen == null) {
            this.redigitSen = new Redigit();
        }
        this.redigitSen.start();
        this.addChild(this.redigitSen);
    }
    /**
    *找回密码
    */
    private onSearchClick(e: egret.TouchEvent) {
        console.log("找回密码");
    }
    /**
    *微信登录
    */
    private onWXClick(e: egret.TouchEvent) {
        console.log("微信登录");

    }
    /**
    *快速游戏
    */
    private onQuiteiClick(e: egret.TouchEvent) {
        if (this.tongyiGou.visible == false) {
            console.log("需要先同意协议");
            return;
        }
        ServerManager.getInstance().onQuickGame();
    }
    /**
    *同意协议
    */
    private onTongyiClick(e: egret.TouchEvent) {
        this.tongyiGou.visible = !this.tongyiGou.visible;
        if(this.tongyiGou.visible ==true)
        {
            SoundManager.getInstance().playYx("1_mp3", false);
        }else
        {
            SoundManager.getInstance().playYx("1_mp3", true);
        }
    }
    /**
    *记住密码
    */
    private onJizhuClick(e: egret.TouchEvent) {
        this.jizhuGou.visible = !this.jizhuGou.visible;
    }

    private onButtonClick2(e: egret.TouchEvent) {
        console.log("需要先同意协议222222222");
    }
    /**
     *登录按钮
     */
    private onButtonClick(e: egret.TouchEvent) {
        if (this.tongyiGou.visible == false) {
            console.log("需要先同意协议");
            return;
        }

        if (this.jizhuGou.visible == true) {
            egret.localStorage.setItem("jizhumima", "1");
            egret.localStorage.setItem("id", this.idTxt.text);
            egret.localStorage.setItem("pwd", this.passwordTxt.text);
        } else {
            egret.localStorage.removeItem("jizhumima");
            egret.localStorage.removeItem("id");
            egret.localStorage.removeItem("pwd");
        }
        ServerManager.getInstance().onLogin(this.idTxt.text, this.passwordTxt.text);

        // var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
        // changeEvent.eventType = ServerManager.LOGIN_SUCC;
        // changeEvent.obj = ViewManager.getInstance().getChildAt(0);
        // ViewManager.getInstance().dispatchEvent(changeEvent);
    }
    /**
    *获取注册成功
    */
    public getRedigit(obj: any) {
        this.redigitSen.end();
        this.removeChild(this.redigitSen);
    }
    //结束界面，释放监听
    public end() {
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

    }
}
