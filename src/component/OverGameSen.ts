/**
 *
 * @author 
 *
 */
class OverGameSen extends eui.Component {
    /**
     *等待界面
     */
    public dianpaoPng: eui.Image;
    public liujuPng: eui.Image;
    public shulePng: eui.Image;
    public mobaohuPng: eui.Image;
    public jiesuPng: eui.Image;
    public yinglePng: eui.Image;
    public zimoPng: eui.Image;
    public jiesucloseBtn: eui.Image;
    public readyBtn: eui.Image;
    public shareBtn: eui.Image;
    public changBtn: eui.Image;
    public idTxt: eui.Label;
    public idTxt0: eui.Label;
    public idTxt1: eui.Label;
    public idTxt2: eui.Label;
    public hutypeTxt: eui.Label;
    public fanTxt: eui.Label;
    public fanTxt0: eui.Label;
    public fanTxt1: eui.Label;
    public fanTxt2: eui.Label;
    public fenTxt: eui.Label;
    public fenTxt0: eui.Label;
    public fenTxt1: eui.Label;
    public fenTxt2: eui.Label;
    public tingTxt: eui.Label;
    public tingTxt0: eui.Label;
    public tingTxt1: eui.Label;
    public tingTxt2: eui.Label;
    public group: eui.Group;
    public group0: eui.Group;
    public group1: eui.Group;
    public group2: eui.Group;
    public zhuangPng: eui.Image;
    public zhuangPng0: eui.Image;
    public zhuangPng1: eui.Image;
    public zhuangPng2: eui.Image;
    public baopaiPng: eui.Image;
    public roomlabel: eui.Label;
    public vipGroup: eui.Group;
    public viptext0: eui.Label;
    public viptext1: eui.Label;
    public viptext2: eui.Label;
    public viptext3: eui.Label;
    public timeTxt: eui.Label;
    private timer: egret.Timer;
    private type: string;

    public id1: eui.Label;
    public zzcs1: eui.Label;
    public hpcs1: eui.Label;
    public dpcs1: eui.Label;
    public mbcs1: eui.Label;
    public bzb1: eui.Label;
    public code1: eui.Label;
    public id0: eui.Label;
    public zzcs0: eui.Label;
    public hpcs0: eui.Label;
    public dpcs0: eui.Label;
    public mbcs0: eui.Label;
    public bzb0: eui.Label;
    public code0: eui.Label;
    public id2: eui.Label;
    public zzcs2: eui.Label;
    public hpcs2: eui.Label;
    public dpcs2: eui.Label;
    public mbcs2: eui.Label;
    public bzb2: eui.Label;
    public code2: eui.Label;
    public id3: eui.Label;
    public zzcs3: eui.Label;
    public hpcs3: eui.Label;
    public dpcs3: eui.Label;
    public mbcs3: eui.Label;
    public bzb3: eui.Label;
    public code3: eui.Label;
    private vipShareBtn: eui.Image;
    private vipccloseBtn: eui.Image;

    public png1: eui.Image;
    public png0: eui.Image;
    public png2: eui.Image;
    public png3: eui.Image;
    public name1: eui.Label;
    public name0: eui.Label;
    public name2: eui.Label;
    public name3: eui.Label;

