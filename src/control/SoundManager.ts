/**
 *
 * @author 
 * 主要控制界面的切换
 */
class SoundManager extends eui.UILayer {
    public constructor() {
        super();
        this.init();
    }

    private static instance: SoundManager;
    // 音效大小
    public yxnum = 1;
    public bgyxnum = 1;
    // 背景音的位置，第几首
    private bgnum = "0";
    private bgsound: egret.Sound;
    private bgsoundchanel: egret.SoundChannel;

    private yxsound: egret.Sound;
    private yxsoundchanel: egret.SoundChannel;

    // background1_mp3
    // background2_mp3
    // background3_mp3
	/**
	 * 这里初始化
	 */
    private init() {
        this.bgsound = new egret.Sound();
        this.yxsound = new egret.Sound();
        this.bgsound.type = egret.Sound.MUSIC;

        if (egret.localStorage.getItem("bgsound")) {
            this.bgnum = egret.localStorage.getItem("bgsound");
        } else {
            egret.localStorage.setItem("bgsound", "0");
        }

        if (egret.localStorage.getItem("yxnum")) {
            this.yxnum = Number(egret.localStorage.getItem("yxnum"));
        } else {
            egret.localStorage.setItem("yxnum", "1");
        }

        if (egret.localStorage.getItem("bgyxnum")) {
            this.bgyxnum = Number(egret.localStorage.getItem("bgyxnum"));
        } else {
            egret.localStorage.setItem("bgyxnum", "1");
        }
        console.log("thisbg" + this.bgyxnum);


        this.bgsound = RES.getRes("bg_main_game_mp3");
        this.bgsoundchanel = this.bgsound.play();
        this.bgsoundchanel.volume = this.bgyxnum;
    }
    public playBG(str: string = null) {
        this.bgsoundchanel.stop();
        this.bgsoundchanel = null;
        if (str == null) {
            this.bgsound = RES.getRes("bg_main_game_mp3");
        } else {
            if (Number(str) > 2) {
                this.bgsound = RES.getRes("bg_music" + this.bgnum + "_mp3");
            } else {
                this.bgnum = str;
                this.bgsound = RES.getRes("bg_music" + str + "_mp3");
                egret.localStorage.setItem("bgsound", str)
            }
        }

        this.bgsoundchanel = this.bgsound.play();
        this.bgsoundchanel.volume = this.bgyxnum;
    }
    public playYx(str: string, isman: boolean = false) {

        if (isman == true) {
            console.log("man_" + str);
            this.yxsound = RES.getRes("man_" + str);
        } else {
            console.log(str);
            this.yxsound = RES.getRes(str);
        }
        if (this.yxsound) {
            this.yxsoundchanel = this.yxsound.play(0, 1);
            this.yxsoundchanel.volume = this.yxnum;
        }
    }
    public setBgVol(str: number) {
        this.bgsoundchanel.volume = str / 100;
        this.bgyxnum = str / 100;
        console.log(this.bgsoundchanel.volume);
        egret.localStorage.setItem("bgyxnum", this.bgyxnum.toString());
    }
    public setYxVol(str: number) {
        this.yxnum = str / 100;
        egret.localStorage.setItem("yxnum", this.yxnum.toString());
    }
    public static getInstance(): SoundManager {
        if (SoundManager.instance == null) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }

}
