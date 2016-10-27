/**
 *
 * @author 
 *
 */
class Jilulist extends eui.Component {

	public upTxt: eui.Label;
	public downTxt: eui.Label;
	public numTxt: eui.Label;


    public constructor() {
        super();
        this.skinName = "resource/SKIN/JilulistSkin.exml";
    }

	/**
	 * name
	 */
	public setTxt(i:number,str1:string,str2:string) {
		this.numTxt.text=i.toString();
		this.upTxt.text=str1;
		this.downTxt.text=str2;
	}
}
