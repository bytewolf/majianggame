/**
 *
 * @author
 *
 */
var GamePlayView = (function (_super) {
    __extends(GamePlayView, _super);
    function GamePlayView() {
        _super.call(this);
        /**
         *当前的位置，东南西北
         */
        this.position = "dong";
        /**
         *是否能出牌
         */
        this.ischupai = false;
        /**
         *吃完之后手上牌的开始位置
         */
        this.dongchix = GamePlayView.CHUSHIWEIZHI;
        this.pengArr = [];
        /**
         *右边吃牌个数
         */
        this.youchiNum = 0;
        /**
         *上边吃牌个数
         */
        this.shangchiNum = 0;
        /**
         *左边吃牌个数
         */
        this.zuochiNum = 0;
        /**
         *是否可以多吃
         */
        this.isDuochi = false;
        /**
         *多吃数组
         */
        this.duochiArr = [];
        /**
         *多吃存图片数组
         */
        this.duochiPngArr = [];
        /**
         *控制获得听牌和抢听的时候，出牌阶段，如果是点击没有弹起的牌，return，点击
         */
        this.isTing = false;
        this.isZimo = false;
        this.isPorMO = "";
        this.dongmanorfeman = false;
        this.nanmanorfeman = false;
        this.ximanorfeman = false;
        this.beimanorfeman = true;
        //处理暗杠的数组
        this.xiagangarr = [];
        this.yougangarr = [];
        this.shanggangarr = [];
        this.zuogangarr = [];
        this.ischitu = false;
        this.isqting = false;
        this.isActionTing = false;
        this.ischonglian = false;
        this.islou = false;
        this.ismove = false;
        this.paiArr = new Array();
        this.dongchipengArr = new Array();
        this.nanArr = new Array();
        this.xiArr = new Array();
        this.beiArr = new Array();
        this.skinName = "resource/SKIN/GameSkin.exml";
        this.dong.visible = false;
        this.nan.visible = false;
        this.xi.visible = false;
        this.bei.visible = false;
        //设置东南西北的闪动，表示到那一方位的人的出牌阶段
        this.dongTween = egret.Tween.get(this.dong, { loop: true });
        this.dongTween.to({ alpha: 0 }, 1000).to({ alpha: 1 }, 1000);
        this.dongTween.setPaused(true);
        this.nanTween = egret.Tween.get(this.nan, { loop: true });
        this.nanTween.to({ alpha: 0 }, 1000).to({ alpha: 1 }, 1000);
        this.nanTween.setPaused(true);
        this.xiTween = egret.Tween.get(this.xi, { loop: true });
        this.xiTween.to({ alpha: 0 }, 1000).to({ alpha: 1 }, 1000);
        this.xiTween.setPaused(true);
        this.beiTween = egret.Tween.get(this.bei, { loop: true });
        this.beiTween.to({ alpha: 0 }, 1000).to({ alpha: 1 }, 1000);
        this.beiTween.setPaused(true);
        this.zuomoPai.visible = false;
        this.shangmoPai.visible = false;
        this.youmoPai.visible = false;
        this.chiBtn.visible = false;
        // this.chiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChi, this);
        this.pengBtn.visible = false;
        this.gangBtn.visible = false;
        this.guoBtn.visible = false;
        this.qtingBtn.visible = false;
        this.pengtingBtn.visible = false;
        this.overSen = new OverGameSen();
        this.overSen.name = "overSen";
        this.waitSen = new WaitSen;
        this.waitSen.name = "waitSen";
        var data = RES.getRes("chi_json");
        var texture = RES.getRes("chi_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.chiMovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("chi"));
        var data = RES.getRes("peng_json");
        var texture = RES.getRes("peng_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.pengMovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("peng"));
        var data = RES.getRes("hu_json");
        var texture = RES.getRes("hu_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.huMovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("hu"));
        this.huMovieClip.x = 366;
        this.huMovieClip.y = 50;
        var data = RES.getRes("ting_json");
        var texture = RES.getRes("tingmc_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.tingMovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("ting"));
        var data = RES.getRes("shou_json");
        var texture = RES.getRes("shou_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.shouMovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("shou"));
        var data = RES.getRes("mobaohu_json");
        var texture = RES.getRes("mobaohu_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.mobaohuMovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("mobaohu"));
        this.mobaohuMovieClip.x = 370;
        this.mobaohuMovieClip.y = 150;
        var data = RES.getRes("tianhu_json");
        var texture = RES.getRes("tianhu_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.tianhuMovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("tianhu"));
        this.tianhuMovieClip.x = 500;
        this.tianhuMovieClip.y = 150;
        var data = RES.getRes("dihu_json");
        var texture = RES.getRes("dihu_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.dihuMovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("dihu"));
        this.dihuMovieClip.x = 500;
        this.dihuMovieClip.y = 150;
        var data = RES.getRes("menqingting_json");
        var texture = RES.getRes("menqingting_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.menqingtingMovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("menqingting"));
        this.menqingtingMovieClip.x = 500;
        this.menqingtingMovieClip.y = 150;
        var data = RES.getRes("baozhongbao_json");
        var texture = RES.getRes("baozhongbao_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.baozhongbaoMovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("baozhongbao"));
        this.baozhongbaoMovieClip.x = 500;
        this.baozhongbaoMovieClip.y = 150;
        var data = RES.getRes("louhu_json");
        var texture = RES.getRes("louhu_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.louhuMovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("louhu"));
        this.louhuMovieClip.x = 500;
        this.louhuMovieClip.y = 150;
        var data = RES.getRes("dafeng_json");
        var texture = RES.getRes("dafeng_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.dafengMovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("dafeng"));
        this.dafengMovieClip.x = 500;
        this.dafengMovieClip.y = 150;
        var data = RES.getRes("hongzhongmatianfei_json");
        var texture = RES.getRes("hongzhongmatianfei_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.hongzhongMovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("hongzhongmatianfei"));
        this.hongzhongMovieClip.x = 370;
        this.hongzhongMovieClip.y = 150;
        var data = RES.getRes("tileImagemc_json");
        var texture = RES.getRes("tileImagemc_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.tileImage = new egret.MovieClip(mcDataFactory.generateMovieClipData("tilelmagemc"));
        this.tileImage.play(-1);
        // this.tileImage = new eui.Image(RES.getRes("tileImage_png"))
        this.chupaiImage = new eui.Image();
        this.chupaiImagekuang = new eui.Image(RES.getRes("chupaikuang_png"));
        this.chupaiImagekuang.width = 100;
        this.chupaiImagekuang.height = 140;
        this.hupaiImage = new eui.Image();
        this.vipWanfabtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchON, this);
        this.vipWanfabtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchOUT, this);
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.huanbaoTxt = new eui.Label;
        this.huanbaoTxt.size = 80;
        this.huanbaoTxt.width = 1280;
        this.huanbaoTxt.textColor = 0xF3FF06;
        this.huanbaoTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.huanbaoTxt.y = 150;
        this.huanbaoTxt.text = "换宝了";
        this.huanbaoPng = new eui.Image;
        this.huanbaoPng.horizontalCenter = 0;
        this.huanbaoPng.verticalCenter = 0;
    }
    var d = __define,c=GamePlayView,p=c.prototype;
    p.onTimer = function (event) {
        this.timeNumText.text = String(Number(this.timeNumText.text) - 1);
        if (Number(this.timeNumText.text) == 0) {
            this.timer.stop();
        }
        if (Number(this.timeNumText.text) == 1 || Number(this.timeNumText.text) == 2 || Number(this.timeNumText.text) == 3 || Number(this.timeNumText.text) == 4 || Number(this.timeNumText.text) == 5) {
            SoundManager.getInstance().playYx("effect_warning_mp3");
        }
    };
    p.onTianhuClip = function (event) {
        this.removeChild(this.tianhuMovieClip);
        this.tianhuMovieClip.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onTianhuClip, this);
    };
    p.onDihuClip = function (event) {
        this.removeChild(this.dihuMovieClip);
        this.dihuMovieClip.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onDihuClip, this);
    };
    p.onMenqingtingClip = function (event) {
        this.removeChild(this.menqingtingMovieClip);
        this.menqingtingMovieClip.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onMenqingtingClip, this);
    };
    p.onMobaohuClip = function (event) {
        this.removeChild(this.mobaohuMovieClip);
        this.mobaohuMovieClip.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onMobaohuClip, this);
    };
    p.onLouhuClip = function (event) {
        this.removeChild(this.louhuMovieClip);
        this.louhuMovieClip.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onLouhuClip, this);
    };
    p.onHongzhongClip = function (event) {
        this.removeChild(this.hongzhongMovieClip);
        this.hongzhongMovieClip.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onHongzhongClip, this);
    };
    p.onDafengClip = function (event) {
        this.removeChild(this.dafengMovieClip);
        this.dafengMovieClip.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onDafengClip, this);
    };
    p.onBaozhongbaoClip = function (event) {
        this.removeChild(this.baozhongbaoMovieClip);
        this.baozhongbaoMovieClip.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onBaozhongbaoClip, this);
    };
    p.onShouMovieClip = function (event) {
        this.removeChild(this.shouMovieClip);
        this.shouMovieClip.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onShouMovieClip, this);
    };
    p.onTingMovieClip = function (event) {
        this.removeChild(this.tingMovieClip);
        this.tingMovieClip.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onTingMovieClip, this);
    };
    p.onHuMovieClip = function (event) {
        var that = this;
        setTimeout(function () {
            that.removeChild(that.huMovieClip);
            that.huMovieClip.removeEventListener(egret.MovieClipEvent.COMPLETE, that.onHuMovieClip, that);
        }, 2000);
    };
    p.onPengMovieClip = function (event) {
        this.removeChild(this.pengMovieClip);
        this.pengMovieClip.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onPengMovieClip, this);
    };
    p.onChiMovieClip = function (event) {
        this.removeChild(this.chiMovieClip);
        this.chiMovieClip.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onChiMovieClip, this);
    };
    p.getPositionPoint = function (obj) {
        var s = new egret.Point;
        if (obj.position == this.position) {
            s.x = 589 - 238;
            s.y = 488 - 169;
        }
        else {
            var szxy = this.getOtherPosition(obj.position);
            if (szxy == "you") {
                s.x = 771 - 238;
                s.y = 301 - 169;
            }
            else if (szxy == "shang") {
                s.x = 589 - 238;
                s.y = 160 - 169;
            }
            else {
                s.x = 430 - 238;
                s.y = 301 - 169;
            }
        }
        return s;
    };
    /**
    *获得有人自摸
   */
    p.getZimo = function (obj) {
        // {"type":"zimo","pai":"19","position":"bei","version":44} lou fbzb bzb feng bao zimo hu 
        if (obj.result.huResult == "zimo") {
            this.addChild(this.huMovieClip);
            this.huMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onHuMovieClip, this);
            this.huMovieClip.gotoAndPlay(1);
            if (obj.result.hutype == "jia")
                SoundManager.getInstance().playYx("zimojia1_mp3", this[obj.position + "manorfeman"]);
            else
                SoundManager.getInstance().playYx("zimo1_mp3", this[obj.position + "manorfeman"]);
        }
        else {
            switch (obj.result.huResult) {
                case "tian":
                    this.addChild(this.tianhuMovieClip);
                    this.tianhuMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onTianhuClip, this);
                    this.tianhuMovieClip.gotoAndPlay(1);
                    SoundManager.getInstance().playYx("tianhu_mp3", this[obj.position + "manorfeman"]);
                    break;
                case "lou":
                    this.addChild(this.louhuMovieClip);
                    this.louhuMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onLouhuClip, this);
                    this.louhuMovieClip.gotoAndPlay(1);
                    // SoundManager.getInstance().playYx("loule1_mp3", this[obj.position + "manorfeman"]);
                    this.setSound("louhu", this[obj.position + "manorfeman"]);
                    break;
                case "fbzb":
                    if (obj.result.pai != "0") {
                        this.addChild(this.dafengMovieClip);
                        this.dafengMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onDafengClip, this);
                        this.dafengMovieClip.gotoAndPlay(1);
                        // SoundManager.getInstance().playYx("dafeng1_mp3", this[obj.position + "manorfeman"]);
                        this.setSound("dafeng", this[obj.position + "manorfeman"]);
                    }
                    break;
                case "bzb":
                    if (obj.result.pai != "0") {
                        this.addChild(this.baozhongbaoMovieClip);
                        this.baozhongbaoMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onBaozhongbaoClip, this);
                        this.baozhongbaoMovieClip.gotoAndPlay(1);
                        SoundManager.getInstance().playYx("baozhongbao1_mp3", this[obj.position + "manorfeman"]);
                    }
                    break;
                case "feng":
                    if (obj.result.pai != "0") {
                        this.addChild(this.dafengMovieClip);
                        this.dafengMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onDafengClip, this);
                        this.dafengMovieClip.gotoAndPlay(1);
                        // SoundManager.getInstance().playYx("dafeng1_mp3", this[obj.position + "manorfeman"]);
                        this.setSound("dafeng", this[obj.position + "manorfeman"]);
                    }
                    break;
                case "bao":
                    if (obj.result.pai != "0") {
                        this.addChild(this.mobaohuMovieClip);
                        this.mobaohuMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onMobaohuClip, this);
                        this.mobaohuMovieClip.gotoAndPlay(1);
                        // SoundManager.getInstance().playYx("mobaohu1_mp3", this[obj.position + "manorfeman"]);
                        this.setSound("mobaohu", this[obj.position + "manorfeman"]);
                    }
                    break;
                default:
                    break;
            }
            if (obj.result.pai == "0") {
                // SoundManager.getInstance().playYx("hongzhong1_mp3", this[obj.position + "manorfeman"]);
                this.setSound("hongzhong", this[obj.position + "manorfeman"]);
                if (obj.result.huResult != "lou") {
                    this.addChild(this.hongzhongMovieClip);
                    this.hongzhongMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onHongzhongClip, this);
                    this.hongzhongMovieClip.gotoAndPlay(1);
                }
            }
        }
        this.gameover(obj);
        this.unviewChiPeng();
    };
    /**
      *获得宝牌信息
      */
    p.getBao = function (obj) {
        //    {"type":"bao","pai":"26"}  
        console.log(this.oldbaipai);
        // 相同宝不提示
        if (this.oldbaipai == obj.pai) {
            return;
        }
        //提示换宝
        if (this.isTing == false && this.zuoTingPng.visible == false && this.shangTingPng.visible == false && this.youTingPng.visible == false) {
            console.log("如果没人听牌    换宝");
            //如果没人听牌，就不处理
            this.oldbaipai = obj.pai;
            return;
        }
        // 第一个宝不需要提示
        if (Number(ServerManager.getInstance().vision) < 6) {
            // 如果第一个人一开始就听牌，然后出牌，就不提示换宝了
            this.oldbaipai = obj.pai;
            return;
        }
        this.addChild(this.huanbaoTxt);
        this.huanbaoPng.texture = RES.getRes("majiang_json." + this.oldbaipai + "dongshow_png");
        console.log("换宝:" + this.oldbaipai);
        this.addChild(this.huanbaoPng);
        var that = this;
        setTimeout(function () {
            that.removeChild(that.huanbaoTxt);
            if (that.huanbaoPng.parent) {
                that.huanbaoPng.parent.removeChild(that.huanbaoPng);
            }
        }, 4000);
        //如果自己已经听牌，又不是带漏的，就换上面的宝牌，
        if (this.isTing == true) {
            if (this.islou == false) {
                this.baoPai.texture = RES.getRes("majiang_json." + obj.pai + "dongshow_png");
            }
        }
        this.oldbaipai = obj.pai;
        SoundManager.getInstance().playYx("newhuanbao_mp3", false);
    };
    /**
    *获得结束
    */
    p.getResult = function (obj) {
        // {"type":"result","da_positon":"xi","hu_postion":"dong","pai":"18","hutype":"peng","dong":2,"nan":0,"xi":-2,"bei":0} 
        this.gameover(obj);
        this.unviewChiPeng();
    };
    /**
    *获得有人胡
     */
    p.getHu = function (obj) {
        // {"type":"hu","position":"bei","pai":"27","version":85}   摸宝胡只有自摸才有
        if (obj.result.huResult == "di") {
            this.addChild(this.dihuMovieClip);
            this.dihuMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onDihuClip, this);
            this.dihuMovieClip.gotoAndPlay(1);
            // SoundManager.getInstance().playYx("hu1_mp3", this[obj.position + "manorfeman"]);
            this.setSound("dihu", this[obj.position + "manorfeman"]);
        }
        else {
            this.addChild(this.huMovieClip);
            this.huMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onHuMovieClip, this);
            this.huMovieClip.gotoAndPlay(1);
            if (obj.result.hutype == "jia") {
                SoundManager.getInstance().playYx("jiahu1_mp3", this[obj.position + "manorfeman"]);
            }
            else {
                SoundManager.getInstance().playYx("hu1_mp3", this[obj.position + "manorfeman"]);
            }
        }
        this.gameover(obj);
        this.unviewChiPeng();
    };
    /**
     *获得有人抢听
    */
    p.getQting = function (obj) {
        this.setPostionLight(obj.position);
        this.settimetext();
        // SoundManager.getInstance().playYx("ting1_mp3", this[obj.position + "manorfeman"]);
        //    {"type":"qting","pai":"13,14,15","position":"dong","version":78} 
        var point = this.getPositionPoint(obj);
        this.tingMovieClip.x = point.x;
        this.tingMovieClip.y = point.y;
        this.addChild(this.tingMovieClip);
        this.tingMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onTingMovieClip, this);
        this.tingMovieClip.gotoAndPlay(1);
        // 这里处理一下数据，直接给到之前的吃碰接口
        this.currentAction = obj.position;
        var oldpai = obj.pai;
        var lengarr = String(obj.pai).split(",");
        if (lengarr.length > 1) {
            this.setSound("chiting", this[obj.position + "manorfeman"]);
            obj.type = "chi";
            if (String(obj.pai).indexOf(this.currentPai) == 0) {
                obj.pai = String(obj.pai).replace(this.currentPai + ",", "");
            }
            else {
                obj.pai = String(obj.pai).replace("," + this.currentPai, "");
            }
            this.getChi(obj, 2);
        }
        else {
            obj.type = "peng";
            this.setSound("chating", this[obj.position + "manorfeman"]);
            this.getPeng(obj, 2);
        }
        if (obj.position == this.position) {
            this.xiaTingPng.visible = true;
            this.isTing = true;
            this.ischupai = true;
            //先收集可以出的牌
            var brr = [];
            for (var index = 0; index < this.huchi.length; index++) {
                var s = this.huchi[index].hu;
                for (var item in s) {
                    var chiarr = s[item].chi;
                    for (var i = 0; i < chiarr.length; i++) {
                        if (chiarr[i] == oldpai) {
                            brr.push(this.huchi[index].pai);
                        }
                    }
                    if (s[item].peng == oldpai) {
                        brr.push(this.huchi[index].pai);
                    }
                }
            }
            var crr = this.unique(brr);
            //自己抢听
            for (var j = 0; j < crr.length; j++) {
                //把可以出的牌网上放一下
                for (var p = 0; p < this.paiArr.length; p++) {
                    if (this.paiArr[p].name == crr[j]) {
                        this.paiArr[p].y = 578;
                        this.paiArr[p].alpha = 1;
                    }
                    else {
                        // 把不可以出的牌变黑,如果之前已经可以出，那就不用变黑
                        if (this.paiArr[p].y != 578)
                            this.paiArr[p].alpha = 0.8;
                    }
                }
            }
        }
        else {
            //别人听只需要显示听的图标，自己听也需要，所以按位置来判断
            var pp = this.getOtherPosition(obj.position);
            if (pp == "you") {
                this.youTingPng.visible = true;
            }
            else if (pp == "shang") {
                this.shangTingPng.visible = true;
            }
            else if (pp == "zuo") {
                this.zuoTingPng.visible = true;
            }
        }
    };
    /**
    *获得有人听
   */
    p.getting = function (obj) {
        this.setPostionLight(obj.position);
        this.settimetext();
        // {"type":"qting","pai":"19","position":"bei","version":44} 
        // {"type":"action","ting":"ting","huchi":[{"pai":"13","hu":{"17":"17"}},{"pai":"13","hu":{"19":"19"}}],"version":59}
        SoundManager.getInstance().playYx("ting1_mp3", this[obj.position + "manorfeman"]);
        var point = this.getPositionPoint(obj);
        this.tingMovieClip.x = point.x;
        this.tingMovieClip.y = point.y;
        this.addChild(this.tingMovieClip);
        this.tingMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onTingMovieClip, this);
        this.tingMovieClip.gotoAndPlay(1);
        this.currentAction = obj.position;
        if (obj.position == this.position) {
            //xin de jin zhi ting de shi hou chu pai ,shou dao ting hou keyi chupai
            this.ischupai = true;
            if (this.dongchipengArr.length == this.xiagangarr.length) {
                this.addChild(this.menqingtingMovieClip);
                this.menqingtingMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onMenqingtingClip, this);
                this.menqingtingMovieClip.gotoAndPlay(1);
                SoundManager.getInstance().playYx("menqingting_mp3", false);
            }
            this.xiaTingPng.visible = true;
            this.isTing = true;
            //自己听
            for (var index = 0; index < this.huchi.length; index++) {
                //把可以出的牌网上放一下
                for (var i = 0; i < this.paiArr.length; i++) {
                    if (this.paiArr[i].name == this.huchi[index].pai) {
                        this.paiArr[i].y = 578;
                        this.paiArr[i].alpha = 1;
                    }
                    else {
                        // 把不可以出的牌变黑
                        if (this.paiArr[i].y != 578)
                            this.paiArr[i].alpha = 0.8;
                    }
                }
            }
        }
        else {
            //别人听只需要显示听的图标，自己听也需要，所以按位置来判断
            var pp = this.getOtherPosition(obj.position);
            if (pp == "you") {
                if (this.youchiNum == this.yougangarr.length) {
                    this.addChild(this.menqingtingMovieClip);
                    this.menqingtingMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onMenqingtingClip, this);
                    this.menqingtingMovieClip.gotoAndPlay(1);
                    SoundManager.getInstance().playYx("menqingting_mp3", false);
                }
                this.youTingPng.visible = true;
            }
            else if (pp == "shang") {
                if (this.shangchiNum == this.shanggangarr.length) {
                    this.addChild(this.menqingtingMovieClip);
                    this.menqingtingMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onMenqingtingClip, this);
                    this.menqingtingMovieClip.gotoAndPlay(1);
                    SoundManager.getInstance().playYx("menqingting_mp3", false);
                }
                this.shangTingPng.visible = true;
            }
            else if (pp == "zuo") {
                if (this.zuochiNum == this.zuogangarr.length) {
                    this.addChild(this.menqingtingMovieClip);
                    this.menqingtingMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onMenqingtingClip, this);
                    this.menqingtingMovieClip.gotoAndPlay(1);
                    SoundManager.getInstance().playYx("menqingting_mp3", false);
                }
                this.zuoTingPng.visible = true;
            }
        }
    };
    p.setSound = function (str, bol) {
        if (Math.random() > 0.5) {
            SoundManager.getInstance().playYx(str + "_mp3", bol);
        }
        else {
            SoundManager.getInstance().playYx(str + "2_mp3", bol);
        }
    };
    /**
    *获得有人碰
    */
    p.getPeng = function (obj, num) {
        if (num === void 0) { num = null; }
        this.setPostionLight(obj.position);
        this.settimetext();
        // 吃完之后就是摸牌一样的效果
        this.isPorMO = "MO";
        // var obj = { "type": "peng", "pai": "1", "position": "bei", "version": 6 };
        if (num != 2) {
            // SoundManager.getInstance().playYx("cha1_mp3",this[obj.position+"manorfeman"]);
            this.setSound("cha", this[obj.position + "manorfeman"]);
            var point = this.getPositionPoint(obj);
            this.pengMovieClip.x = point.x;
            this.pengMovieClip.y = point.y;
            this.addChild(this.pengMovieClip);
            this.pengMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onPengMovieClip, this);
            this.pengMovieClip.gotoAndPlay(1);
        }
        this.currentAction = obj.position;
        this.pengBtn.visible = false;
        this.gangBtn.visible = false;
        //去掉桌面出的牌
        if (this.tileImage.parent) {
            this.tileImage.parent.removeChild(this.tileImage);
        }
        if (this.chupaiImage.parent) {
            this.chupaiImage.parent.removeChild(this.chupaiImage);
            this.chupaiImagekuang.parent.removeChild(this.chupaiImagekuang);
        }
        if (this.currentChuPai.parent)
            GamePool.getInstance().setPNG(this.currentChuPai.parent.removeChild(this.currentChuPai));
        var xuanhuan = 3;
        if (obj.position == this.position) {
            //自己碰
            this.pengArr.push(obj.pai);
            if (this.xiagangarr.length > 1) {
                this.setAngangMing(this.xiagangarr, 1);
            }
            for (var index = 0; index < xuanhuan; index++) {
                var pai = GamePool.getInstance().getPNG();
                pai.texture = RES.getRes("majiang_json." + obj.pai + "dongchipeng_png");
                pai.x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * index;
                pai.y = 598;
                pai.name = obj.pai;
                this.addChild(pai);
                this.dongchipengArr.push(pai);
            }
            this.dongchix += GamePlayView.ZIJIPAIWIDTH * xuanhuan + 10;
            var v1;
            for (var index = 0; index < 2; index++) {
                for (var i = 0; i < this.paiArr.length; i++) {
                    if (this.paiArr[i].name == obj.pai) {
                        v1 = i;
                        break;
                    }
                }
                this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickPai, this);
                this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
                this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
                GamePool.getInstance().setPNG(this.removeChild(this.paiArr[v1]), 2);
                this.paiArr.splice(v1, 1);
            }
            //后面的牌重新排一下，最大的在摸牌位置
            for (var i = 0; i < this.paiArr.length; i++) {
                this.paiArr[i].x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * i;
                this.paiArr[i].y = 598;
                if (i == this.paiArr.length - 1) {
                    this.paiArr[i].x += 20;
                }
            }
            this.ischupai = true;
        }
        else {
            //别人
            var pp = this.getOtherPosition(obj.position);
            if (pp == "you") {
                if (this.yougangarr.length > 1) {
                    this.setAngangMing(this.yougangarr, 2);
                }
                // 先把前面的牌往上提
                for (var index = 0; index < this.nanArr.length - this.youchiNum; index++) {
                    this.nanArr[index].y -= 15;
                }
                for (var index = 0; index < xuanhuan; index++) {
                    this.nanArr[this.nanArr.length - this.youchiNum - 1].texture = RES.getRes("majiang_json." + obj.pai + "nanchu_png");
                    this.nanArr[this.nanArr.length - this.youchiNum - 1].name = obj.pai;
                    this.youchiNum++;
                }
            }
            else if (pp == "shang") {
                if (this.shanggangarr.length > 1) {
                    this.setAngangMing(this.shanggangarr, 3);
                }
                // 先把已经彭吃刚的牌往后移动
                for (var index = 0; index < this.shangchiNum; index++) {
                    this.xiArr[this.xiArr.length - index - 1].x += 10;
                }
                for (var index = 0; index < xuanhuan; index++) {
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].texture = RES.getRes("majiang_json." + obj.pai + "xichu_png");
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].name = obj.pai;
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].x += 10;
                    this.shangchiNum++;
                }
            }
            else if (pp == "zuo") {
                if (this.zuogangarr.length > 1) {
                    this.setAngangMing(this.zuogangarr, 4);
                }
                // 先把已经彭吃刚的牌往后移动
                for (var index = 0; index < this.zuochiNum; index++) {
                    this.beiArr[index].y -= 15;
                }
                for (var index = 0; index < xuanhuan; index++) {
                    this.beiArr[this.zuochiNum].texture = RES.getRes("majiang_json." + obj.pai + "beichu_png");
                    this.beiArr[this.zuochiNum].name = obj.pai;
                    this.zuochiNum++;
                }
            }
        }
    };
    p.setAngangMing = function (array, num) {
        console.log("有暗杠");
        for (var index = 0; index < array.length; index++) {
            if (num == 1) {
                array[index].texture = RES.getRes("majiang_json." + array[index].name + "dongchipeng_png");
            }
            else if (num == 2) {
                array[index].texture = RES.getRes("majiang_json." + array[index].name + "nanchu_png");
            }
            else if (num == 3) {
                array[index].texture = RES.getRes("majiang_json." + array[index].name + "xichu_png");
            }
            else if (num == 4) {
                array[index].texture = RES.getRes("majiang_json." + array[index].name + "beichu_png");
            }
        }
    };
    p.getAGang = function (obj) {
        this.setPostionLight(obj.position);
        this.settimetext();
        this.setSound("gang", this[obj.position + "manorfeman"]);
        this.currentAction = obj.position;
        this.pengBtn.visible = false;
        this.gangBtn.visible = false;
        var xuanhuan = 4;
        if (obj.position == this.position) {
            var isAN = true;
            // 如果有吃碰明杠了，就不再有暗杠出现
            if (this.dongchipengArr.length > this.xiagangarr.length) {
                isAN = false;
            }
            for (var index = 0; index < xuanhuan; index++) {
                var pai = GamePool.getInstance().getPNG();
                if (isAN == true) {
                    if (index == xuanhuan - 1) {
                        // 暗杠显示最后一张牌
                        pai.texture = RES.getRes("majiang_json." + obj.pai + "dongchipeng_png");
                    }
                    else {
                        pai.texture = RES.getRes("xiaAN_png");
                    }
                    this.xiagangarr.push(pai);
                }
                else {
                    pai.texture = RES.getRes("majiang_json." + obj.pai + "dongchipeng_png");
                }
                pai.x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * index;
                pai.y = 598;
                pai.name = obj.pai;
                this.addChild(pai);
                this.dongchipengArr.push(pai);
            }
            this.dongchix += GamePlayView.ZIJIPAIWIDTH * xuanhuan + 10;
            var v1;
            var klength = 4;
            for (var index = 0; index < klength; index++) {
                for (var i = 0; i < this.paiArr.length; i++) {
                    if (this.paiArr[i].name == obj.pai) {
                        v1 = i;
                        break;
                    }
                }
                this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickPai, this);
                this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
                this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
                GamePool.getInstance().setPNG(this.removeChild(this.paiArr[v1]), 2);
                this.paiArr.splice(v1, 1);
            }
            //先把吃碰杠的牌往前移动
            for (var i = 0; i < this.dongchipengArr.length; i++) {
                this.dongchipengArr[i].x -= 20;
            }
            this.dongchix -= 20;
            //后面的牌重新排一下，最大的在摸牌位置
            for (var i = 0; i < this.paiArr.length; i++) {
                this.paiArr[i].x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * i;
                this.paiArr[i].y = 598;
                if (i == this.paiArr.length - 1) {
                    this.paiArr[i].x += 20;
                }
            }
            this.ischupai = true;
        }
        else {
            //别人
            var pp = this.getOtherPosition(obj.position);
            var isgang = false;
            var isgangnum = 0;
            var yijingchipeng = false;
            if (pp == "you") {
                // // 刚了多加一个牌
                var pai = GamePool.getInstance().getPNG();
                pai.texture = RES.getRes("youBG_png");
                pai.x = 1080;
                pai.y = this.nanArr[0].y - 30;
                this.addChild(pai);
                this.nanArr.unshift(pai);
                var isAN = true;
                // 如果有吃碰明杠了，就不再有暗杠出现
                if (this.youchiNum > this.yougangarr.length) {
                    isAN = false;
                }
                // 先把前面的牌往上提
                for (var index = 0; index < this.nanArr.length - this.youchiNum; index++) {
                    this.nanArr[index].y -= 15;
                }
                for (var index = 0; index < xuanhuan; index++) {
                    if (isAN == true) {
                        this.nanArr[this.nanArr.length - this.youchiNum - 1].texture = RES.getRes("zuoyouAN_png");
                        this.yougangarr.push(this.nanArr[this.nanArr.length - this.youchiNum - 1]);
                    }
                    else {
                        this.nanArr[this.nanArr.length - this.youchiNum - 1].texture = RES.getRes("majiang_json." + obj.pai + "nanchu_png");
                    }
                    this.nanArr[this.nanArr.length - this.youchiNum - 1].name = obj.pai;
                    this.youchiNum++;
                }
            }
            else if (pp == "shang") {
                // 刚了多加一个牌
                var pai = GamePool.getInstance().getPNG();
                pai.texture = RES.getRes("shangbgBG_png");
                pai.x = this.xiArr[0].x - GamePlayView.SHANGXIACHUPAIWIDTH;
                pai.y = 55;
                this.addChild(pai);
                this.xiArr.unshift(pai);
                var isAN = true;
                // 如果有吃碰明杠了，就不再有暗杠出现
                if (this.shangchiNum > this.shanggangarr.length) {
                    isAN = false;
                }
                // suoyoupai往后移动
                for (var index = 0; index < this.xiArr.length; index++) {
                    this.xiArr[this.xiArr.length - index - 1].x += 20;
                }
                // 先把已经彭吃刚的牌往后移动
                for (var index = 0; index < this.shangchiNum; index++) {
                    this.xiArr[this.xiArr.length - index - 1].x += 10;
                }
                for (var index = 0; index < xuanhuan; index++) {
                    if (isAN == true) {
                        this.xiArr[this.xiArr.length - this.shangchiNum - 1].texture = RES.getRes("shangAN_png");
                        this.shanggangarr.push(this.xiArr[this.xiArr.length - this.shangchiNum - 1]);
                    }
                    else {
                        this.xiArr[this.xiArr.length - this.shangchiNum - 1].texture = RES.getRes("majiang_json." + obj.pai + "xichu_png");
                    }
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].name = obj.pai;
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].x += 10;
                    this.shangchiNum++;
                }
            }
            else if (pp == "zuo") {
                // 刚了多加一个牌
                var pai = GamePool.getInstance().getPNG();
                pai.texture = RES.getRes("zuoBG_png");
                pai.x = 180;
                pai.y = this.beiArr[this.beiArr.length - 1].y + 30;
                this.addChild(pai);
                this.beiArr.push(pai);
                var isAN = true;
                // 如果有吃碰明杠了，就不再有暗杠出现
                if (this.zuochiNum > this.zuogangarr.length) {
                    isAN = false;
                }
                // 先把已经彭吃刚的牌往后移动
                for (var index = 0; index < this.zuochiNum; index++) {
                    this.beiArr[index].y -= 15;
                }
                for (var index = 0; index < xuanhuan; index++) {
                    if (isAN == true) {
                        this.beiArr[this.zuochiNum].texture = RES.getRes("zuoyouAN_png");
                        this.zuogangarr.push(this.beiArr[this.zuochiNum]);
                    }
                    else {
                        this.beiArr[this.zuochiNum].texture = RES.getRes("majiang_json." + obj.pai + "beichu_png");
                    }
                    this.beiArr[this.zuochiNum].name = obj.pai;
                    this.zuochiNum++;
                }
                // 把所有牌后移动
                for (var index = 0; index < this.beiArr.length; index++) {
                    this.beiArr[index].y -= 20;
                }
            }
        }
        // 吃完之后就是摸牌一样的效果
        this.isPorMO = "MO";
    };
    p.getGang = function (obj) {
        this.setPostionLight(obj.position);
        this.settimetext();
        this.setSound("gang", this[obj.position + "manorfeman"]);
        this.currentAction = obj.position;
        this.pengBtn.visible = false;
        this.gangBtn.visible = false;
        //出牌的彭刚才需要去掉桌面的牌，摸牌的刚不需要
        if (this.isPorMO == "P") {
            if (this.tileImage.parent) {
                this.tileImage.parent.removeChild(this.tileImage);
            }
            if (this.chupaiImage.parent) {
                this.chupaiImage.parent.removeChild(this.chupaiImage);
                this.chupaiImagekuang.parent.removeChild(this.chupaiImagekuang);
            }
            if (this.currentChuPai.parent) {
                GamePool.getInstance().setPNG(this.currentChuPai.parent.removeChild(this.currentChuPai));
            }
        }
        var xuanhuan = 4;
        if (obj.position == this.position) {
            if (this.xiagangarr.length > 1) {
                this.setAngangMing(this.xiagangarr, 1);
            }
            var isming = false;
            for (var index = 0; index < this.pengArr.length; index++) {
                if (this.pengArr[index] == obj.pai) {
                    //碰过的刚
                    isming = true;
                    break;
                }
            }
            if (isming == true) {
                //碰过的刚
                var addnum = 0;
                for (var index = 0; index < this.dongchipengArr.length; index++) {
                    if (this.dongchipengArr[index].name == obj.pai) {
                        addnum = index;
                        break;
                    }
                }
                var pai = GamePool.getInstance().getPNG();
                pai.texture = RES.getRes("majiang_json." + obj.pai + "dongchipeng_png");
                pai.x = this.dongchipengArr[addnum].x;
                pai.y = 598;
                pai.name = obj.pai;
                this.addChild(pai);
                this.dongchipengArr.splice(addnum, 0, pai);
                this.dongchix += GamePlayView.ZIJIPAIWIDTH;
                for (var index = addnum + 1; index < this.dongchipengArr.length; index++) {
                    this.dongchipengArr[index].x += GamePlayView.ZIJIPAIWIDTH;
                }
                // 如果是自己摸回来的或者吃碰gang就去掉，别人出的话，就直接去掉桌面上的，这个在上面已经处理了
                if (this.isPorMO == "MO") {
                    var v1;
                    //还需要把手上的牌去了
                    for (var i = 0; i < this.paiArr.length; i++) {
                        if (this.paiArr[i].name == obj.pai) {
                            v1 = i;
                            break;
                        }
                    }
                    this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickPai, this);
                    this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
                    this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
                    GamePool.getInstance().setPNG(this.removeChild(this.paiArr[v1]), 2);
                    this.paiArr.splice(v1, 1);
                }
            }
            else {
                for (var index = 0; index < xuanhuan; index++) {
                    var pai = GamePool.getInstance().getPNG();
                    pai.texture = RES.getRes("majiang_json." + obj.pai + "dongchipeng_png");
                    pai.x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * index;
                    pai.y = 598;
                    pai.name = obj.pai;
                    this.addChild(pai);
                    this.dongchipengArr.push(pai);
                }
                this.dongchix += GamePlayView.ZIJIPAIWIDTH * xuanhuan + 10;
                var v1;
                var klength = 0;
                if (this.isPorMO == "MO") {
                    // 自摸摸就等4，别人出也是3
                    klength = 4;
                }
                else {
                    klength = xuanhuan - 1;
                }
                console.log(klength);
                for (var index = 0; index < klength; index++) {
                    for (var i = 0; i < this.paiArr.length; i++) {
                        if (this.paiArr[i].name == obj.pai) {
                            v1 = i;
                            break;
                        }
                    }
                    this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickPai, this);
                    this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
                    this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
                    GamePool.getInstance().setPNG(this.removeChild(this.paiArr[v1]), 2);
                    this.paiArr.splice(v1, 1);
                }
            }
            //先把吃碰杠的牌往前移动
            for (var i = 0; i < this.dongchipengArr.length; i++) {
                this.dongchipengArr[i].x -= 20;
            }
            this.dongchix -= 20;
            //后面的牌重新排一下，最大的在摸牌位置
            for (var i = 0; i < this.paiArr.length; i++) {
                this.paiArr[i].x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * i;
                this.paiArr[i].y = 598;
                if (i == this.paiArr.length - 1) {
                    this.paiArr[i].x += 20;
                }
            }
            this.ischupai = true;
        }
        else {
            //别人
            var pp = this.getOtherPosition(obj.position);
            var isgang = false;
            var isgangnum = 0;
            var yijingchipeng = false;
            if (pp == "you") {
                if (this.yougangarr.length > 1) {
                    this.setAngangMing(this.yougangarr, 2);
                }
                // 刚了多加一个牌
                var pai = GamePool.getInstance().getPNG();
                pai.texture = RES.getRes("youBG_png");
                pai.x = 1080;
                pai.y = this.nanArr[0].y - 30;
                this.addChild(pai);
                this.nanArr.unshift(pai);
                // 判断 别人碰过的刚
                for (var i = 0; i < this.nanArr.length - 2; i++) {
                    if (this.nanArr[i].name == obj.pai && this.nanArr[i + 1].name == obj.pai) {
                        // 别人碰过的刚
                        isgangnum = i;
                        isgang = true;
                        break;
                    }
                }
                // 先把前面的牌往上提
                for (var index = 0; index < this.nanArr.length - this.youchiNum; index++) {
                    this.nanArr[index].y -= 30;
                }
                for (var index = 0; index < xuanhuan; index++) {
                    if (isgang == true) {
                        if (index == xuanhuan - 1) {
                            // 碰过的刚只执行一个牌，而且j要先把后面的牌qian移；
                            for (var j = 0; j < isgangnum - 1; j++) {
                                this.nanArr[j].texture = this.nanArr[j + 1].texture;
                                this.nanArr[j].name = this.nanArr[j + 1].name;
                            }
                            this.nanArr[isgangnum - 1].texture = RES.getRes("majiang_json." + obj.pai + "nanchu_png");
                            this.nanArr[isgangnum - 1].name = obj.pai;
                            this.nanArr[isgangnum - 1].y += 30;
                            console.log("you4");
                            console.log(this.nanArr[isgangnum - 4].name);
                            if (this.nanArr[isgangnum - 4]) {
                                if (this.nanArr[isgangnum - 4].name) {
                                    this.nanArr[isgangnum - 4].y += 30;
                                }
                            }
                            console.log("you7");
                            console.log(this.nanArr[isgangnum - 7].name);
                            if (this.nanArr[isgangnum - 7]) {
                                if (this.nanArr[isgangnum - 7].name) {
                                    this.nanArr[isgangnum - 7].y += 30;
                                }
                            }
                            this.youchiNum++;
                        }
                    }
                    else {
                        this.nanArr[this.nanArr.length - this.youchiNum - 1].texture = RES.getRes("majiang_json." + obj.pai + "nanchu_png");
                        this.nanArr[this.nanArr.length - this.youchiNum - 1].name = obj.pai;
                        this.youchiNum++;
                    }
                }
            }
            else if (pp == "shang") {
                if (this.shanggangarr.length > 1) {
                    this.setAngangMing(this.shanggangarr, 3);
                }
                // 刚了多加一个牌
                var pai = GamePool.getInstance().getPNG();
                pai.texture = RES.getRes("shangbgBG_png");
                pai.x = this.xiArr[0].x - GamePlayView.SHANGXIACHUPAIWIDTH;
                pai.y = 55;
                this.addChild(pai);
                this.xiArr.unshift(pai);
                // 判断别人碰过的杠
                for (var i = 0; i < this.xiArr.length - 2; i++) {
                    if (this.xiArr[i].name == obj.pai && this.xiArr[i + 1].name == obj.pai) {
                        // 别人碰过的杠
                        isgangnum = i;
                        isgang = true;
                        break;
                    }
                }
                // 所有牌后移动
                for (var index = 0; index < this.xiArr.length; index++) {
                    this.xiArr[this.xiArr.length - index - 1].x += 20;
                }
                if (isgang == false) {
                    // 先把已经彭吃刚的牌往后移动,如果是没有碰过的刚，还需要把后面的牌后移动，新的刚之间有距离
                    for (var index = 0; index < this.shangchiNum; index++) {
                        this.xiArr[this.xiArr.length - index - 1].x += 10;
                    }
                }
                for (var index = 0; index < xuanhuan; index++) {
                    if (isgang == true) {
                        if (index == xuanhuan - 1) {
                            // 碰过的杠只执行一个牌，而且j要先把后面的牌qian移；
                            for (var j = 0; j < isgangnum - 1; j++) {
                                this.xiArr[j].texture = this.xiArr[j + 1].texture;
                                this.xiArr[j].name = this.xiArr[j + 1].name;
                            }
                            this.xiArr[isgangnum - 1].texture = RES.getRes("majiang_json." + obj.pai + "xichu_png");
                            this.xiArr[isgangnum - 1].name = obj.pai;
                            this.xiArr[isgangnum - 1].x += 10;
                            console.log("shang4");
                            console.log(this.xiArr[isgangnum - 4].name);
                            if (this.xiArr[isgangnum - 4]) {
                                if (this.xiArr[isgangnum - 4].name) {
                                    this.xiArr[isgangnum - 4].x += 10;
                                }
                            }
                            console.log("shang7");
                            console.log(this.xiArr[isgangnum - 7].name);
                            if (this.xiArr[isgangnum - 7]) {
                                if (this.xiArr[isgangnum - 7].name) {
                                    this.xiArr[isgangnum - 7].x += 10;
                                }
                            }
                            this.shangchiNum++;
                        }
                    }
                    else {
                        this.xiArr[this.xiArr.length - this.shangchiNum - 1].texture = RES.getRes("majiang_json." + obj.pai + "xichu_png");
                        this.xiArr[this.xiArr.length - this.shangchiNum - 1].name = obj.pai;
                        this.xiArr[this.xiArr.length - this.shangchiNum - 1].x += 10;
                        this.shangchiNum++;
                    }
                }
            }
            else if (pp == "zuo") {
                if (this.zuogangarr.length > 1) {
                    this.setAngangMing(this.zuogangarr, 4);
                }
                // 刚了多加一个牌
                var pai = GamePool.getInstance().getPNG();
                pai.texture = RES.getRes("zuoBG_png");
                pai.x = 180;
                pai.y = this.beiArr[this.beiArr.length - 1].y + 30;
                this.addChild(pai);
                this.beiArr.push(pai);
                for (var i = 0; i < this.beiArr.length - 2; i++) {
                    if (this.beiArr[i].name == obj.pai && this.beiArr[i + 1].name == obj.pai) {
                        // 别人碰过的杠
                        isgangnum = i;
                        isgang = true;
                        break;
                    }
                }
                // 所有牌移动
                for (var index = 0; index < this.beiArr.length; index++) {
                    this.beiArr[index].y -= 30;
                }
                // 先把已经彭吃刚的牌往后移动,因为是新钢
                for (var index = 0; index < this.zuochiNum; index++) {
                    this.beiArr[index].y -= 15;
                }
                for (var index = 0; index < xuanhuan; index++) {
                    if (isgang == true) {
                        if (index == xuanhuan - 1) {
                            // 碰过的杠只执行一个牌，而且j要先把后面的牌qian移；
                            for (var j = this.beiArr.length - 1; j > isgangnum + 3; j--) {
                                this.beiArr[j].texture = this.beiArr[j - 1].texture;
                                this.beiArr[j].name = this.beiArr[j - 1].name;
                            }
                            this.beiArr[isgangnum + 3].texture = RES.getRes("majiang_json." + obj.pai + "beichu_png");
                            this.beiArr[isgangnum + 3].name = obj.pai;
                            this.beiArr[isgangnum + 3].y -= 15;
                            console.log("zuo6");
                            console.log(this.beiArr[isgangnum + 6].name);
                            if (this.beiArr[isgangnum + 6].name) {
                                this.beiArr[isgangnum + 6].y -= 15;
                            }
                            console.log("zuo9");
                            console.log(this.beiArr[isgangnum + 9].name);
                            if (this.beiArr[isgangnum + 9].name) {
                                this.beiArr[isgangnum + 9].y -= 15;
                            }
                            this.zuochiNum++;
                        }
                    }
                    else {
                        this.beiArr[this.zuochiNum].texture = RES.getRes("majiang_json." + obj.pai + "beichu_png");
                        this.beiArr[this.zuochiNum].name = obj.pai;
                        this.zuochiNum++;
                    }
                }
            }
        }
        // 吃完之后就是摸牌一样的效果
        this.isPorMO = "MO";
    };
    p.settimetext = function () {
        this.timeNumText.text = "15";
        this.timer.start();
    };
    /**
    *获得有人吃
    */
    p.getChi = function (obj, num) {
        if (num === void 0) { num = null; }
        this.setPostionLight(obj.position);
        // {"type":"chi","pai":"16,18","position":"dong","version":8}
        if (num != 2) {
            // SoundManager.getInstance().playYx("chi1_mp3", this[obj.position + "manorfeman"]);
            this.setSound("chi", this[obj.position + "manorfeman"]);
            var point = this.getPositionPoint(obj);
            this.chiMovieClip.x = point.x;
            this.chiMovieClip.y = point.y;
            this.addChild(this.chiMovieClip);
            this.chiMovieClip.addEventListener(egret.MovieClipEvent.COMPLETE, this.onChiMovieClip, this);
            this.chiMovieClip.gotoAndPlay(1);
        }
        this.currentAction = obj.position;
        if (String(obj.pai).indexOf(this.currentPai) == 0) {
            obj.pai = String(obj.pai).replace(this.currentPai + ",", "");
        }
        else {
            obj.pai = String(obj.pai).replace("," + this.currentPai, "");
        }
        this.chiBtn.visible = false;
        if (this.tileImage.parent) {
            this.tileImage.parent.removeChild(this.tileImage);
        }
        if (this.chupaiImage.parent) {
            this.chupaiImage.parent.removeChild(this.chupaiImage);
            this.chupaiImagekuang.parent.removeChild(this.chupaiImagekuang);
        }
        if (this.currentChuPai.parent) {
            GamePool.getInstance().setPNG(this.currentChuPai.parent.removeChild(this.currentChuPai));
        }
        // this.setPostionLight(obj.position);
        var oldpai = obj.pai.split(",");
        var chipai = obj.pai.split(",");
        // chipai.push(this.currentPai); 吃回来的牌放中间
        chipai.splice(1, 0, this.currentPai);
        // chipai.sort(function (a, b) { return Number(a) - Number(b) });
        if (obj.position == this.position) {
            if (this.xiagangarr.length > 1) {
                this.setAngangMing(this.xiagangarr, 1);
            }
            //自己吃
            for (var index = 0; index < 3; index++) {
                var pai = GamePool.getInstance().getPNG();
                pai.texture = RES.getRes("majiang_json." + chipai[index] + "dongchipeng_png");
                pai.x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * index;
                pai.y = 598;
                this.addChild(pai);
                this.dongchipengArr.push(pai);
            }
            this.dongchix += GamePlayView.ZIJIPAIWIDTH * 3 + 10;
            var v1;
            for (var i = 0; i < this.paiArr.length; i++) {
                if (this.paiArr[i].name == oldpai[0]) {
                    v1 = i;
                    break;
                }
            }
            this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickPai, this);
            this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
            this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
            GamePool.getInstance().setPNG(this.removeChild(this.paiArr[v1]), 2);
            this.paiArr.splice(v1, 1);
            for (var i = 0; i < this.paiArr.length; i++) {
                if (this.paiArr[i].name == oldpai[1]) {
                    v1 = i;
                    break;
                }
            }
            this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickPai, this);
            this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
            this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
            GamePool.getInstance().setPNG(this.removeChild(this.paiArr[v1]), 2);
            this.paiArr.splice(v1, 1);
            // 判断吃的牌在左中右
            var pochiwei = -1;
            if (Number(oldpai[0]) > Number(this.currentPai)) {
                var numpai = Number(this.currentPai);
                if (numpai < 7 || (numpai > 10 && numpai < 17) || (numpai > 20 && numpai < 27)) {
                    pochiwei = Number(this.currentPai) + 3;
                }
            }
            else if (Number(this.currentPai) > Number(oldpai[1])) {
                var numpai = Number(this.currentPai);
                if ((numpai > 3 && numpai < 10) || (numpai > 13 && numpai < 20) || (numpai > 23 && numpai < 30)) {
                    pochiwei = Number(this.currentPai) - 3;
                }
            }
            //后面的牌重新排一下，最大的在摸牌位置
            for (var i = 0; i < this.paiArr.length; i++) {
                this.paiArr[i].x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * i;
                this.paiArr[i].y = 598;
                if (i == this.paiArr.length - 1) {
                    this.paiArr[i].x += 20;
                }
                //做不能吃吐的处理,不能出吃的牌和另外一个边的牌
                if (this.paiArr[i].name == this.currentPai) {
                    this.ischitu = true;
                    this.paiArr[i].alpha = .8;
                    this.paiArr[i].touchEnabled = false;
                    egret.localStorage.setItem("cutpai", this.currentPai);
                }
                console.log("pochiwei:" + pochiwei);
                if (pochiwei != -1) {
                    if (this.paiArr[i].name == String(pochiwei)) {
                        this.ischitu = true;
                        this.paiArr[i].alpha = .8;
                        this.paiArr[i].touchEnabled = false;
                        egret.localStorage.setItem("othercutpai", String(pochiwei));
                    }
                }
            }
            this.ischupai = true;
        }
        else {
            //别人吃
            var pp = this.getOtherPosition(obj.position);
            if (pp == "you") {
                // 先把前面的牌往上提
                for (var index = 0; index < this.nanArr.length - this.youchiNum; index++) {
                    this.nanArr[index].y -= 15;
                }
            }
            else if (pp == "shang") {
                // 先把已经彭吃刚的牌往后移动
                for (var index = 0; index < this.shangchiNum; index++) {
                    this.xiArr[this.xiArr.length - index - 1].x += 10;
                }
            }
            else {
                // 先把已经彭吃刚的牌往后移动
                for (var index = 0; index < this.zuochiNum; index++) {
                    this.beiArr[index].y -= 15;
                }
            }
            for (var index = 0; index < 3; index++) {
                if (pp == "you") {
                    if (this.yougangarr.length > 1) {
                        this.setAngangMing(this.yougangarr, 2);
                    }
                    this.nanArr[this.nanArr.length - this.youchiNum - 1].texture = RES.getRes("majiang_json." + chipai[index] + "nanchu_png");
                    this.youchiNum++;
                }
                else if (pp == "shang") {
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].texture = RES.getRes("majiang_json." + chipai[index] + "xichu_png");
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].x += 10;
                    this.shangchiNum++;
                    if (this.shanggangarr.length > 1) {
                        this.setAngangMing(this.shanggangarr, 3);
                    }
                }
                else if (pp == "zuo") {
                    this.beiArr[this.zuochiNum].texture = RES.getRes("majiang_json." + chipai[index] + "beichu_png");
                    this.zuochiNum++;
                    if (this.zuogangarr.length > 1) {
                        this.setAngangMing(this.zuogangarr, 4);
                    }
                }
            }
        }
        // 吃完之后就是摸牌一样的效果
        this.isPorMO = "MO";
    };
    p.getAction = function (obj) {
        // 版本不对的话，不给出现
        if (obj.version != ServerManager.getInstance().vision)
            return;
        //  "aciton": { "type": "action", "current": "xi","currentpai": "11","userid": "aaa", "chi": "12,13", "version": 5},
        // {"type":"action","current":"nan","currentpai":"8","userid":"aaa2","chi":"6,7;7,9","version":13}
        // {"type":"action","current":"nan","currentpai":"13","userid":"111","qting":"13","huchi":[{"pai":"11","hu":{}},{"pai":"11","hu":{}},{"pai":"11","hu":{}},{"pai":"11","hu":{}},{"pai":"16","hu":{}},{
        // {"type":"action","current":"nan","currentpai":"27","userid":"aaa2","chi":"25,26;26,28;28,29","version":99}
        // {"type":"action","ting":"ting","huchi":[{"pai":"13","hu":{"17":"17"}},{"pai":"13","hu":{"19":"19"}}],"version":59}
        // {"type":"action","current":"nan","currentpai":"13","userid":"111","qting":"13","huchi":[{"pai":"14","hu":{"12":"16,17,18,11,12,13,3,4,5,19,19"}}],"version":9}
        // {"type":"action","hu":"7","version":120}
        this.isqting = false;
        var numx = 0;
        this.currentPai = obj.currentpai;
        if (obj.hu) {
            ServerManager.getInstance().zimohu("hu");
            return;
        }
        if (obj.zimo) {
            this.isZimo = true;
            ServerManager.getInstance().zimohu("zimo");
            return;
        }
        this.guoBtn.visible = true;
        this.guoBtn.touchEnabled = true;
        this.guoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGuo, this);
        numx = this.guoBtn.x;
        if (obj.ting) {
            this.tingBtn.visible = true;
            this.tingBtn.touchEnabled = true;
            this.tingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTing, this);
            this.huchi = obj.huchi;
            this.tingBtn.x = numx - this.tingBtn.width;
            numx = this.tingBtn.x;
            this.isActionTing = true;
            this.ischupai = false;
        }
        if (obj.qting) {
            this.isqting = true;
            this.oldobj = obj;
            console.log(obj.qtpeng.length);
            if (obj.qtpeng.length > 0) {
                this.pengtingBtn.visible = true;
                this.pengtingBtn.touchEnabled = true;
                this.pengtingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPengQTing, this);
                this.qtingString = obj.qting;
                this.pengtingBtn.x = numx - this.pengtingBtn.width;
                numx = this.pengtingBtn.x;
                //把牌的弹起来
                for (var j = 0; j < this.paiArr.length; j++) {
                    if (this.paiArr[j].name == obj.currentpai) {
                        this.paiArr[j].y = 580;
                        this.paiArr[j + 1].y = 580;
                        break;
                    }
                }
            }
            if (obj.qtchi.length > 0) {
                this.qtingBtn.visible = true;
                this.qtingBtn.touchEnabled = true;
                this.qtingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQTing, this);
                this.qtingString = obj.qting;
                this.qtingBtn.x = numx - this.qtingBtn.width;
                numx = this.qtingBtn.x;
                this.qtingchiarrr = obj.qtchi;
                //把吃牌的弹起来
                var crr = [];
                var arr2 = obj.qtchi;
                for (var index = 0; index < arr2.length; index++) {
                    var srr2 = arr2[index].split(",");
                    crr.push(srr2[0], srr2[1], srr2[2]);
                }
                var starr2 = this.unique(crr);
                var numindex = starr2.indexOf(obj.currentpai);
                starr2.splice(numindex, 1);
                for (var i = 0; i < starr2.length; i++) {
                    for (var j = 0; j < this.paiArr.length; j++) {
                        if (this.paiArr[j].name == starr2[i]) {
                            this.paiArr[j].y = 580;
                            break;
                        }
                    }
                }
            }
            this.huchi = obj.huchi;
            return;
        }
        if (obj.chi) {
            this.chiBtn.visible = true;
            this.chiBtn.touchEnabled = true;
            this.chiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChi, this);
            this.chiBtn.x = numx - this.chiBtn.width;
            numx = this.chiBtn.x;
            //把吃牌的弹起来
            var starr = [];
            var arr = String(obj.chi).split(";");
            var brr = String(obj.chi).split(";");
            this.chiString = brr[0];
            if (arr.length > 1) {
                this.isDuochi = true;
                this.duochiArr = arr;
            }
            else {
                this.isDuochi = false;
            }
            for (var index = 0; index < arr.length; index++) {
                var srr = arr[index].split(",");
                starr.push(srr[0], srr[1]);
            }
            for (var i = 0; i < starr.length; i++) {
                for (var j = 0; j < this.paiArr.length; j++) {
                    if (this.paiArr[j].name == starr[i]) {
                        this.paiArr[j].y = 580;
                        break;
                    }
                }
            }
        }
        if (obj.peng) {
            this.pengBtn.visible = true;
            this.pengBtn.touchEnabled = true;
            this.pengBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPeng, this);
            this.pengString = obj.peng;
            this.pengBtn.x = numx - this.pengBtn.width;
            numx = this.pengBtn.x;
            for (var j = 0; j < this.paiArr.length; j++) {
                if (this.paiArr[j].name == obj.peng) {
                    this.paiArr[j].y = 580;
                    this.paiArr[j + 1].y = 580;
                    break;
                }
            }
        }
        if (obj.gang) {
            // {"type":"action","current":"dong","gang":"8","version":62}
            if (obj.current) {
                this.gangBtn.visible = true;
                this.gangBtn.touchEnabled = true;
                this.gangBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGang, this);
                this.gangString = obj.gang;
                this.gangBtn.x = numx - this.gangBtn.width;
                numx = this.gangBtn.x;
                var isming = false;
                for (var index = 0; index < this.pengArr.length; index++) {
                    if (this.pengArr[index] == obj.gang) {
                        isming = true;
                        break;
                    }
                }
                if (isming == true) {
                }
                else {
                    //如果是暗杠,把三个牌都提起来
                    for (var j = 0; j < this.paiArr.length; j++) {
                        if (this.paiArr[j].name == obj.gang) {
                            this.paiArr[j].y = 580;
                        }
                    }
                }
            }
        }
    };
    /**
    *听
    */
    p.onTing = function (event) {
        if (this.isActionTing == true) {
            this.isActionTing = false;
        }
        ServerManager.getInstance().ting();
        this.unviewChiPeng();
    };
    /**
   *碰听
   */
    p.onPengQTing = function (event) {
        ServerManager.getInstance().qting(this.qtingString);
        this.unviewChiPeng();
    };
    /**
     *吃听
     */
    p.onQTing = function (event) {
        // var array = this.huchi;
        // var brr = [];
        // var brr2 = [];
        // for (var j = 0; j < array.length; j++) {
        //     var s = array[j].hu;
        //     for (var item in s) {
        //         var jValue = s[item];//key所对应的value
        //         var chiarr = jValue.chi;
        //         for (var i = 0; i < chiarr.length; i++) {
        //             brr2.push(chiarr[i]);
        //             var ss = chiarr[i].replace("," + this.qtingString, "");
        //             brr.push(ss);
        //         }
        //     }
        // }
        // 用外层后台过滤好的吃数组
        var brr = [];
        var brr2 = [];
        var chiarr = this.qtingchiarrr;
        for (var i = 0; i < chiarr.length; i++) {
            var ss;
            if (chiarr[i].indexOf(this.qtingString) == 0) {
                ss = chiarr[i].replace(this.qtingString + ",", "");
            }
            else {
                ss = chiarr[i].replace("," + this.qtingString, "");
            }
            brr2.push(chiarr[i]);
            brr.push(ss);
        }
        var crr = this.unique(brr);
        this.qtingarr = this.unique(brr2);
        // 如果只有一个数据,那就直接吃了,不用显示
        if (crr.length == 1) {
            ServerManager.getInstance().qting(this.qtingarr[0]);
            this.unviewChiPeng();
        }
        else {
            this.duochitanchu(crr, 2);
        }
    };
    /**
   *多吃抢听
   */
    p.onQtingBg = function (event) {
        ServerManager.getInstance().qting(this.qtingarr[Number(event.target.name)]);
        this.unviewChiPeng();
    };
    p.unique = function (arr) {
        var result = [], hash = {};
        for (var i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
    };
    /**
     *过动作
     */
    p.onGuo = function (e) {
        if (this.isActionTing == true) {
            this.isActionTing = false;
            this.ischupai = true;
        }
        this.unviewChiPeng();
        // 判断是否抢听的过
        if (this.isqting == true && (this.oldobj.chi || this.oldobj.peng)) {
            this.isqting = false;
            this.oldobj.qting = null;
            this.getAction(this.oldobj);
            this.oldobj = null;
            return;
        }
        this.isqting = false;
        ServerManager.getInstance().guoAction();
    };
    /**
     *碰
     */
    p.onPeng = function (e) {
        ServerManager.getInstance().chipenghu(this.pengString, "peng");
        this.unviewChiPeng();
        // this.getPengGang({});
    };
    /**
     *杠
     */
    p.onGang = function (e) {
        this.unviewChiPeng();
        ServerManager.getInstance().chipenghu(this.gangString, "gang");
    };
    //多吃时候弹出控制
    p.duochitanchu = function (arr, num) {
        for (var index = 0; index < arr.length; index++) {
            var bg = GamePool.getInstance().getPNG(3);
            bg.texture = RES.getRes("youxi_json.9");
            bg.touchEnabled = true;
            bg.name = index.toString();
            if (num == 1)
                bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCHIBg, this);
            else
                bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQtingBg, this);
            bg.x = 215 + index * 160;
            bg.y = 470;
            bg.width = 160;
            bg.height = 130;
            this.addChild(bg);
            this.duochiPngArr.push(bg);
            var aa = String(arr[index]).split(",");
            var pai1 = GamePool.getInstance().getPNG();
            pai1.texture = RES.getRes("majiang_json." + aa[0] + "dongshow_png");
            pai1.x = 220 + index * 160 + 5;
            pai1.y = 480;
            pai1.touchEnabled = false;
            this.addChild(pai1);
            this.duochiPngArr.push(pai1);
            var pai2 = GamePool.getInstance().getPNG();
            pai2.texture = RES.getRes("majiang_json." + aa[1] + "dongshow_png");
            pai2.x = 220 + index * 160 + GamePlayView.ZIJIPAIWIDTH;
            pai2.y = 480;
            pai2.touchEnabled = false;
            this.addChild(pai2);
            this.duochiPngArr.push(pai2);
        }
    };
    p.onChi = function (e) {
        if (this.isDuochi == true) {
            this.duochitanchu(this.duochiArr, 1);
        }
        else {
            this.unviewChiPeng();
            ServerManager.getInstance().chipenghu(this.paixu(this.currentPai, this.chiString), "chi");
        }
        // this.getChi({});
        // this.getPengGang({});
    };
    /**
     *多吃时候，点击背景选择吃的那一个
     */
    p.onCHIBg = function (event) {
        if (event.target.name == "0") {
            this.chiString = this.duochiArr[0];
        }
        else if (event.target.name == "1") {
            this.chiString = this.duochiArr[1];
        }
        else if (event.target.name == "2") {
            this.chiString = this.duochiArr[2];
        }
        this.unviewChiPeng();
        ServerManager.getInstance().chipenghu(this.paixu(this.currentPai, this.chiString), "chi");
    };
    p.paixu = function (pai, chi) {
        var arr = chi.split(",");
        arr.push(pai);
        arr.sort();
        return arr.toString();
    };
    p.unviewChiPeng = function () {
        this.tingBtn.visible = false;
        this.tingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTing, this);
        this.chiBtn.visible = false;
        this.chiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChi, this);
        this.pengBtn.visible = false;
        this.pengBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPeng, this);
        this.gangBtn.visible = false;
        this.gangBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGang, this);
        this.guoBtn.visible = false;
        this.guoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGuo, this);
        this.qtingBtn.visible = false;
        this.qtingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onQTing, this);
        this.pengtingBtn.visible = false;
        this.pengtingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onQTing, this);
        while (this.duochiPngArr.length > 0) {
            if (this.duochiPngArr[this.duochiPngArr.length - 1].height == 130)
                GamePool.getInstance().setPNG(this.removeChild(this.duochiPngArr.pop()), 3);
            else
                GamePool.getInstance().setPNG(this.removeChild(this.duochiPngArr.pop()));
        }
        for (var index = 0; index < this.paiArr.length; index++) {
            this.paiArr[index].y = 598;
        }
    };
    /**
     *获得出牌的信息，
    */
    p.getChuPai = function (obj) {
        this.settimetext();
        if (this.isTing == true) {
            if (this.islou == false)
                this.baoPai.texture = RES.getRes("majiang_json." + this.oldbaipai + "dongshow_png");
        }
        if (this.tileImage.parent) {
            this.tileImage.parent.removeChild(this.tileImage);
        }
        if (this.chupaiImage.parent) {
            this.chupaiImage.parent.removeChild(this.chupaiImage);
            this.chupaiImagekuang.parent.removeChild(this.chupaiImagekuang);
        }
        SoundManager.getInstance().playYx("OUT_CARD_mp3", false);
        SoundManager.getInstance().playYx(obj.pai + "_mp3", this[obj.position + "manorfeman"]);
        // SoundManager.getInstance().playYx(obj.pai + "_mp3",this.beimanorfeman);
        this.isPorMO = "P";
        this.currentPai = obj.pai;
        //自己的出牌阶段
        if (obj.id == this.userid) {
            //处理吃吐保存的信息
            if (this.ischitu == true) {
                this.ischitu = false;
                egret.localStorage.removeItem("cutpai");
                egret.localStorage.removeItem("othercutpai");
            }
            //把吃碰按钮隐藏
            this.unviewChiPeng();
            this.ischupai = false;
            var chuNum = 0;
            for (var i = 0; i < this.paiArr.length; i++) {
                if (this.paiArr[i].name == obj.pai) {
                    chuNum = i;
                    break;
                }
            }
            //修改了一下，放到xiagourp里面
            this.paiArr[chuNum].texture = RES.getRes("majiang_json." + obj.pai + "dongchu_png");
            this.paiArr[chuNum].x = this.xiaGroup.numChildren % GamePlayView.CHUPAINUM * GamePlayView.SHANGXIACHUPAIWIDTH;
            this.paiArr[chuNum].y = Math.floor(this.xiaGroup.numChildren / GamePlayView.CHUPAINUM) * GamePlayView.SHANGXIACHUPAIHEIGHT;
            this.paiArr[chuNum].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickPai, this);
            this.paiArr[chuNum].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
            this.paiArr[chuNum].removeEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
            this.currentChuPai = this.paiArr.splice(chuNum, 1)[0];
            this.removeChild(this.currentChuPai);
            this.xiaGroup.addChild(this.currentChuPai);
            this.tileImage.x = this.currentChuPai.x + 10 - 262;
            this.tileImage.y = this.currentChuPai.y - 30 - 185;
            this.xiaGroup.addChild(this.tileImage);
            this.tileImage.play(-1);
            // 加入大图的那个出牌给所有人看
            this.chupaiImage.texture = RES.getRes("majiang_json." + obj.pai + "dongshow_png");
            this.chupaiImage.x = (1280 - this.chupaiImage.width) / 2;
            this.chupaiImage.y = 400;
            this.addChild(this.chupaiImage);
            this.paiArr.sort(function (a, b) { return Number(a.name) - Number(b.name); });
            for (var i = 0; i < this.paiArr.length; i++) {
                this.paiArr[i].x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * i;
                this.paiArr[i].y = 598;
                this.paiArr[i].alpha = 1;
                this.paiArr[i].touchEnabled = true;
            }
        }
        else {
            //别人出牌阶段
            var pp = this.getOtherPosition(this.currentAction);
            var pai = GamePool.getInstance().getPNG();
            console.log("pp:" + pp);
            var numx = 0;
            var numy = 0;
            if (pp == "you") {
                pai.texture = RES.getRes("majiang_json." + obj.pai + "nanchu_png");
                this.youmoPai.visible = false;
                pai.x = Math.floor(this.youGroup.numChildren / GamePlayView.CHUPAINUM) * GamePlayView.ZUOYOUCHUPAIWIDTH;
                pai.y = (GamePlayView.CHUPAINUM - this.youGroup.numChildren % GamePlayView.CHUPAINUM) * (GamePlayView.ZUOYOUCHUPAIHEIGHT - 15);
                this.youGroup.addChild(pai);
                this.youGroup.setChildIndex(pai, 0);
                this.youGroup.addChild(this.tileImage);
                numx = 1000;
                numy = 300;
            }
            else if (pp == "shang") {
                pai.texture = RES.getRes("majiang_json." + obj.pai + "xichu_png");
                pai.x = (GamePlayView.CHUPAINUM - this.shangGroup.numChildren % GamePlayView.CHUPAINUM) * GamePlayView.SHANGXIACHUPAIWIDTH;
                pai.y = (1 - Math.floor(this.shangGroup.numChildren / GamePlayView.CHUPAINUM)) * GamePlayView.SHANGXIACHUPAIHEIGHT;
                this.shangGroup.addChild(pai);
                this.shangmoPai.visible = false;
                this.shangGroup.addChild(this.tileImage);
                numx = 600;
                numy = 100;
            }
            else if (pp == "zuo") {
                pai.texture = RES.getRes("majiang_json." + obj.pai + "beichu_png");
                pai.x = (1 - Math.floor(this.zuoGroup.numChildren / GamePlayView.CHUPAINUM)) * GamePlayView.ZUOYOUCHUPAIWIDTH;
                pai.y = this.zuoGroup.numChildren % GamePlayView.CHUPAINUM * (GamePlayView.ZUOYOUCHUPAIHEIGHT - 15);
                this.zuoGroup.addChild(pai);
                this.zuomoPai.visible = false;
                this.zuoGroup.addChild(this.tileImage);
                numx = 200;
                numy = 300;
            }
            this.currentChuPai = pai;
            this.tileImage.x = this.currentChuPai.x + 10 - 262;
            this.tileImage.y = this.currentChuPai.y - 30 - 185;
            this.tileImage.play(-1);
            this.chupaiImage.texture = RES.getRes("majiang_json." + obj.pai + "dongshow_png");
            this.chupaiImage.x = numx;
            this.chupaiImage.y = numy;
            this.addChild(this.chupaiImage);
        }
        this.chupaiImagekuang.x = this.chupaiImage.x - 11;
        this.chupaiImagekuang.y = this.chupaiImage.y - 11;
        this.addChild(this.chupaiImagekuang);
        // 出牌的时候，把桌面的先隐藏，如果没人要吃碰，摸牌的时候再显示
        this.tileImage.visible = false;
        this.currentChuPai.visible = false;
    };
    p.getMoPai = function (obj) {
        this.settimetext();
        if (this.tileImage) {
            this.tileImage.visible = true;
        }
        if (this.currentChuPai) {
            this.currentChuPai.visible = true;
        }
        if (this.chupaiImage.parent) {
            this.chupaiImage.parent.removeChild(this.chupaiImage);
            this.chupaiImagekuang.parent.removeChild(this.chupaiImagekuang);
        }
        this.themopai = obj.currentpai;
        this.paiNumText.text = String((Number(this.paiNumText.text) - 1));
        this.isPorMO = "MO";
        this.unviewChiPeng();
        this.setPostionLight(obj.current);
        this.currentAction = obj.current;
        //自己的摸牌阶段
        if (obj.current == this.position) {
            for (var i = 0; i < this.paiArr.length; i++) {
                this.paiArr[i].x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * i;
                this.paiArr[i].y = 598;
            }
            var pai = GamePool.getInstance().getPNG(2);
            pai.texture = RES.getRes("majiang_json." + obj.currentpai + "dongshow_png");
            pai.x = this.paiArr[this.paiArr.length - 1].x + 120;
            pai.y = 598;
            pai.name = obj.currentpai.toString();
            pai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickPai, this);
            pai.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
            pai.addEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
            this.paiArr.push(pai);
            this.ischupai = true;
            this.addChild(pai);
            // 如果已经听牌，就直接出牌
            if (this.isTing == true) {
                var that = this;
                setTimeout(function () {
                    if (that.isZimo == false)
                        ServerManager.getInstance().chupai(obj.currentpai);
                }, 300);
            }
        }
        else {
            //先获取摸牌人的位置
            var pp = this.getOtherPosition(obj.current);
            if (pp == "you") {
                this.youmoPai.visible = true;
            }
            else if (pp == "shang") {
                this.shangmoPai.visible = true;
            }
            else if (pp == "zuo") {
                this.zuomoPai.visible = true;
            }
        }
    };
    /**
     *获取不是自己摸牌的位置，比如自己是东，那么南就是右，自己是西，那么南左
     */
    p.getOtherPosition = function (str) {
        var obj;
        if (this.position == "dong") {
            if (str == "nan") {
                obj = "you";
            }
            else if (str == "xi") {
                obj = "shang";
            }
            else if (str == "bei") {
                obj = "zuo";
            }
            else {
                obj = "xia";
            }
        }
        else if (this.position == "nan") {
            if (str == "xi") {
                obj = "you";
            }
            else if (str == "bei") {
                obj = "shang";
            }
            else if (str == "dong") {
                obj = "zuo";
            }
            else {
                obj = "xia";
            }
        }
        else if (this.position == "xi") {
            if (str == "bei") {
                obj = "you";
            }
            else if (str == "dong") {
                obj = "shang";
            }
            else if (str == "nan") {
                obj = "zuo";
            }
            else {
                obj = "xia";
            }
        }
        else {
            if (str == "dong") {
                obj = "you";
            }
            else if (str == "nan") {
                obj = "shang";
            }
            else if (str == "xi") {
                obj = "zuo";
            }
            else {
                obj = "xia";
            }
        }
        return obj;
    };
    p.getChonglian = function (obj, userid) {
        this.ischonglian = true;
        // 处理等待界面
        //处理打的牌和碰的牌
        this.position = this.getStartPai(obj, userid);
        if (this.position == "dong") {
            this.xiazhuangPng.visible = true;
            this.setTingPng(obj.dong.isTing, obj.nan.isTing, obj.xi.isTing, obj.bei.isTing);
            this.setDapai(obj.dong.da, obj.nan.da, obj.xi.da, obj.bei.da);
            this.setChiPengDapai(obj.dong, obj.nan, obj.xi, obj.bei);
            if (obj.dong.aciton) {
                this.getAction(obj.dong.aciton);
            }
        }
        if (this.position == "nan") {
            this.youzhuangPng.visible = true;
            this.setTingPng(obj.nan.isTing, obj.xi.isTing, obj.bei.isTing, obj.dong.isTing);
            this.setDapai(obj.nan.da, obj.xi.da, obj.bei.da, obj.dong.da);
            this.setChiPengDapai(obj.nan, obj.xi, obj.bei, obj.dong);
            if (obj.nan.aciton) {
                this.getAction(obj.nan.aciton);
            }
        }
        if (this.position == "xi") {
            this.shangzhuangPng.visible = true;
            this.setTingPng(obj.xi.isTing, obj.bei.isTing, obj.dong.isTing, obj.nan.isTing);
            this.setDapai(obj.xi.da, obj.bei.da, obj.dong.da, obj.nan.da);
            this.setChiPengDapai(obj.xi, obj.bei, obj.dong, obj.nan);
            if (obj.xi.aciton) {
                this.getAction(obj.xi.aciton);
            }
        }
        if (this.position == "bei") {
            this.zuozhuangPng.visible = true;
            this.setTingPng(obj.bei.isTing, obj.dong.isTing, obj.nan.isTing, obj.xi.isTing);
            this.setDapai(obj.bei.da, obj.dong.da, obj.nan.da, obj.xi.da);
            this.setChiPengDapai(obj.bei, obj.dong, obj.nan, obj.xi);
            if (obj.bei.aciton) {
                this.getAction(obj.bei.aciton);
            }
        }
        this.setPostionLight(obj.curent);
        if (this.position == obj.curent) {
            this.ischupai = true;
            this.currentAction = obj.curent;
            // 把自己摸回来的牌放到最后面，先把牌里面的去掉再加一个在最后没
            var v1;
            for (var i = 0; i < this.paiArr.length; i++) {
                if (this.paiArr[i].name == obj.curentpai) {
                    v1 = i;
                    break;
                }
            }
            this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickPai, this);
            this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
            this.paiArr[v1].removeEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
            GamePool.getInstance().setPNG(this.removeChild(this.paiArr[v1]), 2);
            this.paiArr.splice(v1, 1);
            //后面的牌重新排一下，最大的在摸牌位置
            for (var i = 0; i < this.paiArr.length; i++) {
                this.paiArr[i].x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * i;
                this.paiArr[i].y = 598;
            }
            var pai = GamePool.getInstance().getPNG(2);
            pai.texture = RES.getRes("majiang_json." + obj.curentpai + "dongshow_png");
            pai.x = this.paiArr[this.paiArr.length - 1].x + 120;
            pai.y = 598;
            pai.name = obj.curentpai.toString();
            pai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickPai, this);
            pai.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
            pai.addEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
            this.paiArr.push(pai);
            this.addChild(pai);
            //如果是自己出牌，又是已经听牌了，就直接出牌，ruguo you dongzuo jiu bu chupai
            if (this.isTing == true) {
                var isHaveaction = false;
                if (obj.dong) {
                    if (obj.dong.aciton) {
                        if (obj.dong.aciton.version == ServerManager.getInstance().vision) {
                            isHaveaction = true;
                        }
                    }
                }
                if (obj.nan) {
                    if (obj.nan.aciton) {
                        if (obj.nan.aciton.version == ServerManager.getInstance().vision) {
                            isHaveaction = true;
                        }
                    }
                }
                if (obj.xi) {
                    if (obj.xi.aciton) {
                        if (obj.xi.aciton.version == ServerManager.getInstance().vision) {
                            isHaveaction = true;
                        }
                    }
                }
                if (obj.bei) {
                    if (obj.bei.aciton) {
                        if (obj.bei.aciton.version == ServerManager.getInstance().vision) {
                            isHaveaction = true;
                        }
                    }
                }
                if (isHaveaction == false)
                    ServerManager.getInstance().chupai(obj.curentpai);
            }
            //如果有吃吐的信息，处理吃吐问题
            if (egret.localStorage.getItem("cutpai") != null || egret.localStorage.getItem("othercutpai") != null) {
                var cutpai = egret.localStorage.getItem("cutpai");
                var othercutpai = egret.localStorage.getItem("othercutpai");
                for (var i = 0; i < this.paiArr.length; i++) {
                    //做不能吃吐的处理,不能出吃的牌和另外一个边的牌
                    if (this.paiArr[i].name == cutpai) {
                        this.ischitu = true;
                        this.paiArr[i].alpha = .8;
                        this.paiArr[i].touchEnabled = false;
                    }
                    if (this.paiArr[i].name == othercutpai) {
                        this.ischitu = true;
                        this.paiArr[i].alpha = .8;
                        this.paiArr[i].touchEnabled = false;
                    }
                }
            }
        }
        this.ischonglian = false;
        //处理currentpai,当前人动作
        var pp = this.getOtherPosition(obj.curent);
        switch (pp) {
            case "xia":
                if (this.xiaGroup.numChildren > 0)
                    this.currentChuPai = this.xiaGroup.getChildAt(this.xiaGroup.numChildren - 1);
                break;
            case "you":
                if (this.youGroup.numChildren > 0)
                    this.currentChuPai = this.youGroup.getChildAt(this.youGroup.numChildren - 1);
                break;
            case "shang":
                if (this.shangGroup.numChildren > 0)
                    this.currentChuPai = this.shangGroup.getChildAt(this.shangGroup.numChildren - 1);
                break;
            case "zuo":
                if (this.zuoGroup.numChildren > 0)
                    this.currentChuPai = this.zuoGroup.getChildAt(this.zuoGroup.numChildren - 1);
                break;
            default:
                break;
        }
        return this.position;
    };
    p.setTingPng = function (arr1, arr2, arr3, arr4) {
        if (arr1 == true) {
            this.xiaTingPng.visible = true;
        }
        if (arr2 == true) {
            this.youTingPng.visible = true;
        }
        if (arr3 == true) {
            this.shangTingPng.visible = true;
        }
        if (arr4 == true) {
            this.zuoTingPng.visible = true;
        }
    };
    p.setChiPengDapai = function (arr1, arr2, arr3, arr4) {
        console.log("chipeng");
        // 判断刚，先加好多余的牌
        if (arr2.gang) {
            var str = String(arr2.gang).split(";");
            for (var index = 0; index < str.length; index++) {
                var pai = GamePool.getInstance().getPNG();
                pai.texture = RES.getRes("youBG_png");
                pai.x = 1080;
                this.addChild(pai);
                this.nanArr.push(pai);
                pai.y = 135 + 30 * (this.nanArr.length - 1);
            }
        }
        if (arr2.agang) {
            var str = String(arr2.agang).split(";");
            for (var index = 0; index < str.length; index++) {
                var pai = GamePool.getInstance().getPNG();
                pai.texture = RES.getRes("youBG_png");
                pai.x = 1080;
                this.addChild(pai);
                this.nanArr.push(pai);
                pai.y = 135 + 30 * (this.nanArr.length - 1);
            }
        }
        if (arr2.peng) {
            var str = String(arr2.peng).split(";");
            for (var i = 0; i < str.length; i++) {
                // 判断有没有刚了，如果这个牌已经杠了，就不用处理碰这个了
                if (arr2.gang) {
                    var str2 = String(arr2.gang).split(";");
                    var iscon = false;
                    for (var j = 0; j < str2.length; j++) {
                        if (str2[j] == str[i]) {
                            iscon = true;
                        }
                    }
                    if (iscon == true) {
                        continue;
                    }
                }
                if (arr2.agang) {
                    var str2 = String(arr2.agang).split(";");
                    var iscon = false;
                    for (var j = 0; j < str2.length; j++) {
                        if (str2[j] == str[i]) {
                            iscon = true;
                        }
                    }
                    if (iscon == true) {
                        continue;
                    }
                }
                // 先把前面的牌往上提
                for (var index = 0; index < this.nanArr.length - this.youchiNum; index++) {
                    this.nanArr[index].y -= 15;
                }
                for (var index = 0; index < 3; index++) {
                    this.nanArr[this.nanArr.length - this.youchiNum - 1].texture = RES.getRes("majiang_json." + str[i] + "nanchu_png");
                    this.youchiNum++;
                }
            }
        }
        if (arr2.gang) {
            var str = String(arr2.gang).split(";");
            for (var i = 0; i < str.length; i++) {
                // 先把前面的牌往上提
                for (var index = 0; index < this.nanArr.length - this.youchiNum; index++) {
                    this.nanArr[index].y -= 15;
                }
                for (var index = 0; index < 4; index++) {
                    this.nanArr[this.nanArr.length - this.youchiNum - 1].texture = RES.getRes("majiang_json." + str[i] + "nanchu_png");
                    // 空格
                    this.youchiNum++;
                }
            }
        }
        if (arr2.agang) {
            var str = String(arr2.agang).split(";");
            for (var i = 0; i < str.length; i++) {
                // 先把前面的牌往上提
                for (var index = 0; index < this.nanArr.length - this.youchiNum; index++) {
                    this.nanArr[index].y -= 15;
                }
                for (var index = 0; index < 4; index++) {
                    this.nanArr[this.nanArr.length - this.youchiNum - 1].texture = RES.getRes("majiang_json." + str[i] + "nanchu_png");
                    // 空格
                    this.youchiNum++;
                }
            }
        }
        if (arr2.chi) {
            var str = String(arr2.chi).split(";");
            for (var i = 0; i < str.length; i++) {
                var chistr = str[i].split(",");
                // 先把前面的牌往上提
                for (var index = 0; index < this.nanArr.length - this.youchiNum; index++) {
                    this.nanArr[index].y -= 15;
                }
                for (var index = 0; index < chistr.length; index++) {
                    this.nanArr[this.nanArr.length - this.youchiNum - 1].texture = RES.getRes("majiang_json." + chistr[index] + "nanchu_png");
                    // 空格
                    this.youchiNum++;
                }
            }
        }
        if (arr3.gang) {
            var str = String(arr3.gang).split(";");
            for (var index = 0; index < str.length; index++) {
                var pai2 = GamePool.getInstance().getPNG();
                pai2.texture = RES.getRes("shangbgBG_png");
                pai2.y = 55;
                this.addChild(pai2);
                this.xiArr.push(pai2);
                pai2.x = 385 + (GamePlayView.SHANGXIACHUPAIWIDTH) * (this.xiArr.length - 1);
            }
        }
        if (arr3.agang) {
            var str = String(arr3.agang).split(";");
            for (var index = 0; index < str.length; index++) {
                var pai2 = GamePool.getInstance().getPNG();
                pai2.texture = RES.getRes("shangbgBG_png");
                pai2.y = 55;
                this.addChild(pai2);
                this.xiArr.push(pai2);
                pai2.x = 385 + (GamePlayView.SHANGXIACHUPAIWIDTH) * (this.xiArr.length - 1);
            }
        }
        if (arr3.peng) {
            var str = String(arr3.peng).split(";");
            for (var i = 0; i < str.length; i++) {
                // 判断有没有刚了，如果这个牌已经杠了，就不用处理碰这个了
                if (arr3.gang) {
                    var str2 = String(arr3.gang).split(";");
                    var iscon = false;
                    for (var j = 0; j < str2.length; j++) {
                        if (str2[j] == str[i]) {
                            iscon = true;
                        }
                    }
                    if (iscon == true) {
                        continue;
                    }
                }
                if (arr3.agang) {
                    var str2 = String(arr3.agang).split(";");
                    var iscon = false;
                    for (var j = 0; j < str2.length; j++) {
                        if (str2[j] == str[i]) {
                            iscon = true;
                        }
                    }
                    if (iscon == true) {
                        continue;
                    }
                }
                // 先把已经彭吃刚的牌往后移动
                for (var index = 0; index < this.shangchiNum; index++) {
                    this.xiArr[this.xiArr.length - index - 1].x += 10;
                }
                for (var index = 0; index < 3; index++) {
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].texture = RES.getRes("majiang_json." + str[i] + "xichu_png");
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].x += 10;
                    this.shangchiNum++;
                }
            }
        }
        if (arr3.gang) {
            var str = String(arr3.gang).split(";");
            for (var i = 0; i < str.length; i++) {
                // 先把已经彭吃刚的牌往后移动
                for (var index = 0; index < this.shangchiNum; index++) {
                    this.xiArr[this.xiArr.length - index - 1].x += 10;
                }
                for (var index = 0; index < 4; index++) {
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].texture = RES.getRes("majiang_json." + str[i] + "xichu_png");
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].x += 10;
                    this.shangchiNum++;
                }
            }
        }
        if (arr3.agang) {
            var str = String(arr3.agang).split(";");
            for (var i = 0; i < str.length; i++) {
                // 先把已经彭吃刚的牌往后移动
                for (var index = 0; index < this.shangchiNum; index++) {
                    this.xiArr[this.xiArr.length - index - 1].x += 10;
                }
                for (var index = 0; index < 4; index++) {
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].texture = RES.getRes("majiang_json." + str[i] + "xichu_png");
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].x += 10;
                    this.shangchiNum++;
                }
            }
        }
        if (arr3.chi) {
            var str = String(arr3.chi).split(";");
            for (var i = 0; i < str.length; i++) {
                var chistr = str[i].split(",");
                // 先把已经彭吃刚的牌往后移动
                for (var index = 0; index < this.shangchiNum; index++) {
                    this.xiArr[this.xiArr.length - index - 1].x += 10;
                }
                for (var index = 0; index < chistr.length; index++) {
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].texture = RES.getRes("majiang_json." + chistr[index] + "xichu_png");
                    this.xiArr[this.xiArr.length - this.shangchiNum - 1].x += 10;
                    this.shangchiNum++;
                }
            }
        }
        if (arr4.gang) {
            var str = String(arr4.gang).split(";");
            for (var index = 0; index < str.length; index++) {
                var pai3 = GamePool.getInstance().getPNG();
                pai3.texture = RES.getRes("zuoBG_png");
                pai3.x = 180;
                this.addChild(pai3);
                this.beiArr.push(pai3);
                pai3.y = 134 + 30 * (this.beiArr.length - 1);
            }
        }
        if (arr4.agang) {
            var str = String(arr4.agang).split(";");
            for (var index = 0; index < str.length; index++) {
                var pai3 = GamePool.getInstance().getPNG();
                pai3.texture = RES.getRes("zuoBG_png");
                pai3.x = 180;
                this.addChild(pai3);
                this.beiArr.push(pai3);
                pai3.y = 134 + 30 * (this.beiArr.length - 1);
            }
        }
        if (arr4.peng) {
            var str = String(arr4.peng).split(";");
            for (var i = 0; i < str.length; i++) {
                // 判断有没有刚了，如果这个牌已经杠了，就不用处理碰这个了
                if (arr4.gang) {
                    var str2 = String(arr4.gang).split(";");
                    var iscon = false;
                    for (var j = 0; j < str2.length; j++) {
                        if (str2[j] == str[i]) {
                            iscon = true;
                        }
                    }
                    if (iscon == true) {
                        continue;
                    }
                }
                if (arr4.agang) {
                    var str2 = String(arr4.agang).split(";");
                    var iscon = false;
                    for (var j = 0; j < str2.length; j++) {
                        if (str2[j] == str[i]) {
                            iscon = true;
                        }
                    }
                    if (iscon == true) {
                        continue;
                    }
                }
                // 先把已经彭吃刚的牌往后移动
                for (var index = 0; index < this.zuochiNum; index++) {
                    this.beiArr[index].y -= 15;
                }
                for (var index = 0; index < 3; index++) {
                    this.beiArr[this.zuochiNum].texture = RES.getRes("majiang_json." + str[i] + "beichu_png");
                    this.beiArr[this.zuochiNum].y -= 10;
                    this.zuochiNum++;
                }
            }
        }
        if (arr4.gang) {
            var str = String(arr4.gang).split(";");
            for (var i = 0; i < str.length; i++) {
                // 先把已经彭吃刚的牌往后移动
                for (var index = 0; index < this.zuochiNum; index++) {
                    this.beiArr[index].y -= 15;
                }
                for (var index = 0; index < 4; index++) {
                    this.beiArr[this.zuochiNum].texture = RES.getRes("majiang_json." + str[i] + "beichu_png");
                    this.beiArr[this.zuochiNum].y -= 10;
                    this.zuochiNum++;
                }
            }
        }
        if (arr4.agang) {
            var str = String(arr4.agang).split(";");
            for (var i = 0; i < str.length; i++) {
                // 先把已经彭吃刚的牌往后移动
                for (var index = 0; index < this.zuochiNum; index++) {
                    this.beiArr[index].y -= 15;
                }
                for (var index = 0; index < 4; index++) {
                    this.beiArr[this.zuochiNum].texture = RES.getRes("majiang_json." + str[i] + "beichu_png");
                    this.beiArr[this.zuochiNum].y -= 10;
                    this.zuochiNum++;
                }
            }
        }
        if (arr4.chi) {
            var str = String(arr4.chi).split(";");
            for (var i = 0; i < str.length; i++) {
                var chistr = str[i].split(",");
                // 先把已经彭吃刚的牌往后移动
                for (var index = 0; index < this.zuochiNum; index++) {
                    this.beiArr[index].y -= 15;
                }
                for (var index = 0; index < chistr.length; index++) {
                    this.beiArr[this.zuochiNum].texture = RES.getRes("majiang_json." + chistr[index] + "beichu_png");
                    this.beiArr[this.zuochiNum].y -= 10;
                    this.zuochiNum++;
                }
            }
        }
        // 
        // 最后再处理自己的牌
        if (arr1.gang) {
            var str = String(arr1.gang).split(";");
            for (var i = 0; i < str.length; i++) {
                for (var index = 0; index < 4; index++) {
                    var pai = GamePool.getInstance().getPNG();
                    pai.texture = RES.getRes("majiang_json." + str[i] + "dongchipeng_png");
                    pai.x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * index;
                    pai.y = 598;
                    this.addChild(pai);
                    this.dongchipengArr.push(pai);
                }
                this.dongchix += GamePlayView.ZIJIPAIWIDTH * 4 + 10;
            }
        }
        if (arr1.agang) {
            var str = String(arr1.agang).split(";");
            for (var i = 0; i < str.length; i++) {
                for (var index = 0; index < 4; index++) {
                    var pai = GamePool.getInstance().getPNG();
                    pai.texture = RES.getRes("majiang_json." + str[i] + "dongchipeng_png");
                    pai.x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * index;
                    pai.y = 598;
                    this.addChild(pai);
                    this.dongchipengArr.push(pai);
                }
                this.dongchix += GamePlayView.ZIJIPAIWIDTH * 4 + 10;
            }
        }
        if (arr1.peng) {
            var str = String(arr1.peng).split(";");
            for (var i = 0; i < str.length; i++) {
                // 判断有没有刚了，如果这个牌已经杠了，就不用处理碰这个了
                if (arr1.gang) {
                    var str2 = String(arr1.gang).split(";");
                    var iscon = false;
                    for (var j = 0; j < str2.length; j++) {
                        if (str2[j] == str[i]) {
                            iscon = true;
                        }
                    }
                    if (iscon == true) {
                        continue;
                    }
                }
                if (arr1.agang) {
                    var str2 = String(arr1.agang).split(";");
                    var iscon = false;
                    for (var j = 0; j < str2.length; j++) {
                        if (str2[j] == str[i]) {
                            iscon = true;
                        }
                    }
                    if (iscon == true) {
                        continue;
                    }
                }
                for (var index = 0; index < 3; index++) {
                    var pai = GamePool.getInstance().getPNG();
                    pai.texture = RES.getRes("majiang_json." + str[i] + "dongchipeng_png");
                    console.log(pai.texture);
                    pai.x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * index;
                    pai.y = 598;
                    this.addChild(pai);
                    this.dongchipengArr.push(pai);
                }
                this.dongchix += GamePlayView.ZIJIPAIWIDTH * 3 + 10;
            }
        }
        if (arr1.chi) {
            var str = String(arr1.chi).split(";");
            for (var i = 0; i < str.length; i++) {
                var chistr = String(str[i]).split(",");
                for (var j = 0; j < chistr.length; j++) {
                    var pai = GamePool.getInstance().getPNG();
                    pai.texture = RES.getRes("majiang_json." + chistr[j] + "dongchipeng_png");
                    pai.x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * j;
                    pai.y = 598;
                    this.addChild(pai);
                    this.dongchipengArr.push(pai);
                }
                this.dongchix += GamePlayView.ZIJIPAIWIDTH * 3 + 10;
            }
        }
        // 排序自己的牌
        //后面的牌重新排一下，最大的在摸牌位置
        for (var i = 0; i < this.paiArr.length; i++) {
            this.paiArr[i].x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * i;
            this.paiArr[i].y = 598;
        }
    };
    p.setDapai = function (arr1, arr2, arr3, arr4) {
        for (var index = 0; index < arr1.length; index++) {
            var pai = GamePool.getInstance().getPNG();
            pai.texture = RES.getRes("majiang_json." + arr1[index] + "dongchu_png");
            pai.x = this.xiaGroup.numChildren % GamePlayView.CHUPAINUM * GamePlayView.SHANGXIACHUPAIWIDTH;
            pai.y = Math.floor(this.xiaGroup.numChildren / GamePlayView.CHUPAINUM) * GamePlayView.SHANGXIACHUPAIHEIGHT;
            this.xiaGroup.addChild(pai);
        }
        for (var index = 0; index < arr2.length; index++) {
            var pai = GamePool.getInstance().getPNG();
            pai.texture = RES.getRes("majiang_json." + arr2[index] + "nanchu_png");
            pai.x = Math.floor(this.youGroup.numChildren / GamePlayView.CHUPAINUM) * GamePlayView.ZUOYOUCHUPAIWIDTH;
            pai.y = (GamePlayView.CHUPAINUM - this.youGroup.numChildren % GamePlayView.CHUPAINUM) * (GamePlayView.ZUOYOUCHUPAIHEIGHT - 15);
            this.youGroup.addChild(pai);
            this.youGroup.setChildIndex(pai, 0);
        }
        for (var index = 0; index < arr3.length; index++) {
            var pai = GamePool.getInstance().getPNG();
            pai.texture = RES.getRes("majiang_json." + arr3[index] + "xichu_png");
            pai.x = (GamePlayView.CHUPAINUM - this.shangGroup.numChildren % GamePlayView.CHUPAINUM) * GamePlayView.SHANGXIACHUPAIWIDTH;
            pai.y = (1 - Math.floor(this.shangGroup.numChildren / GamePlayView.CHUPAINUM)) * GamePlayView.SHANGXIACHUPAIHEIGHT;
            this.shangGroup.addChild(pai);
            this.shangmoPai.visible = false;
        }
        for (var index = 0; index < arr4.length; index++) {
            var pai = GamePool.getInstance().getPNG();
            pai.texture = RES.getRes("majiang_json." + arr4[index] + "beichu_png");
            pai.x = (1 - Math.floor(this.zuoGroup.numChildren / GamePlayView.CHUPAINUM)) * GamePlayView.ZUOYOUCHUPAIWIDTH;
            pai.y = this.zuoGroup.numChildren % GamePlayView.CHUPAINUM * (GamePlayView.ZUOYOUCHUPAIHEIGHT - 15);
            this.zuoGroup.addChild(pai);
            this.zuomoPai.visible = false;
        }
    };
    p.getStartPai = function (obj, userid) {
        this.dongmanorfeman = obj.dong.user.sex;
        this.nanmanorfeman = obj.nan.user.sex;
        this.ximanorfeman = obj.xi.user.sex;
        this.beimanorfeman = obj.bei.user.sex;
        console.log("statr");
        console.log(this.dongmanorfeman);
        console.log(this.nanmanorfeman);
        console.log(this.ximanorfeman);
        console.log(this.beimanorfeman);
        this.oldbaipai = obj.baopai;
        if (obj.lou == true)
            this.islou = true;
        else
            this.islou = false;
        // 显示剩余牌数
        this.paiNumText.text = String(111 - (Number(obj.gang) + Number(obj.idx.value)));
        //关闭等待界面
        if (this.waitSen.parent) {
            this.removeChild(this.waitSen);
            this.waitSen.closeZhunbei();
        }
        //通过房间信息来显示上面的场
        //头部场内容
        this.vipPng.visible = false;
        this.chujiPng.visible = false;
        this.gaojiPng.visible = false;
        this.zhongjiPng.visible = false;
        this.quanNumText.visible = false;
        this.quanTxt.visible = false;
        this.vipWanfabtn.visible = false;
        switch (obj.roomtype) {
            case "0":
                this.chujiPng.visible = true;
                break;
            case "1":
                this.zhongjiPng.visible = true;
                break;
            case "2":
                this.gaojiPng.visible = true;
                break;
            case "3":
                this.vipPng.visible = true;
                this.quanNumText.visible = true;
                this.quanTxt.visible = true;
                this.vipWanfabtn.visible = true;
                this.setWanfaText(obj);
                this.quanNumText.text = String(Math.floor(obj.round / 4) + 1);
                break;
            default:
                break;
        }
        //先判断自己在东南西北
        this.userid = userid;
        if (obj.dong.id == userid) {
            this.initPai(obj.dong);
            console.log("11111");
            if (this.ischonglian == false) {
                this.ischupai = true;
            }
            else {
                this.ischonglian = false;
            }
            this.fangweiGroup.rotation = 0;
            this.timeNumText.x = 547;
            this.timeNumText.y = 267;
            this.position = "dong";
            this.xiazhuangPng.visible = true;
            this.xiaName.text = obj.dong.user.name;
            this.xiaName.name = obj.dong.id;
            this.youName.text = obj.nan.user.name;
            this.youName.name = obj.nan.id;
            this.shangName.text = obj.xi.user.name;
            this.shangName.name = obj.xi.id;
            this.zuoName.text = obj.bei.user.name;
            this.zuoName.name = obj.bei.id;
            this.xiaPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.dong.user.imageid);
            this.youPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.nan.user.imageid);
            this.shangPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.xi.user.imageid);
            this.zuoPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.bei.user.imageid);
            this.xiaFen.text = obj.dong.user.amount;
            this.youFen.text = obj.nan.user.amount;
            this.shangFen.text = obj.xi.user.amount;
            this.zuoFen.text = obj.bei.user.amount;
            if (obj.dong.isTing == true) {
                this.isTing = true;
            }
        }
        else if (obj.nan.id == userid) {
            this.initPai(obj.nan);
            this.fangweiGroup.rotation = 90;
            this.timeNumText.x = 552;
            this.timeNumText.y = 271;
            this.position = "nan";
            this.youzhuangPng.visible = true;
            this.currentAction = "dong";
            this.xiaName.text = obj.nan.user.name;
            this.xiaName.name = obj.nan.id;
            this.youName.text = obj.xi.user.name;
            this.youName.name = obj.xi.id;
            this.shangName.text = obj.bei.user.name;
            this.shangName.name = obj.bei.id;
            this.zuoName.text = obj.dong.user.name;
            this.zuoName.name = obj.dong.id;
            this.xiaPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.nan.user.imageid);
            this.youPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.xi.user.imageid);
            this.shangPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.bei.user.imageid);
            this.zuoPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.dong.user.imageid);
            this.xiaFen.text = obj.nan.user.amount;
            this.youFen.text = obj.xi.user.amount;
            this.shangFen.text = obj.bei.user.amount;
            this.zuoFen.text = obj.dong.user.amount;
            if (obj.nan.isTing == true) {
                this.isTing = true;
            }
        }
        else if (obj.xi.id == userid) {
            this.initPai(obj.xi);
            this.fangweiGroup.rotation = 180;
            this.timeNumText.x = 548;
            this.timeNumText.y = 275;
            this.position = "xi";
            this.shangzhuangPng.visible = true;
            this.currentAction = "dong";
            this.xiaName.text = obj.xi.user.name;
            this.xiaName.name = obj.xi.id;
            this.youName.text = obj.bei.user.name;
            this.youName.name = obj.bei.id;
            this.shangName.text = obj.dong.user.name;
            this.shangName.name = obj.dong.id;
            this.zuoName.text = obj.nan.user.name;
            this.zuoName.name = obj.nan.id;
            this.xiaPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.xi.user.imageid);
            this.youPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.bei.user.imageid);
            this.shangPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.dong.user.imageid);
            this.zuoPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.nan.user.imageid);
            this.xiaFen.text = obj.xi.user.amount;
            this.youFen.text = obj.bei.user.amount;
            this.shangFen.text = obj.dong.user.amount;
            this.zuoFen.text = obj.nan.user.amount;
            if (obj.xi.isTing == true) {
                this.isTing = true;
            }
        }
        else if (obj.bei.id == userid) {
            this.initPai(obj.bei);
            this.fangweiGroup.rotation = 270;
            this.timeNumText.x = 542;
            this.timeNumText.y = 272;
            this.position = "bei";
            this.zuozhuangPng.visible = true;
            this.currentAction = "dong";
            this.xiaName.text = obj.bei.user.name;
            this.xiaName.name = obj.bei.id;
            this.youName.text = obj.dong.user.name;
            this.youName.name = obj.dong.id;
            this.shangName.text = obj.nan.user.name;
            this.shangName.name = obj.nan.id;
            this.zuoName.text = obj.xi.user.name;
            this.zuoName.name = obj.xi.id;
            this.xiaPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.bei.user.imageid);
            this.youPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.dong.user.imageid);
            this.shangPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.nan.user.imageid);
            this.zuoPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.xi.user.imageid);
            this.xiaFen.text = obj.bei.user.amount;
            this.youFen.text = obj.dong.user.amount;
            this.shangFen.text = obj.nan.user.amount;
            this.zuoFen.text = obj.xi.user.amount;
            if (obj.bei.isTing == true) {
                this.isTing = true;
            }
        }
        if (obj.roomtype == "3") {
            this.xiaFen.text = obj.code4vip[this.xiaName.name].code;
            this.youFen.text = obj.code4vip[this.youName.name].code;
            this.shangFen.text = obj.code4vip[this.shangName.name].code;
            this.zuoFen.text = obj.code4vip[this.zuoName.name].code;
            ServerManager.getInstance().isVipOpen = true;
        }
        else {
            ServerManager.getInstance().isVipOpen = false;
        }
        this.dong.visible = true;
        this.dongTween.setPaused(false);
        this.timer.start();
        return this.position;
    };
    p.setWanfaText = function (obj) {
        var vipstring = "";
        if (obj.bao == true) {
            vipstring += "红中满天飞\n";
        }
        if (obj.lou == true) {
            vipstring += "漏胡\n";
        }
        if (obj.bian == true) {
            vipstring += "3、7调夹\n";
        }
        if (obj.dian == true) {
            vipstring += "点炮一家付\n";
        }
        if (obj.hlou == true) {
            vipstring += "红中漏\n";
        }
        this.vipwanfaTxt.text = vipstring;
    };
    p.touchOUT = function (event) {
        this.vipwanfaTxt.visible = false;
        console.log("wanfafalse");
    };
    p.touchON = function (event) {
        this.vipwanfaTxt.visible = true;
        console.log("wanfature");
    };
    p.initPai = function (obj) {
        this.nanArr = [];
        this.xiArr = [];
        this.beiArr = [];
        //其他三家的默认牌
        for (var index = 0; index < 13; index++) {
            var pai = GamePool.getInstance().getPNG();
            pai.texture = RES.getRes("youBG_png");
            pai.x = 1080;
            pai.y = 100 + 36 * index;
            this.addChild(pai);
            this.nanArr.push(pai);
            var pai2 = GamePool.getInstance().getPNG();
            pai2.texture = RES.getRes("shangbgBG_png");
            pai2.x = 385 + (GamePlayView.SHANGXIACHUPAIWIDTH) * index;
            pai2.y = 55;
            this.addChild(pai2);
            this.xiArr.push(pai2);
            var pai3 = GamePool.getInstance().getPNG();
            pai3.texture = RES.getRes("zuoBG_png");
            pai3.x = 180;
            pai3.y = 100 + 36 * index;
            this.addChild(pai3);
            this.beiArr.push(pai3);
        }
        // 把对家的牌和出牌数组换一下深度
        this.swapChildren(this.xiArr[this.xiArr.length - 1], this.shangGroup);
        this.paiArr = [];
        var arr = obj.pai;
        // var arr: Array<string> = ["1", "1", "1", "3", "4", "5", "6", "7", "8", "9", "11", "12", "13"];
        arr.sort(function (a, b) { return Number(a) - Number(b); });
        var k = arr.length;
        for (var i = 0; i < k; i++) {
            var pai = GamePool.getInstance().getPNG(2);
            pai.texture = RES.getRes("majiang_json." + arr[i] + "dongshow_png");
            if (k < 14)
                pai.x = this.dongchix + (13 - k) * GamePlayView.ZIJIPAIWIDTH + Math.floor((13 - k) / 3) * 5 + GamePlayView.ZIJIPAIWIDTH * i;
            else
                pai.x = this.dongchix + GamePlayView.ZIJIPAIWIDTH * i;
            pai.y = 598;
            pai.name = arr[i].toString();
            this.addChild(pai);
            pai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClickPai, this);
            //增加正方形的触摸监听
            pai.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
            this.paiArr.push(pai);
        }
    };
    p.stopMove = function (e) {
        //手指离开屏幕，移除手指移动的监听
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
        if (this.ismove == true) {
            this.ismove = false;
            console.log("this.draggedObject.y:" + this.draggedObject.y);
            if (this.draggedObject.y < 570) {
                // 出牌
                ServerManager.getInstance().chupai(this.ismovepainame);
                this.ischupai = false;
            }
            else {
                // 放回牌
                this.draggedObject.x = this.oldsetX;
                this.draggedObject.y = this.oldsetY;
            }
        }
    };
    p.startMove = function (e) {
        if (this.ischupai == false)
            return;
        this.ismove = false;
        if (e.target.y <= 578) {
            //chupai,得到系统返回再处理桌面上的牌
            this.ismove = true;
        }
        else {
            if (this.isTing == true)
                return;
            this.ismove = true;
        }
        if (this.ismove == true) {
            //把手指按到的对象记录下来
            this.draggedObject = e.currentTarget;
            this.oldsetX = this.draggedObject.x;
            this.oldsetY = this.draggedObject.y;
            //计算手指和要拖动的对象的距离
            this.offsetX = e.stageX - this.draggedObject.x;
            this.offsetY = e.stageY - this.draggedObject.y;
            //手指在屏幕上移动，会触发 onMove 方法
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
            this.ismovepainame = e.target.name;
        }
    };
    p.onMove = function (e) {
        //通过计算手指在屏幕上的位置，计算当前对象的坐标，达到跟随手指移动的效果
        this.draggedObject.x = e.stageX - this.offsetX;
        this.draggedObject.y = e.stageY - this.offsetY;
    };
    p.onButtonClickPai = function (e) {
        if (this.ischupai == false)
            return;
        if (e.target.y <= 578) {
            //chupai,得到系统返回再处理桌面上的牌
            ServerManager.getInstance().chupai(e.target.name);
            this.ischupai = false;
        }
        else {
            if (this.isTing == true)
                return;
            for (var i = 0; i < this.paiArr.length; i++) {
                this.paiArr[i].y = 598;
            }
            e.target.y = 578;
        }
    };
    p.start = function () {
        //进来先显示的等待其他人的界面
        this.addChild(this.waitSen);
        this.waitSen.start();
        this.shezhiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShezhi, this);
        this.liaotianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLiaotian, this);
        SoundManager.getInstance().playBG("5");
    };
    p.onLiaotian = function (event) {
        if (this.chatSen == null) {
            this.chatSen = new ChatSenen();
        }
        this.chatSen.start(this.position);
        this.addChild(this.chatSen);
    };
    /**
     * getMsg
     */
    p.getMsg = function (obj) {
        // {"type":"roomMsg","text":"biaoqing04","position":"nan"}
        if (this.waitSen.parent) {
            this.waitSen.getMsg(obj);
            return;
        }
        if (this.position == obj.position) {
            this.viewMsg(obj, this.xiachatPng, this.xiachatBg, this.xiachatGroup, this.xiachatLabel);
        }
        else {
            var posi = this.getOtherPosition(obj.position);
            if (posi == "you") {
                this.viewMsg(obj, this.youchatPng, this.youchatBg, this.youchatGroup, this.youchatLabel);
            }
            else if (posi == "shang") {
                this.viewMsg(obj, this.shangchatPng, this.shangchatBg, this.shangchatGroup, this.shangchatLabel);
            }
            else if (posi == "zuo") {
                this.viewMsg(obj, this.zuochatPng, this.zuochatBg, this.zuochatGroup, this.zuochatLabel);
            }
        }
    };
    p.viewMsg = function (msg, png, bg, gourp, label) {
        var str = msg.text;
        if (str.indexOf("biaoqing") != -1) {
            png.texture = RES.getRes("chat_json." + str);
            png.visible = true;
        }
        else {
            bg.visible = true;
            label.visible = true;
            label.text = str;
            this.textSound(str, msg.position);
        }
        gourp.visible = true;
        this.setChildIndex(gourp, 10000000);
        var that = this;
        setTimeout(function () {
            bg.visible = false;
            label.visible = false;
            png.visible = false;
            gourp.visible = false;
        }, 3000);
    };
    p.textSound = function (str, position) {
        switch (str) {
            case "别给我打啊我要焖听":
                SoundManager.getInstance().playYx("textsound1_mp3", this[position + "manorfeman"]);
                break;
            case "都别点哦我要搂宝了":
                SoundManager.getInstance().playYx("textsound2_mp3", this[position + "manorfeman"]);
                break;
            case "感觉我的人品要爆发了":
                SoundManager.getInstance().playYx("textsound3_mp3", this[position + "manorfeman"]);
                break;
            case "很高兴认识各位":
                SoundManager.getInstance().playYx("textsound4_mp3", this[position + "manorfeman"]);
                break;
            case "你上大学专业是放炮系的吗":
                SoundManager.getInstance().playYx("textsound5_mp3", this[position + "manorfeman"]);
                break;
            case "你这牌打的很硬气嘛":
                SoundManager.getInstance().playYx("textsound6_mp3", this[position + "manorfeman"]);
                break;
            case "傻愣打牌琢磨啥呢":
                SoundManager.getInstance().playYx("textsound7_mp3", this[position + "manorfeman"]);
                break;
            case "输了不要跑啊哈哈哈":
                SoundManager.getInstance().playYx("textsound8_mp3", this[position + "manorfeman"]);
                break;
            case "我这点子也真是没谁了":
                SoundManager.getInstance().playYx("textsound9_mp3", this[position + "manorfeman"]);
                break;
            case "这牌不出意外是雪山飞狐了":
                SoundManager.getInstance().playYx("textsound10_mp3", this[position + "manorfeman"]);
                break;
            case "这牌让你打的能不能看着点下面":
                SoundManager.getInstance().playYx("textsound11_mp3", this[position + "manorfeman"]);
                break;
            case "真是有钱难买上家差啊":
                SoundManager.getInstance().playYx("textsound12_mp3", this[position + "manorfeman"]);
                break;
            default:
                break;
        }
    };
    p.onShezhi = function (event) {
        if (this.shezhiSen == null) {
            this.shezhiSen = new ShezhiSen();
        }
        this.shezhiSen.start();
        this.addChild(this.shezhiSen);
    };
    /**
     *退出成功
     */
    p.getExit = function (obj, id) {
        // {"type":"E","userid":"111"}
        //看是不是在等待界面还是在游戏中
        if (this.getChildByName("waitSen") == null) {
            //游戏过程中
            if (this.getChildByName("overSen") != null) {
                if (obj.userid == this.userid) {
                    this.overSen.end("exit");
                    this.removeChild(this.overSen);
                    var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
                    changeEvent.eventType = ServerManager.LOGIN_SUCC;
                    changeEvent.obj = ViewManager.getInstance().getChildAt(0);
                    ViewManager.getInstance().dispatchEvent(changeEvent);
                }
                else {
                    this.waitSen.getExit(obj);
                }
            }
        }
        else {
            //等待过程
            if (obj.userid == id) {
                //自己退出
                this.waitSen.end("exit");
                this.removeChild(this.waitSen);
                var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
                changeEvent.eventType = ServerManager.LOGIN_SUCC;
                changeEvent.obj = ViewManager.getInstance().getChildAt(0);
                ViewManager.getInstance().dispatchEvent(changeEvent);
            }
            else {
                this.waitSen.getExit(obj);
            }
        }
    };
    /**
     *设置中间的灯，表示到那个位置的阶段
     */
    p.setPostionLight = function (str) {
        this.dong.visible = false;
        this.dongTween.setPaused(true);
        this.nan.visible = false;
        this.nanTween.setPaused(true);
        this.xi.visible = false;
        this.xiTween.setPaused(true);
        this.bei.visible = false;
        this.beiTween.setPaused(true);
        if (str == "dong") {
            this.dong.visible = true;
            this.dongTween.setPaused(false);
        }
        else if (str == "nan") {
            this.nan.visible = true;
            this.nanTween.setPaused(false);
        }
        else if (str == "xi") {
            this.xi.visible = true;
            this.xiTween.setPaused(false);
        }
        else if (str == "bei") {
            this.bei.visible = true;
            this.beiTween.setPaused(false);
        }
    };
    /**
     * 游戏结束
     */
    p.gameover = function (obj) {
        // 先播放胡动作，然后再进入结果界面
        // this.viewOversen(obj);
        this.timeNumText.text = "15";
        this.timer.stop();
        if (obj.gamestate == "11" || obj.gamestate == "8") {
            if (obj.gamestate == "11") {
                if (this.waitSen.parent) {
                    var bol = this.waitSen.getFangzhutuichu();
                    if (bol) {
                        return;
                    }
                }
            }
            this.viewOversen(obj);
            return;
        }
        if (obj.gamestate == "10" || obj.gamestate == "8") {
            var that = this;
            setTimeout(function () {
                that.viewOversen(obj);
            }, 10000);
            return;
        }
        var that = this;
        if (obj.type == "zimo") {
            this.hupaiImage.texture = RES.getRes("majiang_json." + obj.result.pai + "dongshow_png");
            //漏胡的话,出牌马上落台上，然后显示宝牌
            if (obj.result.lou) {
                this.currentChuPai.visible = true;
                if (this.chupaiImage.parent) {
                    this.chupaiImage.parent.removeChild(this.chupaiImage);
                    this.chupaiImagekuang.parent.removeChild(this.chupaiImagekuang);
                }
            }
        }
        else {
            if (obj.pai)
                this.hupaiImage.texture = RES.getRes("majiang_json." + obj.pai + "dongshow_png");
            else
                this.hupaiImage.texture = RES.getRes("majiang_json." + obj.result.pai + "dongshow_png");
        }
        var numx = 0;
        6;
        var numy = 0;
        if (obj.position == this.position) {
            numx = 600;
            numy = 400;
        }
        else {
            var pp = this.getOtherPosition(obj.position);
            if (pp == "you") {
                numx = 1000;
                numy = 300;
            }
            else if (pp == "shang") {
                numx = 600;
                numy = 100;
            }
            else {
                numx = 200;
                numy = 300;
            }
        }
        this.hupaiImage.x = numx;
        this.hupaiImage.y = numy;
        this.addChild(this.hupaiImage);
        if (this.huMovieClip.parent) {
            this.swapChildren(this.huMovieClip, this.hupaiImage);
        }
        if (this.dafengMovieClip.parent) {
            this.swapChildren(this.dafengMovieClip, this.hupaiImage);
        }
        if (this.baozhongbaoMovieClip.parent) {
            this.swapChildren(this.baozhongbaoMovieClip, this.hupaiImage);
        }
        if (this.louhuMovieClip.parent) {
            this.swapChildren(this.louhuMovieClip, this.hupaiImage);
        }
        if (this.hongzhongMovieClip.parent) {
            this.swapChildren(this.hongzhongMovieClip, this.hupaiImage);
        }
        if (this.mobaohuMovieClip.parent) {
            this.swapChildren(this.mobaohuMovieClip, this.hupaiImage);
        }
        setTimeout(function () {
            that.viewOversen(obj);
        }, 6000);
    };
    p.viewOversen = function (obj) {
        if (obj === void 0) { obj = null; }
        if (this.chatSen) {
            this.chatSen.onClose();
        }
        this.waitSen.closeZhunbei();
        this.unviewChiPeng();
        this.isTing = false;
        this.isZimo = false;
        this.ischonglian = false;
        this.isPorMO = "";
        this.islou = false;
        this.xiagangarr = [];
        this.yougangarr = [];
        this.shanggangarr = [];
        this.zuogangarr = [];
        if (this.tileImage.parent) {
            this.tileImage.parent.removeChild(this.tileImage);
        }
        if (this.chupaiImage.parent) {
            this.chupaiImage.parent.removeChild(this.chupaiImage);
            this.chupaiImagekuang.parent.removeChild(this.chupaiImagekuang);
        }
        if (this.hupaiImage.parent) {
            this.hupaiImage.parent.removeChild(this.hupaiImage);
        }
        // this.baoKuang.visible = false;
        this.baoPai.texture = RES.getRes("baopai_png");
        while (this.nanArr.length > 0) {
            GamePool.getInstance().setPNG(this.removeChild(this.nanArr.pop()));
        }
        while (this.xiArr.length > 0) {
            GamePool.getInstance().setPNG(this.removeChild(this.xiArr.pop()));
        }
        while (this.beiArr.length > 0) {
            GamePool.getInstance().setPNG(this.removeChild(this.beiArr.pop()));
        }
        this.zuochiNum = 0;
        while (this.zuoGroup.numChildren > 0) {
            GamePool.getInstance().setPNG(this.zuoGroup.removeChild(this.zuoGroup.getChildAt(0)));
        }
        this.shangchiNum = 0;
        while (this.shangGroup.numChildren > 0) {
            GamePool.getInstance().setPNG(this.shangGroup.removeChild(this.shangGroup.getChildAt(0)));
        }
        this.youchiNum = 0;
        while (this.youGroup.numChildren > 0) {
            GamePool.getInstance().setPNG(this.youGroup.removeChild(this.youGroup.getChildAt(0)));
        }
        while (this.dongchipengArr.length > 0) {
            GamePool.getInstance().setPNG(this.removeChild(this.dongchipengArr.pop()));
        }
        while (this.paiArr.length > 0) {
            GamePool.getInstance().setPNG(this.removeChild(this.paiArr.pop()), 2);
        }
        while (this.xiaGroup.numChildren > 0) {
            GamePool.getInstance().setPNG(this.xiaGroup.removeChild(this.xiaGroup.getChildAt(0)));
        }
        this.dongchix = GamePlayView.CHUSHIWEIZHI;
        this.pengArr = [];
        this.currentAction = "";
        this.currentChuPai = null;
        this.chiString = "";
        this.pengString = "";
        this.gangString = "";
        this.huString = "";
        this.currentPai = "";
        this.setPostionLight("");
        this.shangTingPng.visible = false;
        this.zuoTingPng.visible = false;
        this.youTingPng.visible = false;
        this.xiaTingPng.visible = false;
        this.shangzhuangPng.visible = false;
        this.xiazhuangPng.visible = false;
        this.zuozhuangPng.visible = false;
        this.youzhuangPng.visible = false;
        if (obj != null) {
            //展示结果
            this.addChild(this.overSen);
            // 如果是漏胡，就把宝牌弄过去，如果是正常自摸，就把最后摸牌传过去
            if (obj.result) {
                if (obj.result.lou) {
                    this.overSen.start(this, obj, this.oldbaipai);
                }
                else {
                    this.overSen.start(this, obj, this.themopai);
                }
            }
            else {
                this.overSen.start(this, obj, this.themopai);
            }
        }
    };
    //结束界面，释放监听
    p.end = function () {
        this.viewOversen();
        if (this.shezhiSen != null) {
            this.shezhiSen.onClose();
        }
        SoundManager.getInstance().playBG();
    };
    GamePlayView.CHUPAINUM = 8;
    // 南北出牌是长宽倒过来的
    GamePlayView.ZUOYOUCHUPAIWIDTH = 57;
    GamePlayView.ZUOYOUCHUPAIHEIGHT = 51;
    GamePlayView.SHANGXIACHUPAIWIDTH = 47;
    GamePlayView.SHANGXIACHUPAIHEIGHT = 71;
    GamePlayView.ZIJIPAIWIDTH = 77;
    GamePlayView.ZIJIPAIHEIGH = 122;
    GamePlayView.CHUSHIWEIZHI = 50;
    return GamePlayView;
}(eui.Component));
egret.registerClass(GamePlayView,'GamePlayView');
//# sourceMappingURL=GamePlayView.js.map