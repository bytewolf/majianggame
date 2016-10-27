/**
 *
 * @author 
 *提示框
 */
class WinManager extends eui.Component {
    public constructor() {
        super();
        this.skinName = "resource/SKIN/WinMsg.exml";
        this.init();
    }

    private static instance: WinManager;
    private txt: eui.Label;
    private closeBtn: eui.Image;
    public YBtn: eui.Button;
    public NBtn: eui.Button;

	/**
	 * 这里初始化
	 */
    private init() {
        this.visible = false;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
    }
    private isLogin: Boolean = false;
    public showWin(str: string): void {
        this.visible = true;
        this.txt.text = str;
    }
    /**
     * closewin
     */
    public closeWin() {
        this.visible=false;
    }
    public jiesan() {
        this.visible = true;
        this.txt.text = "房主离开房间，房间自动解散，是否解散";
        this.YBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabBtn1, this);
        this.NBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabBtn2, this);
        this.NBtn.visible = true;
        this.YBtn.visible = true;
    }
    private onTouchTabBtn1(event: egret.TouchEvent): void {
        ServerManager.getInstance().exitGame();
        this.unableBtn();

    }
    private onTouchTabBtn2(event: egret.TouchEvent): void {
        this.unableBtn();

    }
    private dissolveid: string;
    public dissolve(obj: any): void {
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
    }

    private onTouchTabBtn(event: egret.TouchEvent): void {
        ServerManager.getInstance().senDissolve("Y", this.dissolveid);
        this.unableBtn();

    }
    private onTouchTabBtnN(event: egret.TouchEvent): void {
        ServerManager.getInstance().senDissolve("N", this.dissolveid);
        this.unableBtn();

    }
    private unableBtn() {
        this.YBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabBtn, this);
        this.NBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabBtnN, this);
        this.YBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabBtn1, this);
        this.NBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabBtn2, this);
        this.NBtn.visible = false;
        this.YBtn.visible = false;
        this.visible = false;
    }
    private onTouchTab(e: egret.TouchEvent): void {
        this.visible = false;
    }
    public static getInstance(): WinManager {
        if (WinManager.instance == null) {
            WinManager.instance = new WinManager();
        }

        return WinManager.instance;
    }

}