    private oldobj: any;
    public constructor() {
        super();
        this.skinName = "resource/SKIN/OverGameSkin.exml";
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.Ontimer, this)
    }

    private Ontimer(event: egret.TimerEvent): void {
        this.timeTxt.text = String(Number(this.timeTxt.text) - 1);
        if (this.timeTxt.text == "0") {
            this.timer.stop();
            ServerManager.getInstance().senReady();
            this.end();
        }
    }

    private gamesen: GamePlayView;
    private mopai: string;
    private redytuichu: boolean = false;
    private lou: boolean = false;
    public start(games: GamePlayView, obj: any, mopai: string) {
        this.oldobj = obj;
        this.redytuichu = false;
        this.mopai = mopai;
        this.timeTxt.text = "20";
        this.timer.start();

        // {"type":"hu","position":"bei","pai":"11","version":115,
        //     "result":{"type":"result","da_positon":"nan","hu_postion":"bei","pai":"11","hutype":"bian","dong":0,"nan":-1,"xi":0,"bei":1}
        // } 
        this.type = obj.type;
        this.gamesen = games;
        this.readyBtn.touchEnabled = true;
        this.readyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReady, this);


        this.jiesucloseBtn.touchEnabled = true;
        this.jiesucloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

        this.liujuPng.visible = false;
        this.shulePng.visible = false;
        this.jiesuPng.visible = false;
        this.yinglePng.visible = false;
        this.dianpaoPng.visible = false;
        this.mobaohuPng.visible = false;
        this.zimoPng.visible = false;
        this.lou = false;
        if (obj.result) {
            if (obj.result.lou) {
                this.lou = true;
            }
        }


        if (obj.gamestate == "8") {
            this.liujuPng.visible = true;
            this.hutypeTxt.text = "";
            this.liuju(obj.game);
            // xianshibaopai
            this.baopaiPng.texture = RES.getRes("majiang_json." + obj.game.baopai + "dongchu_png");
            return;
        }

        // 这个是vip结束房间的信息，显示最后的总和
        if (obj.gamestate == "10" || obj.gamestate == "11") {
            ServerManager.getInstance().isVipOpen = false;
            this.readyBtn.touchEnabled = false;
            this.jiesucloseBtn.touchEnabled = false;
            console.log("10or11");
            this.timer.stop();
            this.redytuichu = true;
            // this.liuju(obj.game);

            var s = obj.game.code4vip;
            var arr = [];
            var brr = [];
            for (var item in s) {
                arr.push(s[item]);
                brr.push(item)
            }
            for (var index = 0; index < arr.length; index++) {
                this["zzcs" + index].text = arr[index].zzcs;
                this["hpcs" + index].text = arr[index].hpcs;
                this["dpcs" + index].text = arr[index].dpcs;
                this["mbcs" + index].text = arr[index].mbcs;
                this["bzb" + index].text = arr[index].bzb;
                this["code" + index].text = String(Number(arr[index].code) - 2000);
                if (brr[index] == obj.game.dong.id) {
                    this["png" + index].texture = RES.getRes("touxiangdaoju_json.logo" + obj.game.dong.user.imageid);
                    this["name" + index].text = obj.game.dong.user.name;
                     this["id" + index].text = obj.game.dong.user.bizid;
                } else if (brr[index] == obj.game.nan.id) {
                    this["png" + index].texture = RES.getRes("touxiangdaoju_json.logo" + obj.game.nan.user.imageid);
                    this["name" + index].text = obj.game.nan.user.name;
                     this["id" + index].text = obj.game.nan.user.bizid;
                } else if (brr[index] == obj.game.xi.id) {
                    this["png" + index].texture = RES.getRes("touxiangdaoju_json.logo" + obj.game.xi.user.imageid);
                    this["name" + index].text = obj.game.xi.user.name;
                     this["id" + index].text = obj.game.xi.user.bizid;
                } else if (brr[index] == obj.game.bei.id) {
                    this["png" + index].texture = RES.getRes("touxiangdaoju_json.logo" + obj.game.bei.user.imageid);
                    this["name" + index].text = obj.game.bei.user.name;
                     this["id" + index].text = obj.game.bei.user.bizid;
                }
            }

            var that = this;
            var timenum = 0;
            // if (obj.gamestate == "11")
            //     timenum = 0
            setTimeout(function () {
                that.vipGroup.visible = true;
                that.vipGroup.touchEnabled = true;
                that.vipccloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, that.onVipClose, that);
            }, timenum);
            return;
        }
        // xianshibaopai
        this.baopaiPng.texture = RES.getRes("majiang_json." + obj.result.game.baopai + "dongchu_png");
        if (obj.result.da_positon) {
            //结束推送
            if (obj.result.da_positon == games.position) {
                if (obj.result.dianpao == "dianpao") {
                    this.dianpaoPng.visible = true;
                } else {
                    this.shulePng.visible = true;
                }
                SoundManager.getInstance().playYx("lost_mp3");
            }
            if (obj.result.hu_postion == games.position) {
                this.yinglePng.visible = true;
                SoundManager.getInstance().playYx("win_mp3");
            }
            if (obj.result.da_positon != games.position && obj.result.hu_postion != games.position) {
                if (obj.result.dianpao == "dianpao") {
                    this.shulePng.visible = true;
                    SoundManager.getInstance().playYx("lost_mp3");
                } else {
                    this.jiesuPng.visible = true;
                }
            }
            this.huchuli(obj.result.game, obj.result.pai, obj.result.hu_postion, obj.result.da_positon, obj.result[obj.result.da_positon], obj.result[obj.result.hu_postion], obj.result);
        } else {
            // 自摸
            if (obj.result.hu_postion == games.position) {
                if (obj.result.bao) {
                    this.mobaohuPng.visible = true;
                } else {
                    this.zimoPng.visible = true;
                }
            } else {
                this.shulePng.visible = true;
                SoundManager.getInstance().playYx("lost_mp3");
            }
            this.huchuli(obj.result.game, obj.result.pai, obj.result.hu_postion, obj.result.da_positon, obj.result[obj.result.da_positon], obj.result[obj.result.hu_postion], obj.result);
        }
        // {"type":"result","da_positon":"xi","hu_postion":"dong","pai":"18","hutype":"peng","dong":2,"nan":0,"xi":-2,"bei":0}
        // da_position  为空的时候就是自摸
        // hutype     dan单吊  peng对倒  bian边胡   jia  夹胡    bzb宝中宝    fbzb风宝中宝   f大风
        var dianpao = "";
        if (obj.result.dianpao == "dianpao") {
            dianpao = "   点炮"
            if (this.idTxt.name == obj.result.game[obj.result.da_positon].id) {
                this.tingTxt.text = "点炮  " + this.tingTxt.text;
            }

            if (this.idTxt0.name == obj.result.game[obj.result.da_positon].id) {
                this.tingTxt0.text = "点炮  " + this.tingTxt0.text;
            }

            if (this.idTxt1.name == obj.result.game[obj.result.da_positon].id) {
                this.tingTxt1.text = "点炮  " + this.tingTxt1.text;
            }

            if (this.idTxt2.name == obj.result.game[obj.result.da_positon].id) {
                this.tingTxt2.text = "点炮  " + this.tingTxt2.text;
            }
        }

        var bao = "";
        if (obj.result.bao) {
            bao = "   抓宝胡"
        }
        var feng = "";
        if (obj.result.feng) {
            feng = "   大风"
        }
        var menqian = "";
        if (obj.result.menqian) {
            menqian = "   门清"
        }
        var lou = "";
        if (obj.result.lou) {
            menqian = "   漏胡"
        }
        switch (obj.result.hutype) {
            case "dan":
                if (obj.result.da_positon)
                    this.hutypeTxt.text = "单吊胡" + dianpao + menqian
                else
                    this.hutypeTxt.text = "单吊自摸" + bao + feng + menqian + lou
                break;
            case "peng":
                if (obj.result.da_positon)
                    this.hutypeTxt.text = "对倒胡" + dianpao + menqian
                else
                    this.hutypeTxt.text = "对倒自摸" + bao + feng + menqian + lou
                break;
            case "bian":
                if (obj.result.da_positon)
                    this.hutypeTxt.text = "边胡" + dianpao + menqian
                else
                    this.hutypeTxt.text = "边自摸" + bao + feng + menqian + lou
                break;
            case "jia":
                if (obj.result.da_positon)
                    this.hutypeTxt.text = "夹胡" + dianpao + menqian
                else
                    this.hutypeTxt.text = "夹自摸" + bao + feng + menqian + lou
                break;
            case "bzb":
                this.hutypeTxt.text = "宝中宝" + menqian
                break;
            case "fbzb":
                this.hutypeTxt.text = "风宝中宝" + menqian
                break;
            case "f":
                this.hutypeTxt.text = "大风" + menqian
                break;
            default:
                break;
        }
        if (obj.result.huResult == "tian")
            this.hutypeTxt.text = "天湖"

        if (obj.result.huResult == "di")
            this.hutypeTxt.text = "地湖";
        var vipstring = "";
        if (obj.result.game.bao == true) {
            vipstring += "红中满天飞   ";
        }
        if (obj.result.game.lou == true) {
            vipstring += "漏胡   ";
        }
        if (obj.result.game.bian == true) {
            vipstring += "3、7调夹   ";
        }
        if (obj.result.game.dian == true) {
            vipstring += "点炮一家付   ";
        }

        if (obj.result.game.hlou == true) {
            vipstring += "红中漏   ";
        }
        this.roomlabel.text = vipstring;

    }

    private onVipClose(event: egret.TouchEvent): void {
        this.vipGroup.touchEnabled = false;
        this.vipGroup.visible = false;
        this.vipGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onVipClose, this);
        //fanhuidating
        if (this.redytuichu == true) {
            this.end("exit");
            this.parent.removeChild(this);
            var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
            changeEvent.eventType = ServerManager.LOGIN_SUCC;
            changeEvent.obj = ViewManager.getInstance().getChildAt(0);
            ViewManager.getInstance().dispatchEvent(changeEvent);
        } else {
            ServerManager.getInstance().exitGame();
        }
    }


    private onClose(event: egret.TouchEvent): void {
        if (ServerManager.getInstance().isVipOpen == true) {
            // WinManager.getInstance().showWin("vip房不能退出")
            ServerManager.getInstance().senDissolve("N", null);
            return;
        }
        ServerManager.getInstance().exitGame();
        this.timer.stop();
    }

    /**
    *流局处理
    */
    private liuju(obj: any) {
        this.fanTxt.text = "0";
        this.fanTxt0.text = "0";
        this.fanTxt1.text = "0";
        this.fanTxt2.text = "0";

        this.fenTxt.text = "0";
        this.fenTxt0.text = "0";
        this.fenTxt1.text = "0";
        this.fenTxt2.text = "0";



        this.tingTxt.text = (obj.dong.isTing == true) ? "听牌" : "未听牌";
        this.tingTxt0.text = (obj.nan.isTing == true) ? "听牌" : "未听牌";
        this.tingTxt1.text = (obj.xi.isTing == true) ? "听牌" : "未听牌";
        this.tingTxt2.text = (obj.bei.isTing == true) ? "听牌" : "未听牌";


        this.idTxt.text = obj.dong.user.name;
        this.idTxt0.text = obj.nan.user.name;
        this.idTxt1.text = obj.xi.user.name;
        this.idTxt2.text = obj.bei.user.name;
        this.idTxt.name = obj.dong.id;
        this.idTxt0.name = obj.nan.id;
        this.idTxt1.name = obj.xi.id;
        this.idTxt2.name = obj.bei.id;
        this.zhuangPng.visible = true;
        // dealPai();
        // 
        this.dealPai(obj.dong, this.group, "dongchu_png");
        this.dealPai(obj.nan, this.group0, "dongchu_png");
        this.dealPai(obj.xi, this.group1, "dongchu_png");
        this.dealPai(obj.bei, this.group2, "dongchu_png");

    }

    /**
   *hu处理
   */
    private huchuli(obj: any, pai: string, hu: string, da: string, shufan: string, hufan: string, obj2: any) {
        var fannum = 1;
        if (obj.roomtype == "0") {
            fannum = 50;
        } else if (obj.roomtype == "1") {
            fannum = 500;
        } else if (obj.roomtype == "2") {

            fannum = 3000;
        }
        if (hu == "dong") {
            this.idTxt.text = obj.dong.user.name;
            this.idTxt0.text = obj.nan.user.name;
            this.idTxt1.text = obj.xi.user.name;
            this.idTxt2.text = obj.bei.user.name;


            this.idTxt.name = obj.dong.id;
            this.idTxt0.name = obj.nan.id;
            this.idTxt1.name = obj.xi.id;
            this.idTxt2.name = obj.bei.id;

            this.fenTxt.text = obj2.dong;
            this.fenTxt0.text = obj2.nan;
            this.fenTxt1.text = obj2.xi;
            this.fenTxt2.text = obj2.bei;

            this.tingTxt.text = (obj.dong.isTing == true) ? "听牌" : "未听牌";
            this.tingTxt0.text = (obj.nan.isTing == true) ? "听牌" : "未听牌";
            this.tingTxt1.text = (obj.xi.isTing == true) ? "听牌" : "未听牌";
            this.tingTxt2.text = (obj.bei.isTing == true) ? "听牌" : "未听牌";
            if (obj.roomtype == "3") {
                this.fenTxt.text += "   总分：" + obj.code4vip[obj.dong.id].code;
                this.fenTxt0.text += "   总分：" + obj.code4vip[obj.nan.id].code;
                this.fenTxt1.text += "   总分：" + obj.code4vip[obj.xi.id].code;
                this.fenTxt2.text += "   总分：" + obj.code4vip[obj.bei.id].code;
            }



            this.fanTxt.text = Number(obj2.dong) / fannum + "翻";
            this.fanTxt0.text = Number(obj2.nan) / fannum + "翻";
            this.fanTxt1.text = Number(obj2.xi) / fannum + "翻";
            this.fanTxt2.text = Number(obj2.bei) / fannum + "翻";

            this.zhuangPng.visible = true;
            if (this.type == "zimo")
                this.dealPai(obj.dong, this.group, "dongchu_png", this.mopai, "zimo");
            else
                this.dealPai(obj.dong, this.group, "dongchu_png", pai);
            this.dealPai(obj.nan, this.group0, "dongchu_png");
            this.dealPai(obj.xi, this.group1, "dongchu_png");
            this.dealPai(obj.bei, this.group2, "dongchu_png");
        }
        if (hu == "nan") {
            this.idTxt0.text = obj.dong.user.name;
            this.idTxt.text = obj.nan.user.name;
            this.idTxt1.text = obj.xi.user.name;
            this.idTxt2.text = obj.bei.user.name;


            this.idTxt0.name = obj.dong.id;
            this.idTxt.name = obj.nan.id;
            this.idTxt1.name = obj.xi.id;
            this.idTxt2.name = obj.bei.id;

            this.fenTxt0.text = obj2.dong;
            this.fenTxt.text = obj2.nan;
            this.fenTxt1.text = obj2.xi;
            this.fenTxt2.text = obj2.bei;

            this.tingTxt.text = (obj.nan.isTing == true) ? "听牌" : "未听牌";
            this.tingTxt0.text = (obj.dong.isTing == true) ? "听牌" : "未听牌";
            this.tingTxt1.text = (obj.xi.isTing == true) ? "听牌" : "未听牌";
            this.tingTxt2.text = (obj.bei.isTing == true) ? "听牌" : "未听牌";
            if (obj.roomtype == "3") {
                this.fenTxt.text += "   总分：" + obj.code4vip[obj.nan.id].code;
                this.fenTxt0.text += "   总分：" + obj.code4vip[obj.dong.id].code;
                this.fenTxt1.text += "   总分：" + obj.code4vip[obj.xi.id].code;
                this.fenTxt2.text += "   总分：" + obj.code4vip[obj.bei.id].code;
            }


            this.fanTxt0.text = Number(obj2.dong) / fannum + "翻";
            this.fanTxt.text = Number(obj2.nan) / fannum + "翻";
            this.fanTxt1.text = Number(obj2.xi) / fannum + "翻";
            this.fanTxt2.text = Number(obj2.bei) / fannum + "翻";
            this.zhuangPng0.visible = true;
            if (this.type == "zimo")
                this.dealPai(obj.nan, this.group, "dongchu_png", this.mopai, "zimo");
            else
                this.dealPai(obj.nan, this.group, "dongchu_png", pai);
            this.dealPai(obj.dong, this.group0, "dongchu_png");
            this.dealPai(obj.xi, this.group1, "dongchu_png");
            this.dealPai(obj.bei, this.group2, "dongchu_png");
        }
        if (hu == "xi") {

            this.idTxt0.text = obj.dong.user.name;
            this.idTxt1.text = obj.nan.user.name;
            this.idTxt.text = obj.xi.user.name;
            this.idTxt2.text = obj.bei.user.name;


            this.idTxt0.name = obj.dong.id;
            this.idTxt1.name = obj.nan.id;
            this.idTxt.name = obj.xi.id;
            this.idTxt2.name = obj.bei.id;

            this.fenTxt0.text = obj2.dong;
            this.fenTxt1.text = obj2.nan;
            this.fenTxt.text = obj2.xi;
            this.fenTxt2.text = obj2.bei;

            this.tingTxt.text = (obj.xi.isTing == true) ? "听牌" : "未听牌";
            this.tingTxt0.text = (obj.dong.isTing == true) ? "听牌" : "未听牌";
            this.tingTxt1.text = (obj.nan.isTing == true) ? "听牌" : "未听牌";
            this.tingTxt2.text = (obj.bei.isTing == true) ? "听牌" : "未听牌";
            if (obj.roomtype == "3") {
                this.fenTxt.text += "   总分：" + obj.code4vip[obj.xi.id].code;
                this.fenTxt0.text += "   总分：" + obj.code4vip[obj.dong.id].code;
                this.fenTxt1.text += "   总分：" + obj.code4vip[obj.nan.id].code;
                this.fenTxt2.text += "   总分：" + obj.code4vip[obj.bei.id].code;
            }

            this.fanTxt0.text = Number(obj2.dong) / fannum + "翻";
            this.fanTxt1.text = Number(obj2.nan) / fannum + "翻";
            this.fanTxt.text = Number(obj2.xi) / fannum + "翻";
            this.fanTxt2.text = Number(obj2.bei) / fannum + "翻";
            this.zhuangPng0.visible = true;
            if (this.type == "zimo")
                this.dealPai(obj.xi, this.group, "dongchu_png", this.mopai, "zimo");
            else
                this.dealPai(obj.xi, this.group, "dongchu_png", pai);
            this.dealPai(obj.dong, this.group0, "dongchu_png");
            this.dealPai(obj.nan, this.group1, "dongchu_png");
            this.dealPai(obj.bei, this.group2, "dongchu_png");
        }
        if (hu == "bei") {

            this.idTxt0.text = obj.dong.user.name;
            this.idTxt1.text = obj.nan.user.name;
            this.idTxt2.text = obj.xi.user.name;
            this.idTxt.text = obj.bei.user.name;


            this.idTxt0.name = obj.dong.id;
            this.idTxt1.name = obj.nan.id;
            this.idTxt2.name = obj.xi.id;
            this.idTxt.name = obj.bei.id;

            this.fenTxt0.text = obj2.dong;
            this.fenTxt1.text = obj2.nan;
            this.fenTxt2.text = obj2.xi;
            this.fenTxt.text = obj2.bei;

            this.tingTxt.text = (obj.bei.isTing == true) ? "听牌" : "未听牌";
            this.tingTxt0.text = (obj.dong.isTing == true) ? "听牌" : "未听牌";
            this.tingTxt1.text = (obj.nan.isTing == true) ? "听牌" : "未听牌";
            this.tingTxt2.text = (obj.xi.isTing == true) ? "听牌" : "未听牌";
            if (obj.roomtype == "3") {
                this.fenTxt.text += "   总分：" + obj.code4vip[obj.bei.id].code;
                this.fenTxt0.text += "   总分：" + obj.code4vip[obj.dong.id].code;
                this.fenTxt1.text += "   总分：" + obj.code4vip[obj.nan.id].code;
                this.fenTxt2.text += "   总分：" + obj.code4vip[obj.xi.id].code;
            }

            this.fanTxt0.text = Number(obj2.dong) / fannum + "翻";
            this.fanTxt1.text = Number(obj2.nan) / fannum + "翻";
            this.fanTxt2.text = Number(obj2.xi) / fannum + "翻";
            this.fanTxt.text = Number(obj2.bei) / fannum + "翻";
            this.zhuangPng0.visible = true;
            if (this.type == "zimo")
                this.dealPai(obj.bei, this.group, "dongchu_png", this.mopai, "zimo");
            else
                this.dealPai(obj.bei, this.group, "dongchu_png", pai);
            this.dealPai(obj.dong, this.group0, "dongchu_png");
            this.dealPai(obj.nan, this.group1, "dongchu_png");
            this.dealPai(obj.xi, this.group2, "dongchu_png");
        }

    }
    private dealPai(arr1: any, group: eui.Group, typepng: string, hupai: String = null, zimo: String = null) {
        var gangarr = [];
        var dealX = 0;
        if (arr1.gang) {
            gangarr = String(arr1.gang).split(";");
            for (var i = 0; i < gangarr.length; i++) {
                for (var index = 0; index < 4; index++) {
                    var pai = GamePool.getInstance().getPNG();
                    pai.texture = RES.getRes("majiang_json." + gangarr[i] + typepng);
                    group.addChild(pai);
                    pai.x = dealX + index * 47;
                }
                dealX += 47 * 4 + 20;
            }
        }
        if (arr1.peng) {
            var str = String(arr1.peng).split(";");
            for (var i = 0; i < str.length; i++) {
                if (gangarr.indexOf(str[i]) != -1) {
                    //有刚
                    console.log("有刚:" + str[i]);
                    continue;
                }
                for (var index = 0; index < 3; index++) {
                    var pai = GamePool.getInstance().getPNG();
                    pai.texture = RES.getRes("majiang_json." + str[i] + typepng);
                    group.addChild(pai);
                    pai.x = dealX + index * 47;
                }
                dealX += 47 * 3 + 20;
            }
        }
        if (arr1.chi) {
            var str = String(arr1.chi).split(";");
            for (var i = 0; i < str.length; i++) {
                var chistr = String(str[i]).split(",");
                for (var j = 0; j < chistr.length; j++) {
                    var pai = GamePool.getInstance().getPNG();
                    pai.texture = RES.getRes("majiang_json." + chistr[j] + typepng);
                    group.addChild(pai);
                    pai.x = dealX + j * 47;
                }
                dealX += 47 * 3 + 20;
            }
        }
        //如果是漏胡，就把牌中摸回来的去掉，放后面显示
        if (this.lou == false && hupai != null && zimo != null) {
            var numindex = arr1.pai.indexOf(this.mopai);
            arr1.pai.splice(numindex, 1)
        }

        arr1.pai.sort(function (a, b) { return Number(a) - Number(b) });
        for (var index = 0; index < arr1.pai.length; index++) {
            var pai = GamePool.getInstance().getPNG();
            pai.texture = RES.getRes("majiang_json." + arr1.pai[index] + typepng);
            group.addChild(pai);
            pai.x = dealX + index * 47;
        }
        dealX += arr1.pai.length * 47 + 40;


        if (hupai != null) {
            var pai = GamePool.getInstance().getPNG();
            pai.texture = RES.getRes("majiang_json." + hupai + typepng);
            group.addChild(pai);
            pai.x = dealX + 40;
        }
    }
    /**
    *准备
    */
    private onReady(e: egret.TouchEvent) {
        ServerManager.getInstance().senReady();
        this.end();
    }
    //结束界面，释放监听
    public end(str: string = null) {
        this.timer.stop();
        this.fanTxt.text = "0";
        this.fanTxt0.text = "0";
        this.fanTxt1.text = "0";
        this.fanTxt2.text = "0";
        this.fenTxt.text = "0";
        this.fenTxt0.text = "0";
        this.fenTxt1.text = "0";
        this.fenTxt2.text = "0";
        this.roomlabel.text = "";
        this.zhuangPng.visible = false;
        this.zhuangPng0.visible = false;
        this.zhuangPng1.visible = false;
        this.zhuangPng2.visible = false;
        while (this.group.numChildren > 0) {
            GamePool.getInstance().setPNG(this.group.removeChild(this.group.getChildAt(0)) as eui.Image);
        }
        while (this.group0.numChildren > 0) {
            GamePool.getInstance().setPNG(this.group0.removeChild(this.group0.getChildAt(0)) as eui.Image);
        }
        while (this.group1.numChildren > 0) {
            GamePool.getInstance().setPNG(this.group1.removeChild(this.group1.getChildAt(0)) as eui.Image);
        }
        while (this.group2.numChildren > 0) {
            GamePool.getInstance().setPNG(this.group2.removeChild(this.group2.getChildAt(0)) as eui.Image);
        }

        this.readyBtn.touchEnabled = false;
        this.readyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReady, this);

        this.jiesucloseBtn.touchEnabled = false;
        this.jiesucloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        if (str == null) {
            this.gamesen.addChild(this.gamesen.waitSen);
            this.gamesen.waitSen.start();
            this.gamesen.removeChild(this);
            //处理得分
            this.dealcode();
        }
    }
    private dealcode(): void {
        var obj;
        if (this.oldobj.game) {
            obj = this.oldobj.game;
        } else {
            obj = this.oldobj.result.game;
        }
        var wailt = this.gamesen.waitSen;
        this.setWaitcode(wailt, obj.dong, obj);
        this.setWaitcode(wailt, obj.nan, obj);
        this.setWaitcode(wailt, obj.xi, obj);
        this.setWaitcode(wailt, obj.bei, obj);
    }
    private setWaitcode(wailt: WaitSen, obj: any, oldobj: any): void {
        if (wailt.wait_dongName.name == obj.id) {
            if (ServerManager.getInstance().isVipOpen == true) {
                wailt.wait_dongCode.text = oldobj.code4vip[wailt.wait_dongName.name].code
            } else {
                wailt.wait_dongCode.text = obj.user.amount;
            }
        }
        if (wailt.wait_nanName.name == obj.id) {
            if (ServerManager.getInstance().isVipOpen == true) {
                wailt.wait_nanCode.text = oldobj.code4vip[wailt.wait_nanName.name].code
            } else {
                wailt.wait_nanCode.text = obj.user.amount;
            }
        }
        if (wailt.wait_xiName.name == obj.id) {
            if (ServerManager.getInstance().isVipOpen == true) {
                wailt.wait_xiCode.text = oldobj.code4vip[wailt.wait_xiName.name].code
            } else {
                wailt.wait_xiCode.text = obj.user.amount;
            }
        }
        if (wailt.wait_beiName.name == obj.id) {
            if (ServerManager.getInstance().isVipOpen == true) {
                wailt.wait_beiCode.text = oldobj.code4vip[wailt.wait_beiName.name].code
            } else {
                wailt.wait_beiCode.text = obj.user.amount;
            }
        }

    }
}
