/**
 *
 * @author
 *
 */
var Jilulist = (function (_super) {
    __extends(Jilulist, _super);
    function Jilulist() {
        _super.call(this);
        this.skinName = "resource/SKIN/JilulistSkin.exml";
    }
    var d = __define,c=Jilulist,p=c.prototype;
    /**
     * name
     */
    p.setTxt = function (i, str1, str2) {
        this.numTxt.text = i.toString();
        this.upTxt.text = str1;
        this.downTxt.text = str2;
    };
    return Jilulist;
}(eui.Component));
egret.registerClass(Jilulist,'Jilulist');
//# sourceMappingURL=Jilulist.js.map