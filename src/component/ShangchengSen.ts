/**
 *
 * @author 
 *
 */
class ShangchengSen extends eui.Component {
    /**
     *等待界面
     */
    public daojuGroup: eui.Group;
    public jinbiBtn: eui.Image;
    public fangka1Btn: eui.Image;
    public fangka2Btn: eui.Image;
    public fangka3Btn: eui.Image;
    public fangka4Btn: eui.Image;
    public jinbuGroup: eui.Group;
    public daojuBtn: eui.Image;
    public jinbi1Btn: eui.Image;
    public jinbi2Btn: eui.Image;
    public jinbi3Btn: eui.Image;
    public closeBtn: eui.Image;
    

    public constructor() {
        super();
        this.skinName = "resource/SKIN/Shangcheng.exml";
    }
    public start() {
        this.closeBtn.touchEnabled = true;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        
        this.jinbiBtn.touchEnabled = true;
        this.jinbiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJinbi, this);
        
        this.daojuBtn.touchEnabled = true;
        this.daojuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDaoju, this);

    }

	private onDaoju(event:egret.TouchEvent):void {
        this.jinbuGroup.visible=false;
        this.daojuGroup.visible=true;

	}


	private onJinbi(event:egret.TouchEvent):void {
        this.jinbuGroup.visible=true;
        this.daojuGroup.visible=false;
	}

    public onClose(event: egret.TouchEvent = null): void {
        this.end();
        if (this.parent)
            this.parent.removeChild(this);
    }
    //结束界面，释放监听
    public end(str: string = null) {
        this.closeBtn.touchEnabled = false;
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

    }
}
