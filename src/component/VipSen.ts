/**
 *
 * @author 
 *
 */
class VipSen extends eui.Component {
    /**
     *vip界面
     */
    public searchGroup: eui.Group;
    public shousuoBtn: eui.Image;
    public chuangjianBtn: eui.Image;
    public searchtxt: eui.EditableText;
    public roomBtn: eui.Button;
    public idtxt: eui.Label;
    public nametxt: eui.Label;
    public numtxt: eui.Label;
    public fangzhutxt: eui.Label;
    public zuishaotxt: eui.Label;
    public mimatxt: eui.Label;
    public closeBtn: eui.Image;
    public chuangjianGroup: eui.Group;
    public fanhuiBtn: eui.Image;
    public jiaclick: eui.Image;
    public hongzhongclick: eui.Image;
    public louclick: eui.Image;
    public chuantongclick: eui.Image;
    public dianpaoclick: eui.Image;
    public hongzhonglouclick: eui.Image;

    public siclick: eui.Image;
    public baclick: eui.Image;
    public chuantonggou: eui.Image;
    public lougou: eui.Image;
    public hongzhonglougou: eui.Image;
    public hongzhonggou: eui.Image;
    public dianpaogou: eui.Image;
    public jiagou: eui.Image;
    public sigou: eui.Image;
    public bagou: eui.Image;
    public creatBtn: eui.Image;
    public passwordtxt: eui.EditableText;
    public mimaGroup: eui.Group;
    public inputPass: eui.TextInput;
    public joinBtn: eui.Button;
    public mimaCloseBtn: eui.Image;


    public quanxuanclick: eui.Image;
    public quanxuangou: eui.Image;



