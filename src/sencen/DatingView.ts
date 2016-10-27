/**
 *
 * @author 
 *
 */
class DatingView extends eui.Component {
    public gonggaoBtn: eui.Button;
    public faguiBtn: eui.Button;
    public gengduoBtn: eui.Button;
    public vipBtn: eui.Button;
    public gaojiBtn: eui.Button;
    public chujiBtn: eui.Button;
    public zhongjiBtn: eui.Button;
    public pinglunBtn: eui.Button;
    public huodongBtn: eui.Button;
    public haoyouBtn: eui.Button;

    public xiaoxiBtn: eui.Button;
    public jiluBtn: eui.Button;
    public shangchengBtn: eui.Button;
    public nameTxt: eui.Label;
    public idTxt: eui.Label;
    public fangkaTxt: eui.Label;
    public yueTxt: eui.Label;
    public vipsen: VipSen;
    public shangcheng: ShangchengSen;
    public imageBtn: eui.Image;
    public imagePng: eui.Image;
    public imageSetsen: HeadSet;
    private settingBtn: eui.Image;
    private user: any;
    private settingSen: ShezhiSen;
    private jilusec: JiluSen;
    /**
     *场类型  ,0初级  1中级   2高级  3 VIP
     */
    public changtype: number;

    public constructor() {
        super();
        this.skinName = "resource/SKIN/DatingSkin.exml";



    }
    public start() {
        //shang3
        this.gonggaoBtn.touchEnabled = true;
        this.gonggaoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGonggaoClick, this);

