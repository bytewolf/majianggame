/**
 *
 * @author
 *
 */
var DatingView = (function (_super) {
    __extends(DatingView, _super);
    function DatingView() {
        _super.call(this);
        this.skinName = "resource/SKIN/DatingSkin.exml";
    }
    var d = __define,c=DatingView,p=c.prototype;
    p.start = function () {
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
    };
    p.onSetClick = function (event) {
        if (!this.settingSen) {
            this.settingSen = new ShezhiSen();
        }
        this.settingSen.start();
        this.addChild(this.settingSen);
    };
    p.onImageClick = function (event) {
        if (this.user) {
            this.addChild(this.imageSetsen);
            this.imageSetsen.start(this.user);
        }
    };
    /**
     * name
     */
    p.getUser = function (obj) {
        this.user = obj;
        this.yueTxt.text = obj.user.amount;
        this.nameTxt.text = obj.user.name;
        this.idTxt.text = obj.user.bizid;
        var goodsnum = 0;
        var arr = obj.user.goods;
        for (var index = 0; index < arr.length; index++) {
            if (arr[index].type == "roundtype_4" || arr[index].type == "roundtype_8") {
                goodsnum += Number(arr[index].value);
            }
        }
        this.fangkaTxt.text = goodsnum.toString();
        if (obj.user.imageid) {
            this.imagePng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.user.imageid);
        }
    };
    /**
     *记录
     */
    p.onJiluClick = function (event) {
        console.log("记录");
        if (!this.jilusec) {
            this.jilusec = new JiluSen();
        }
        this.jilusec.start(this.user);
        this.addChild(this.jilusec);
    };
    /**
     *消息
     */
    p.onXiaoxiClick = function (event) {
        console.log("消息");
    };
    /**
     *好友
     */
    p.onHaoyouClick = function (event) {
        console.log("好友");
    };
    /**
     *活动
     */
    p.onHuodongClick = function (event) {
        console.log("活动");
    };
    /**
     *评论
     */
    p.onPinglunClick = function (event) {
        console.log("评论");
    };
    /**
     *中级场
     */
    p.onZhongjiClick = function (event) {
        console.log("中级场");
        ServerManager.getInstance().game("1");
    };
    /**
     *初级场
     */
    p.onChujiClick = function (event) {
        console.log("初级场");
        ServerManager.getInstance().game("0");
    };
    /**
     *高级场
     */
    p.onGaojiClick = function (event) {
        console.log("高级场");
        ServerManager.getInstance().game("2");
    };
    /**
     *VIP场
     */
    p.onVipClick = function (event) {
        console.log("VIP场");
        if (this.vipsen == null) {
            this.vipsen = new VipSen();
        }
        this.addChild(this.vipsen);
        this.vipsen.start();
    };
    /**
     *更多
     */
    p.onGengduoClick = function (event) {
        console.log("更多");
    };
    /**
     *法规
     */
    p.onFaguiClick = function (event) {
        console.log("法规");
    };
    /**
     *公告
     */
    p.onGonggaoClick = function (event) {
        console.log("公告");
    };
    /**
     *商城
     */
    p.onShangchengClick = function (event) {
        console.log("商城");
        if (this.shangcheng == null) {
            this.shangcheng = new ShangchengSen();
        }
        this.addChild(this.shangcheng);
        this.shangcheng.start();
    };
    //结束界面，释放监听
    p.end = function () {
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
    };
    return DatingView;
}(eui.Component));
egret.registerClass(DatingView,'DatingView');
//# sourceMappingURL=DatingView.js.map