    public constructor() {
        super();
        this.skinName = "resource/SKIN/Chuangjian.exml";
        this.hongzhonggou.touchEnabled = false;
        this.jiagou.touchEnabled = false;
        this.lougou.touchEnabled = false;
        this.dianpaogou.touchEnabled = false;
        this.hongzhonglougou.touchEnabled = false;
        this.quanxuangou.touchEnabled = false;
    }
    public start() {
        this.closeBtn.touchEnabled = true;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.fanhuiBtn.touchEnabled = true;
        this.fanhuiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFanhui, this);
        this.chuangjianBtn.touchEnabled = true;
        this.chuangjianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChuangjian, this);
        this.shousuoBtn.touchEnabled = true;
        this.shousuoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShousuo, this);

        this.siclick.touchEnabled = true;
        this.siclick.name = "si";
        this.siclick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.baclick.touchEnabled = true;
        this.baclick.name = "ba";
        this.baclick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.hongzhongclick.touchEnabled = true;
        this.hongzhongclick.name = "hong";
        this.hongzhongclick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.jiaclick.touchEnabled = true;
        this.jiaclick.name = "jia";
        this.jiaclick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.louclick.touchEnabled = true;
        this.louclick.name = "lou";
        this.louclick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.hongzhonglouclick.touchEnabled = true;
        this.hongzhonglouclick.name = "hongzhonglou";
        this.hongzhonglouclick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.quanxuanclick.touchEnabled = true;
        this.quanxuanclick.name = "quanxuan";
        this.quanxuanclick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.dianpaoclick.touchEnabled = true;
        this.dianpaoclick.name = "dian";
        this.dianpaoclick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.chuantongclick.touchEnabled = true;
        this.chuantongclick.name = "chuan";
        this.chuantongclick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);




        this.creatBtn.touchEnabled = true;
        this.creatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCreat, this);


        this.roomBtn.touchEnabled = true;
        this.roomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onshowpassroom, this);


        this.joinBtn.touchEnabled = true;
        this.joinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJroom, this);


        this.mimaCloseBtn.touchEnabled = true;
        this.mimaCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMimaCloseBtn, this);

    }
    private onMimaCloseBtn(event: egret.TouchEvent): void {
        this.mimaGroup.visible = false;
    }
    private onJroom(event: egret.TouchEvent): void {
        ServerManager.getInstance().game("3", this.idtxt.text, this.inputPass.text);
    }


    private onshowpassroom(event: egret.TouchEvent): void {
        this.mimaGroup.visible = true;
    }


    private onClick(e: egret.TouchEvent) {
        switch (e.target.name) {
            case "si":
                this.sigou.visible = true;
                this.bagou.visible = false;
                break;
            case "ba":
                this.sigou.visible = false;
                this.bagou.visible = true;
                break;
            case "hong":
                this.hongzhonggou.visible = !this.hongzhonggou.visible;
                this.setChuantong();
                break;
            case "jia":
                this.jiagou.visible = !this.jiagou.visible;
                this.setChuantong();
                break;
            case "lou":
                this.lougou.visible = !this.lougou.visible;
                this.setChuantong();
                break;
            case "hongzhonglou":
                this.hongzhonglougou.visible = !this.hongzhonglougou.visible;
                this.setChuantong();
                break;
            case "dian":
                this.dianpaogou.visible = !this.dianpaogou.visible;
                this.setChuantong();
                break;
            case "chuan":
                this.hongzhonggou.visible = false;
                this.lougou.visible = false;
                this.hongzhonglougou.visible = false;
                this.dianpaogou.visible = false;
                this.jiagou.visible = false;
                this.chuantonggou.visible = true;
                this.quanxuangou.visible = false;
                break;
            case "quanxuan":
                this.hongzhonggou.visible = true;
                this.lougou.visible = true;
                this.hongzhonglougou.visible = true;
                this.dianpaogou.visible = true;
                this.jiagou.visible = true;
                this.chuantonggou.visible = false;
                this.quanxuangou.visible = true;
                this.setChuantong();
                break;
            default:
                break;
        }
    }
    private setChuantong() {
        if (this.hongzhonggou.visible == false && this.jiagou.visible == false && this.lougou.visible == false && this.hongzhonglougou.visible == false && this.dianpaogou.visible == false) {
            this.chuantonggou.visible = true;
        } else {
            this.chuantonggou.visible = false;
        }

        if (this.hongzhonggou.visible == false || this.jiagou.visible == false || this.lougou.visible == false || this.hongzhonglougou.visible == false || this.dianpaogou.visible == false) {
            this.quanxuangou.visible = false;
        }else
        {
           this.quanxuangou.visible = true; 
        }

    }
    private onCreat(e: egret.TouchEvent) {
        var pwd = this.passwordtxt.text;
        var bao;
        var lou;
        var bian;
        var dian;
        var hongzhonglou;
        var title;
        var gametool;
        if (this.chuantonggou.visible == true) {
            bao = "";
            lou = "";
            bian = "";
            dian = "";
        } else {
            if (this.hongzhonggou.visible == true)
                bao = "1";
            if (this.lougou.visible == true)
                lou = "1";
            if (this.jiagou.visible == true)
                bian = "1";
            if (this.dianpaogou.visible == true)
                dian = "1";
            if (this.hongzhonglougou.visible == true)
                hongzhonglou = "1";
        }
        if (this.sigou.visible == true) {
            // gametool = "roundtype_1";
            gametool = "roundtype_4";
        } else {
            gametool = "roundtype_8";
        }
        // gametool = "roundtype_1";
        ServerManager.getInstance().Cgame(pwd, bao, lou, bian, dian, hongzhonglou, title, gametool);
    }
    // suosuo
    private onShousuo(e: egret.TouchEvent) {
        if (this.searchtxt.text == "") {
            WinManager.getInstance().showWin("请输入房间号");
            return;
        }
        ServerManager.getInstance().sync(this.searchtxt.text);
    }
    /**
     * 搜索回来如果有房间就显示房间信息
     */
    public getRoom(obj: any) {
        this.idtxt.text = obj.gameInfo.id;
        this.nametxt.text = obj.gameInfo.userid;
        this.roomBtn.visible = true;
        var num = 0;
        if (obj.gameInfo.dong) {
            num++;
        }
        if (obj.gameInfo.nan) {
            num++;
        }
        if (obj.gameInfo.xi) {
            num++;
        }
        if (obj.gameInfo.bei) {
            num++;
        }
        this.numtxt.text = String(num);

    }
    private onChuangjian(e: egret.TouchEvent) {
        this.chuangjianGroup.visible = true;
        this.searchGroup.visible = false;
    }
    private onFanhui(e: egret.TouchEvent) {
        this.chuangjianGroup.visible = false;
        this.searchGroup.visible = true;
    }
    /**
    *准备
    */
    private onClose(e: egret.TouchEvent) {
        this.end();
        this.parent.removeChild(this);
    }
    //结束界面，释放监听
    public end() {
        this.hongzhonggou.visible = false;
        this.jiagou.visible = false;
        this.lougou.visible = false;
        this.dianpaogou.visible = false;
        this.hongzhonglougou.visible = false;
        this.bagou.visible = false;
        this.quanxuangou.visible = true;

        this.sigou.visible = true;
        this.chuantonggou.visible = true;

        this.passwordtxt.text = "";
        this.searchtxt.text = "";
        this.idtxt.text = "";
        this.nametxt.text = "";
        this.numtxt.text = "";
        this.fangzhutxt.text = "";
        this.zuishaotxt.text = "";
        this.mimatxt.text = "";

        this.chuangjianGroup.visible = false;
        this.searchGroup.visible = true;
        this.mimaGroup.visible = false;
        this.roomBtn.visible = false;

        this.closeBtn.touchEnabled = false;
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.fanhuiBtn.touchEnabled = false;
        this.fanhuiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFanhui, this);
        this.chuangjianBtn.touchEnabled = false;
        this.chuangjianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChuangjian, this);
        this.shousuoBtn.touchEnabled = false;
        this.shousuoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShousuo, this);

        this.siclick.touchEnabled = false;
        this.siclick.name = "si";
        this.siclick.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.baclick.touchEnabled = false;
        this.baclick.name = "ba";
        this.baclick.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.hongzhongclick.touchEnabled = false;
        this.hongzhongclick.name = "hong";
        this.hongzhongclick.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.jiaclick.touchEnabled = false;
        this.jiaclick.name = "jia";
        this.jiaclick.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.louclick.touchEnabled = false;
        this.louclick.name = "lou";
        this.louclick.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.dianpaoclick.touchEnabled = false;
        this.dianpaoclick.name = "dian";
        this.dianpaoclick.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.chuantongclick.touchEnabled = false;
        this.chuantongclick.name = "chuan";
        this.chuantongclick.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.creatBtn.touchEnabled = false;
        this.creatBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCreat, this);

        this.roomBtn.touchEnabled = false;
        this.roomBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onshowpassroom, this);

        this.joinBtn.touchEnabled = false;
        this.joinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJroom, this);
    }
}
