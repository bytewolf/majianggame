/**
 *
 * @author 
 *
 */
class Redigit extends eui.Component {
    /**
     *等待界面
     */
    public regitBtn: eui.Image;
    public idTxt: eui.EditableText;
    public nameTxt: eui.EditableText;
    public passwordTxt: eui.EditableText;
    public passwordTxt2: eui.EditableText;
    public closeBtn: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/SKIN/Redigit.exml";
    }
    public start() {
        this.closeBtn.touchEnabled = true;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

        this.regitBtn.touchEnabled = true;
        this.regitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBg, this);

    }
    private onBg(event: egret.TouchEvent): void {
        if (this.nameTxt.text.length > 4) {
            WinManager.getInstance().showWin("昵称不能超过4个字")
            return;
        }
        if (this.idTxt.text.length > 18) {
            WinManager.getInstance().showWin("昵称不能超过18个字")
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
    }
    private onClose(event: egret.TouchEvent): void {
        this.end();
        this.parent.removeChild(this);
    }
    //结束界面，释放监听
    public end(str: string = null) {
        this.closeBtn.touchEnabled = false;
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

        this.regitBtn.touchEnabled = false;
        this.regitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBg, this);

    }
}