        this.faguiBtn.touchEnabled = true;
        this.faguiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaguiClick, this);

        this.gengduoBtn.touchEnabled = true;
        this.gengduoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGengduoClick, this);
        //zhong4
        this.vipBtn.touchEnabled = true;
        this.vipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onVipClick, this);

        this.gaojiBtn.touchEnabled = true;
        this.gaojiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGaojiClick, this);

        this.chujiBtn.touchEnabled = true;
        this.chujiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChujiClick, this);

        this.zhongjiBtn.touchEnabled = true;
        this.zhongjiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZhongjiClick, this);
        //xia6
        this.pinglunBtn.touchEnabled = true;
        this.pinglunBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPinglunClick, this);

        this.huodongBtn.touchEnabled = true;
        this.huodongBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHuodongClick, this);

        this.haoyouBtn.touchEnabled = true;
        this.haoyouBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHaoyouClick, this);

        this.xiaoxiBtn.touchEnabled = true;
        this.xiaoxiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onXiaoxiClick, this);

        this.jiluBtn.touchEnabled = true;
        this.jiluBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJiluClick, this);

        this.shangchengBtn.touchEnabled = true;
        this.shangchengBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShangchengClick, this);


        this.imageBtn.touchEnabled = true;
        this.imageBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onImageClick, this);


        this.settingBtn.touchEnabled = true;
        this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetClick, this);


        ServerManager.getInstance().getUser();
        this.imageSetsen = new HeadSet();
    }

    private onSetClick(event: egret.TouchEvent): void {
        if (!this.settingSen) {
            this.settingSen = new ShezhiSen();
        }
        this.settingSen.start();
        this.addChild(this.settingSen);
    }


    private onImageClick(event: egret.TouchEvent): void {
        if (this.user) {
            this.addChild(this.imageSetsen);
            this.imageSetsen.start(this.user);
        }



    }
    /**
     * name
     */
    public getUser(obj: any) {
        this.user = obj;
        this.yueTxt.text = obj.user.amount;
        this.nameTxt.text = obj.user.name;
        this.idTxt.text = obj.user.bizid;
        var goodsnum = 0;
        var arr = obj.user.goods;
        for (var index = 0; index < arr.length; index++) {
            if (arr[index].type == "roundtype_4" || arr[index].type == "roundtype_8") {
                goodsnum += Number(arr[index].value)
            }

        }
        this.fangkaTxt.text = goodsnum.toString();
        if (obj.user.imageid) {
            this.imagePng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.user.imageid);
        }
    }
    /**
     *记录
     */
    private onJiluClick(event: egret.TouchEvent): void {

        console.log("记录");

        if (!this.jilusec) {
            this.jilusec = new JiluSen();
        }
        this.jilusec.start(this.user);
        this.addChild(this.jilusec);
    }

    /**
     *消息
     */
    private onXiaoxiClick(event: egret.TouchEvent): void {

        console.log("消息");
    }

    /**
     *好友
     */
    private onHaoyouClick(event: egret.TouchEvent): void {

        console.log("好友");
    }

    /**
     *活动
     */
    private onHuodongClick(event: egret.TouchEvent): void {

        console.log("活动");
    }

    /**
     *评论
     */
    private onPinglunClick(event: egret.TouchEvent): void {

        console.log("评论");
    }

    /**
     *中级场
     */
    private onZhongjiClick(event: egret.TouchEvent): void {
        console.log("中级场");
        ServerManager.getInstance().game("1");

    }

    /**
     *初级场
     */
    private onChujiClick(event: egret.TouchEvent): void {

        console.log("初级场");
        ServerManager.getInstance().game("0");
    }

    /**
     *高级场
     */
    private onGaojiClick(event: egret.TouchEvent): void {

        console.log("高级场");
        ServerManager.getInstance().game("2");
    }

    /**
     *VIP场
     */
    private onVipClick(event: egret.TouchEvent): void {
        console.log("VIP场");
        if (this.vipsen == null) {
            this.vipsen = new VipSen();
        }
        this.addChild(this.vipsen);
        this.vipsen.start();
    }

    /**
     *更多
     */
    private onGengduoClick(event: egret.TouchEvent): void {

        console.log("更多");
    }

    /**
     *法规
     */
    private onFaguiClick(event: egret.TouchEvent): void {
        console.log("法规");

    }

    /**
     *公告
     */
    private onGonggaoClick(event: egret.TouchEvent): void {
        console.log("公告");

    }

    /**
     *商城
     */
    private onShangchengClick(event: egret.TouchEvent): void {
        console.log("商城");
        if (this.shangcheng == null) {
            this.shangcheng = new ShangchengSen();
        }
        this.addChild(this.shangcheng);
        this.shangcheng.start();

    }
    //结束界面，释放监听
    public end() {
        if (this.vipsen) {
            this.vipsen.end();
            if (this.vipsen.parent)
                this.removeChild(this.vipsen);
        }
        //shang3
        this.gonggaoBtn.touchEnabled = false;
        this.gonggaoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGonggaoClick, this);

        this.faguiBtn.touchEnabled = false;
        this.faguiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaguiClick, this);

        this.gengduoBtn.touchEnabled = false;
        this.gengduoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGengduoClick, this);
        //zhong4
        this.vipBtn.touchEnabled = false;
        this.vipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onVipClick, this);

        this.gaojiBtn.touchEnabled = false;
        this.gaojiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGaojiClick, this);

        this.chujiBtn.touchEnabled = false;
        this.chujiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChujiClick, this);

        this.zhongjiBtn.touchEnabled = false;
        this.zhongjiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onZhongjiClick, this);
        //xia6
        this.pinglunBtn.touchEnabled = false;
        this.pinglunBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPinglunClick, this);

        this.huodongBtn.touchEnabled = false;
        this.huodongBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHuodongClick, this);

        this.haoyouBtn.touchEnabled = false;
        this.haoyouBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHaoyouClick, this);

        this.xiaoxiBtn.touchEnabled = false;
        this.xiaoxiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onXiaoxiClick, this);

        this.jiluBtn.touchEnabled = false;
        this.jiluBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJiluClick, this);

        this.shangchengBtn.touchEnabled = false;
        this.shangchengBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShangchengClick, this);


        this.imageBtn.touchEnabled = false;
        this.imageBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onImageClick, this);
    }
}
