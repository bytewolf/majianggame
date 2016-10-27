/**
 *
 * @author
 *
 */
var HeadSet = (function (_super) {
    __extends(HeadSet, _super);
    function HeadSet() {
        _super.call(this);
        this.skinName = "resource/SKIN/HeadSet.exml";
        for (var index = 1; index < 9; index++) {
            this["headPngkuang" + index].touchEnabled = false;
            this["headPng" + index].name = index;
        }
    }
    var d = __define,c=HeadSet,p=c.prototype;
    p.start = function (obj) {
        if (obj.user.vgamecount) {
            var num = Number(obj.user.vgamecount);
            var k = 0;
            if (Math.floor(num / 10) >= 0) {
                num = Math.floor(num / 10);
                console.log(num);
                k++;
            }
            while (num > 1) {
                num = Math.floor(num / 2);
                console.log(num);
                k++;
            }
            this.dengjiTxt.text = k.toString();
        }
        if (obj.user.bizid)
            this.idTxt.text = obj.user.bizid;
        if (obj.user.id)
            this.zhanghaoTxt.text = obj.user.id;
        if (obj.user.name)
            this.nameTxt.text = obj.user.name;
        if (obj.user.imageid) {
            this.imagePng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.user.imageid);
            this["headPngkuang" + obj.user.imageid].visible = true;
            this.imageid = obj.user.imageid;
        }
        else {
            this.imagePng.texture = RES.getRes("touxiangdaoju_json.logo1");
            this.headPngkuang1.visible = true;
            this.imageid = "1";
        }
        this.backBtn.touchEnabled = true;
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.okBtn.touchEnabled = true;
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOk, this);
        for (var index = 1; index < 9; index++) {
            this["headPng" + index].touchEnabled = true;
            this["headPng" + index].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onImg, this);
        }
    };
    p.onImg = function (event) {
        for (var index = 1; index < 9; index++) {
            this["headPngkuang" + index].visible = false;
        }
        this["headPngkuang" + event.target.name].visible = true;
        this.imageid = event.target.name;
    };
    p.onOk = function (event) {
        if (this.nameTxt.text.length > 4) {
            WinManager.getInstance().showWin("昵称不能超过4个字");
            return;
        }
        if (Number(this.imageid) < 5) {
            ServerManager.getInstance().onUpdate(this.nameTxt.text, this.imageid, "1");
        }
        else {
            ServerManager.getInstance().onUpdate(this.nameTxt.text, this.imageid, "0");
        }
    };
    p.getSucc = function (obj) {
        this.imagePng.texture = RES.getRes("touxiangdaoju_json.logo" + this.imageid);
        ServerManager.getInstance().getUser();
    };
    p.onClose = function (event) {
        this.end();
    };
    //结束界面，释放监听
    p.end = function (str) {
        if (str === void 0) { str = null; }
        this.backBtn.touchEnabled = false;
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.okBtn.touchEnabled = false;
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOk, this);
        for (var index = 1; index < 9; index++) {
            this["headPng" + index].touchEnabled = false;
            this["headPng" + index].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onImg, this);
        }
        this.parent.removeChild(this);
    };
    return HeadSet;
}(eui.Component));
egret.registerClass(HeadSet,'HeadSet');
//# sourceMappingURL=HeadSet.js.map