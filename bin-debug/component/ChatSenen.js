/**
 *
 * @author
 *
 */
var ChatSenen = (function (_super) {
    __extends(ChatSenen, _super);
    function ChatSenen() {
        _super.call(this);
        this.skinName = "resource/SKIN/ChatSenSkin.exml";
        for (var index = 0; index < this.biaoqingGroup.numElements; index++) {
            if (index < 9) {
                this.biaoqingGroup.getChildAt(index).name = "biaoqing0" + (index + 1).toString();
            }
            else {
                this.biaoqingGroup.getChildAt(index).name = "biaoqing" + (index + 1).toString();
            }
        }
        for (var index = 0; index < this.textGroup.numElements; index++) {
            this.textGroup.getChildAt(index).name = "chattext" + index.toString();
        }
    }
    var d = __define,c=ChatSenen,p=c.prototype;
    p.start = function (position) {
        this.position = position;
        this.liaotiantrue.visible = false;
        this.liaotianfalse.visible = true;
        this.biaoqingpngfalse.visible = false;
        this.biaoqingpngtrue.visible = true;
        this.biaoqingScroller.visible = true;
        this.textScroller.visible = false;
        this.sendBtn.touchEnabled = true;
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSend, this);
        this.bgPng.touchEnabled = true;
        this.bgPng.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.biaoqingpngfalse.touchEnabled = true;
        this.biaoqingpngfalse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBqBtn, this);
        this.liaotianfalse.touchEnabled = true;
        this.liaotianfalse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLTBtn, this);
        for (var index = 0; index < this.biaoqingGroup.numElements; index++) {
            this.biaoqingGroup.getChildAt(index).addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBiaoqing, this);
        }
        for (var index = 0; index < this.textGroup.numElements; index++) {
            this.textGroup.getChildAt(index).addEventListener(egret.TouchEvent.TOUCH_TAP, this.onText, this);
        }
    };
    p.onSend = function (event) {
        if (this.chatContent != null) {
            ServerManager.getInstance().chat(this.chatContent.text, this.position);
            this.chatContent.text = "";
            this.onClose();
        }
    };
    p.onLTBtn = function (event) {
        this.liaotiantrue.visible = true;
        this.liaotianfalse.visible = false;
        this.biaoqingpngfalse.visible = true;
        this.biaoqingpngtrue.visible = false;
        this.biaoqingScroller.visible = false;
        this.textScroller.visible = true;
    };
    p.onBqBtn = function (event) {
        this.liaotiantrue.visible = false;
        this.liaotianfalse.visible = true;
        this.biaoqingpngfalse.visible = false;
        this.biaoqingpngtrue.visible = true;
        this.biaoqingScroller.visible = true;
        this.textScroller.visible = false;
    };
    p.onText = function (e) {
        console.log(e.target.name);
        var str = "";
        switch (e.target.name) {
            case "chattext0":
                str = "别给我打啊我要焖听";
                break;
            case "chattext1":
                str = "都别点哦我要搂宝了";
                break;
            case "chattext2":
                str = "感觉我的人品要爆发了";
                break;
            case "chattext3":
                str = "很高兴认识各位";
                break;
            case "chattext4":
                str = "你上大学专业是放炮系的吗";
                break;
            case "chattext5":
                str = "你这牌打的很硬气嘛";
                break;
            case "chattext6":
                str = "傻愣打牌琢磨啥呢";
                break;
            case "chattext7":
                str = "输了不要跑啊哈哈哈";
                break;
            case "chattext8":
                str = "我这点子也真是没谁了";
                break;
            case "chattext9":
                str = "这牌不出意外是雪山飞狐了";
                break;
            case "chattext10":
                str = "这牌让你打的能不能看着点下面";
                break;
            case "chattext11":
                str = "真是有钱难买上家差啊";
                break;
            default:
                break;
        }
        ServerManager.getInstance().chat(str, this.position);
        this.chatContent.text = "";
        this.onClose();
    };
    p.onBiaoqing = function (e) {
        ServerManager.getInstance().chat(e.target.name, this.position);
        this.onClose();
    };
    p.onClose = function (e) {
        if (e === void 0) { e = null; }
        console.log("close");
        this.end();
        if (this.parent)
            this.parent.removeChild(this);
    };
    //结束界面，释放监听
    p.end = function () {
        this.sendBtn.touchEnabled = false;
        this.sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSend, this);
        this.bgPng.touchEnabled = false;
        this.bgPng.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.biaoqingpngfalse.touchEnabled = false;
        this.biaoqingpngfalse.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBqBtn, this);
        this.liaotianfalse.touchEnabled = false;
        this.liaotianfalse.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLTBtn, this);
        for (var index = 0; index < this.biaoqingGroup.numElements; index++) {
            this.biaoqingGroup.getChildAt(index).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBiaoqing, this);
        }
        for (var index = 0; index < this.textGroup.numElements; index++) {
            this.textGroup.getChildAt(index).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onText, this);
        }
    };
    return ChatSenen;
}(eui.Component));
egret.registerClass(ChatSenen,'ChatSenen');
//# sourceMappingURL=ChatSenen.js.map