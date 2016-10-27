/**
 *
 * @author
 *
 */
var JiluSen = (function (_super) {
    __extends(JiluSen, _super);
    function JiluSen() {
        _super.call(this);
        this.skinName = "resource/SKIN/JiluSkin.exml";
    }
    var d = __define,c=JiluSen,p=c.prototype;
    p.start = function (obj) {
        this.closeBtn.touchEnabled = true;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        var arr = obj.user.result;
        for (var index = 0; index < arr.length; index++) {
            var list = new Jilulist();
            var str1 = arr[index].gametoken + "号房间    对战时间" + arr[index].createTime;
            if (obj.user.name == arr[index].name1) {
                var str2 = "输赢统计    " + arr[index].name1 + ":" + String(Number(arr[index].code1) - 2000) + ",  "
                    + arr[index].name2 + ":" + String(Number(arr[index].code2) - 2000) + ",  "
                    + arr[index].name3 + ":" + String(Number(arr[index].code3) - 2000) + ",  "
                    + arr[index].name4 + ":" + String(Number(arr[index].code4) - 2000);
            }
            else if (obj.user.name == arr[index].name2) {
                var str2 = "输赢统计    " + arr[index].name2 + ":" + String(Number(arr[index].code2) - 2000) + ",  "
                    + arr[index].name1 + ":" + String(Number(arr[index].code1) - 2000) + ",  "
                    + arr[index].name3 + ":" + String(Number(arr[index].code3) - 2000) + ",  "
                    + arr[index].name4 + ":" + String(Number(arr[index].code4) - 2000);
            }
            else if (obj.user.name == arr[index].name3) {
                var str2 = "输赢统计    " + arr[index].name3 + ":" + String(Number(arr[index].code3) - 2000) + ",  "
                    + arr[index].name2 + ":" + String(Number(arr[index].code2) - 2000) + ",  "
                    + arr[index].name1 + ":" + String(Number(arr[index].code1) - 2000) + ",  "
                    + arr[index].name4 + ":" + String(Number(arr[index].code4) - 2000);
            }
            else {
                var str2 = "输赢统计    " + arr[index].name4 + ":" + String(Number(arr[index].code4) - 2000) + ",  "
                    + arr[index].name2 + ":" + String(Number(arr[index].code2) - 2000) + ",  "
                    + arr[index].name3 + ":" + String(Number(arr[index].code3) - 2000) + ",  "
                    + arr[index].name1 + ":" + String(Number(arr[index].code1) - 2000);
            }
            list.setTxt(index + 1, str1, str2);
            this.ListGroup.addChild(list);
        }
        this.srcoller.viewport.scrollV = 0;
    };
    p.onClose = function (e) {
        if (e === void 0) { e = null; }
        this.end();
        this.parent.removeChild(this);
    };
    //结束界面，释放监听
    p.end = function () {
        while (this.ListGroup.numChildren > 0) {
            GamePool.getInstance().setJilu(this.ListGroup.removeChildAt(0));
        }
        this.closeBtn.touchEnabled = false;
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    };
    return JiluSen;
}(eui.Component));
egret.registerClass(JiluSen,'JiluSen');
//# sourceMappingURL=JiluSen.js.map