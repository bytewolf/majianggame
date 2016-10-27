/**
 *
 * @author 
 *
 */
class WaitSen extends eui.Component {
    /**
     *等待界面
     */
    public wait_dongName: eui.Label;
    public wait_xiName: eui.Label;
    public wait_beiName: eui.Label;
    public wait_nanName: eui.Label;
    public wait_dongPng: eui.Image;
    public wait_beiPng: eui.Image;
    public wait_xiPng: eui.Image;
    public wait_nanPng: eui.Image;
    public wait_closeBtn: eui.Image;
    public wait_dongzhunbupng: eui.Label;
    public wait_beizhunbupng: eui.Label;
    public wait_xizhunbupng: eui.Label;
    public wait_nanzhunbupng: eui.Label;
    public roomid: eui.Label;
    private position: string;

    public settingBtn: eui.Image;
    public chatBtn: eui.Image;

    private settingSen: ShezhiSen;
    private chatSen: ChatSenen;

    public wait_xiCode: eui.Label;
    public wait_nanCode: eui.Label;
    public wait_dongCode: eui.Label;
    public wait_beiCode: eui.Label;


    public xiachatGroup: eui.Group;
    public xiachatPng: eui.Image;
    public xiachatBg: eui.Image;
    public xiachatLabel: eui.Label;
    public zuochatGroup: eui.Group;
    public zuochatBg: eui.Image;
    public zuochatLabel: eui.Label;
    public zuochatPng: eui.Image;
    public shangchatGroup: eui.Group;
    public shangchatBg: eui.Image;
    public shangchatLabel: eui.Label;
    public shangchatPng: eui.Image;
    public youchatGroup: eui.Group;
    public youchatBg: eui.Image;
    public youchatLabel: eui.Label;
    public youchatPng: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/SKIN/WaitSenSkin.exml";
        // this.chatBtn.visible = false;
    }
    /**
    *获取不是自己摸牌的位置，比如自己是东，那么南就是右，自己是西，那么南左
    */
    private getOtherPosition(str: string): string {
        var obj;
        if (this.position == "dong") {
            if (str == "nan") {
                obj = "you";
            } else if (str == "xi") {
                obj = "shang";
            } else if (str == "bei") {
                obj = "zuo";
            } else {
                obj = "xia";
            }
        } else if (this.position == "nan") {
            if (str == "xi") {
                obj = "you";
            } else if (str == "bei") {
                obj = "shang";
            } else if (str == "dong") {
                obj = "zuo";
            } else {
                obj = "xia";
            }
        } else if (this.position == "xi") {
            if (str == "bei") {
                obj = "you";
            } else if (str == "dong") {
                obj = "shang";
            } else if (str == "nan") {
                obj = "zuo";
            } else {
                obj = "xia";
            }
        } else {
            if (str == "dong") {
                obj = "you";
            } else if (str == "nan") {
                obj = "shang";
            } else if (str == "xi") {
                obj = "zuo";
            } else {
                obj = "xia";
            }
        }
        return obj;

    }
    /**
     * 获得加入信息
     */
    public getJ(obj: any) {
        // {"type":"J","player":{"id":"aaa","token":"aaa1464917057007","pai":[],"da":[],"position":"nan","state":0,"hu":{},"menqianqing":"0","isTing":false},"version":0}
        if (obj.player.id == ServerManager.getInstance().userid) {
            this.wait_dongPng.visible = true;
            this.wait_dongPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.player.user.imageid);
            this.wait_dongName.text = obj.player.user.name;

            this.setCode(this.wait_dongCode, obj.player);

            this.wait_dongName.name = obj.player.id;
            if (obj.player.state == 2) {
                this.wait_dongzhunbupng.visible = true;
            }
        } else {
            var pp = this.getOtherPosition(obj.player.position);
            if (pp == "you") {
                this.wait_nanPng.visible = true;
                this.wait_nanPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.player.user.imageid);
                this.wait_nanName.text = obj.player.user.name;
                this.setCode(this.wait_nanCode, obj.player)
                this.wait_nanName.name = obj.player.id;
                if (obj.player.state == 2) {
                    this.wait_nanzhunbupng.visible = true;
                    console.log("nane");
                }
            } else if (pp == "shang") {
                this.wait_xiPng.visible = true;
                this.wait_xiPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.player.user.imageid);
                this.wait_xiName.text = obj.player.user.name;
                this.setCode(this.wait_xiCode, obj.player);
                this.wait_xiName.name = obj.player.id;
                if (obj.player.state == 2) {
                    this.wait_xizhunbupng.visible = true;
                }
            } else {
                this.wait_beiPng.visible = true;
                this.wait_beiPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.player.user.imageid);
                this.wait_beiName.text = obj.player.user.name;
                this.setCode(this.wait_beiCode, obj.player);
                this.wait_beiName.name = obj.player.id;
                if (obj.player.state == 2) {
                    this.wait_beizhunbupng.visible = true;
                }
            }
        }

    }
    private setCode(lab: eui.Label, obj: any): void {
        if (this.roomid.text != "") {
            lab.text = String(Number(obj.code) + 2000);
        } else {
            lab.text = obj.user.amount;
        }
    }
    /**
     *获得游戏信息
     */
    private roomuser: string;
    public getGameinfo(obj: any) {
        this.roomuser = obj.userid;
        this.round = obj.code4vip;
        if (obj.roomtype == "3") {
            this.roomid.text = "房间ID：" + obj.id;
        } else {
            this.roomid.text = "";
        }
        // 先判断自己的位置
        if (obj.dong) {
            if (obj.dong.id == ServerManager.getInstance().userid) {
                this.position = "dong";
                this.wait_dongName.text = obj.dong.user.name;
                this.setCode(this.wait_dongCode, obj.dong);
                this.wait_dongName.name = obj.dong.id;
                this.wait_dongPng.visible = true;
                this.wait_dongPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.dong.user.imageid);
                if (obj.dong.state == 2) {
                    this.wait_dongzhunbupng.visible = true;
                }
                if (obj.nan) {
                    this.wait_nanName.text = obj.nan.user.name;
                    this.setCode(this.wait_nanCode, obj.nan)
                    this.wait_nanName.name = obj.nan.id;
                    this.wait_nanPng.visible = true;
                    this.wait_nanPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.nan.user.imageid);
                    if (obj.nan.state == 2) {
                        this.wait_nanzhunbupng.visible = true;
                    }
                } else {
                    this.wait_nanName.text = "";
                    this.wait_nanCode.text = "";
                    this.wait_nanName.name = null;
                    this.wait_nanPng.visible = false;
                    this.wait_nanzhunbupng.visible = false;
                }
                if (obj.xi) {
                    this.wait_xiName.text = obj.xi.user.name;
                    this.setCode(this.wait_xiCode, obj.xi);
                    this.wait_xiName.name = obj.xi.id;
                    this.wait_xiPng.visible = true;
                    this.wait_xiPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.xi.user.imageid);
                    if (obj.xi.state == 2) {
                        this.wait_xizhunbupng.visible = true;
                    }
                } else {
                    this.wait_xiName.text = "";
                    this.wait_xiCode.text = "";
                    this.wait_xiName.name = null;
                    this.wait_xiPng.visible = false;
                    this.wait_xizhunbupng.visible = false;
                }
                if (obj.bei) {
                    this.wait_beiName.text = obj.bei.user.name;
                    this.setCode(this.wait_beiCode, obj.bei);
                    this.wait_beiName.name = obj.bei.id;
                    this.wait_beiPng.visible = true;
                    this.wait_beiPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.bei.user.imageid);
                    if (obj.bei.state == 2) {
                        this.wait_beizhunbupng.visible = true;
                    }
                } else {
                    this.wait_beiName.text = "";
                    this.wait_beiCode.text = "";
                    this.wait_beiName.name = null;
                    this.wait_beiPng.visible = false;
                    this.wait_beizhunbupng.visible = false;
                }
            }
        }
        if (obj.nan) {
            if (obj.nan.id == ServerManager.getInstance().userid) {
                this.position = "nan";
                this.wait_dongName.text = obj.nan.user.name;

                this.setCode(this.wait_dongCode, obj.nan);
                this.wait_dongName.name = obj.nan.id;
                this.wait_dongPng.visible = true;
                this.wait_dongPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.nan.user.imageid);
                if (obj.nan.state == 2) {
                    this.wait_dongzhunbupng.visible = true;
                }
                if (obj.xi) {
                    this.wait_nanName.text = obj.xi.user.name;
                    this.setCode(this.wait_nanCode, obj.xi);
                    this.wait_nanName.name = obj.xi.id;
                    this.wait_nanPng.visible = true;
                    this.wait_nanPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.xi.user.imageid);
                    if (obj.xi.state == 2) {
                        this.wait_nanzhunbupng.visible = true;
                    }
                } else {
                    this.wait_nanName.text = "";
                    this.wait_nanCode.text = "";
                    this.wait_nanName.name = null;
                    this.wait_nanPng.visible = false;
                    this.wait_nanzhunbupng.visible = false;
                }
                if (obj.bei) {
                    this.wait_xiName.text = obj.bei.user.name;
                    this.setCode(this.wait_xiCode, obj.bei);
                    this.wait_xiName.name = obj.bei.id;
                    this.wait_xiPng.visible = true;
                    this.wait_xiPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.bei.user.imageid);
                    if (obj.bei.state == 2) {
                        this.wait_xizhunbupng.visible = true;
                    }
                } else {
                    this.wait_xiName.text = "";
                    this.wait_xiCode.text = "";
                    this.wait_xiName.name = null;
                    this.wait_xiPng.visible = false;
                    this.wait_xizhunbupng.visible = false;
                }
                if (obj.dong) {
                    this.wait_beiName.text = obj.dong.user.name;
                    this.setCode(this.wait_beiCode, obj.dong);
                    this.wait_beiName.name = obj.dong.id;
                    this.wait_beiPng.visible = true;
                    this.wait_beiPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.dong.user.imageid);
                    if (obj.dong.state == 2) {
                        this.wait_beizhunbupng.visible = true;
                    }
                } else {
                    this.wait_beiName.text = "";
                    this.wait_beiCode.text = "";
                    this.wait_beiName.name = null;
                    this.wait_beiPng.visible = false;
                    this.wait_beizhunbupng.visible = false;
                }
            }


        }
        if (obj.xi) {
            if (obj.xi.id == ServerManager.getInstance().userid) {
                this.position = "xi";
                this.wait_dongName.text = obj.xi.user.name;

                this.setCode(this.wait_dongCode, obj.xi);
                this.wait_dongName.name = obj.xi.id;
                this.wait_dongPng.visible = true;
                this.wait_dongPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.xi.user.imageid);
                if (obj.xi.state == 2) {
                    this.wait_dongzhunbupng.visible = true;
                }
                if (obj.bei) {
                    this.wait_nanName.text = obj.bei.user.name;
                    this.setCode(this.wait_nanCode, obj.bei);
                    this.wait_nanName.name = obj.bei.id;
                    this.wait_nanPng.visible = true;
                    this.wait_nanPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.bei.user.imageid);
                    if (obj.bei.state == 2) {
                        this.wait_nanzhunbupng.visible = true;
                        console.log("nane44");
                    }
                } else {
                    this.wait_nanName.text = "";
                    this.wait_nanCode.text = "";
                    this.wait_nanName.name = null;
                    this.wait_nanPng.visible = false;
                    this.wait_nanzhunbupng.visible = false;
                }
                if (obj.dong) {
                    this.wait_xiName.text = obj.dong.user.name;
                    this.setCode(this.wait_xiCode, obj.dong);
                    this.wait_xiName.name = obj.dong.id;
                    this.wait_xiPng.visible = true;
                    this.wait_xiPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.dong.user.imageid);
                    if (obj.dong.state == 2) {
                        this.wait_xizhunbupng.visible = true;
                    }
                } else {
                    this.wait_xiName.text = "";
                    this.wait_xiCode.text = "";
                    this.wait_xiName.name = null;
                    this.wait_xiPng.visible = false;
                    this.wait_xizhunbupng.visible = false;
                }
                if (obj.nan) {
                    this.wait_beiName.text = obj.nan.user.name;
                    this.setCode(this.wait_beiCode, obj.nan);
                    this.wait_beiName.name = obj.nan.id;
                    this.wait_beiPng.visible = true;
                    this.wait_beiPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.nan.user.imageid);
                    if (obj.nan.state == 2) {
                        this.wait_beizhunbupng.visible = true;
                    }
                } else {
                    this.wait_beiName.text = "";
                    this.wait_beiCode.text = "";
                    this.wait_beiName.name = null;
                    this.wait_beiPng.visible = false;
                    this.wait_beizhunbupng.visible = false;
                }
            }


        }
        if (obj.bei) {
            if (obj.bei.id == ServerManager.getInstance().userid) {
                this.position = "bei";
                this.wait_dongName.text = obj.bei.user.name;

                this.setCode(this.wait_dongCode, obj.bei);
                this.wait_dongName.name = obj.bei.id;
                this.wait_dongPng.visible = true;
                this.wait_dongPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.bei.user.imageid);
                if (obj.bei.state == 2) {
                    this.wait_dongzhunbupng.visible = true;
                }

                if (obj.dong) {
                    this.wait_nanName.text = obj.dong.user.name;
                    this.setCode(this.wait_nanCode, obj.dong);
                    this.wait_nanName.name = obj.dong.id;
                    this.wait_nanPng.visible = true;
                    this.wait_nanPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.dong.user.imageid);
                    if (obj.dong.state == 2) {
                        this.wait_nanzhunbupng.visible = true;

                    }
                } else {
                    this.wait_nanName.text = "";
                    this.wait_nanCode.text = "";
                    this.wait_nanName.name = null;
                    this.wait_nanPng.visible = false;
                    this.wait_nanzhunbupng.visible = false;
                }
                if (obj.nan) {
                    this.wait_xiName.text = obj.nan.user.name;
                    this.setCode(this.wait_xiCode, obj.nan);
                    this.wait_xiName.name = obj.nan.id;
                    this.wait_xiPng.visible = true;
                    this.wait_xiPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.nan.user.imageid);
                    if (obj.nan.state == 2) {
                        this.wait_xizhunbupng.visible = true;
                    }
                } else {
                    this.wait_xiName.text = "";
                    this.wait_xiCode.text = "";
                    this.wait_xiName.name = null;
                    this.wait_xiPng.visible = false;
                    this.wait_xizhunbupng.visible = false;
                }
                if (obj.xi) {
                    this.wait_beiName.text = obj.xi.user.name;
                    this.setCode(this.wait_beiCode, obj.xi);
                    this.wait_beiName.name = obj.xi.id;
                    this.wait_beiPng.visible = true;
                    this.wait_beiPng.texture = RES.getRes("touxiangdaoju_json.logo" + obj.xi.user.imageid);
                    if (obj.xi.state == 2) {
                        this.wait_beizhunbupng.visible = true;
                    }
                } else {
                    this.wait_beiName.text = "";
                    this.wait_beiCode.text = "";
                    this.wait_beiName.name = null;
                    this.wait_beiPng.visible = false;
                    this.wait_beizhunbupng.visible = false;
                }
            }

        }


    }
    /**
     *获得用户状态
     */
    public getUstate(obj: any) {
        // {"userid":"111","state":"2","type":"u_state","version":0} 

        if (this.wait_dongName.name == obj.userid) {
            if (obj.state == "2") {
                this.wait_dongzhunbupng.visible = true;
            } else {
                this.wait_dongzhunbupng.visible = false;
            }
        }
        if (this.wait_nanName.name == obj.userid) {
            if (obj.state == "2") {
                this.wait_nanzhunbupng.visible = true;
                console.log("nane66");
            } else {
                this.wait_nanzhunbupng.visible = false;
            }
        }
        if (this.wait_xiName.name == obj.userid) {
            if (obj.state == "2") {
                this.wait_xizhunbupng.visible = true;
            } else {
                this.wait_xizhunbupng.visible = false;
            }
        }
        if (this.wait_beiName.name == obj.userid) {
            if (obj.state == "2") {
                this.wait_beizhunbupng.visible = true;
            } else {
                this.wait_beizhunbupng.visible = false;
            }
        }
    }
    /**
     *获取有人退出的信息
     */
    public getExit(obj: any) {
        // {"type":"E","userid":"111"} 
        if (this.wait_dongName.name == obj.userid) {
            this.wait_dongName.text = "";
            this.wait_dongCode.text = "";
            this.wait_dongName.name = null;
            this.wait_dongPng.visible = false;
            this.wait_dongzhunbupng.visible = false;
        }
        if (this.wait_nanName.name == obj.userid) {
            this.wait_nanName.text = "";
            this.wait_nanCode.text = "";
            this.wait_nanName.name = null;
            this.wait_nanPng.visible = false;
            this.wait_nanzhunbupng.visible = false;
        }
        if (this.wait_xiName.name == obj.userid) {
            this.wait_xiName.text = "";
            this.wait_xiCode.text = "";
            this.wait_xiName.name = null;
            this.wait_xiPng.visible = false;
            this.wait_xizhunbupng.visible = false;
        }
        if (this.wait_beiName.name == obj.userid) {
            this.wait_beiName.text = "";
            this.wait_beiCode.text = "";
            this.wait_beiName.name = null;
            this.wait_beiPng.visible = false;
            this.wait_beizhunbupng.visible = false;
        }

    }
    public start() {
        this.wait_closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetting, this);
        this.chatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChat, this);
    }

    private onChat(event: egret.TouchEvent): void {
        if (!this.chatSen) {
            this.chatSen = new ChatSenen();
        }
        this.chatSen.start(this.position);
        this.addChild(this.chatSen);

    }
	/**
	 * name
	 */
    public getFangzhutuichu(): boolean {
        // panduan shi bu shi diyici
        if (this.roomid.text != "") {
            var hasProp = false;
            for (var prop in this.round) {
                hasProp = true;
                break;
            }
            if (hasProp == false) {
                WinManager.getInstance().showWin("房主退出");
                var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
                changeEvent.eventType = ServerManager.LOGIN_SUCC;
                changeEvent.obj = ViewManager.getInstance().getChildAt(0);
                ViewManager.getInstance().dispatchEvent(changeEvent);
                this.end("exit");
                this.parent.removeChild(this);
                return true;
            } else {
                return false;
            }
        }
        return true;

    }

    private onSetting(event: egret.TouchEvent): void {
        if (!this.settingSen) {
            this.settingSen = new ShezhiSen();
        }
        this.settingSen.start();
        this.addChild(this.settingSen);

    }
	/**
	* getMsg
	*/
    private sex: boolean;
    public round: any;
    public getMsg(obj: any) {
        // {"type":"roomMsg","text":"biaoqing04","position":"nan"}
        this.sex = obj.sex;
        if (this.position == obj.position) {
            this.viewMsg(obj, this.xiachatPng, this.xiachatBg, this.xiachatGroup, this.xiachatLabel);
        } else {
            var posi = this.getOtherPosition(obj.position)
            if (posi == "you") {
                this.viewMsg(obj, this.youchatPng, this.youchatBg, this.youchatGroup, this.youchatLabel);
            } else if (posi == "shang") {
                this.viewMsg(obj, this.shangchatPng, this.shangchatBg, this.shangchatGroup, this.shangchatLabel);
            } else if (posi == "zuo") {
                this.viewMsg(obj, this.zuochatPng, this.zuochatBg, this.zuochatGroup, this.zuochatLabel);
            }
        }
    }
    private viewMsg(msg: any, png: eui.Image, bg: eui.Image, gourp: eui.Group, label: eui.Label) {
        var str = msg.text;
        if (str.indexOf("biaoqing") != -1) {
            png.texture = RES.getRes("chat_json." + str)
            png.visible = true;
        } else {
            bg.visible = true;
            label.visible = true;
            label.text = str;
            setTimeout(function () {
                bg.height = label.measuredHeight+20;
            }, 50);
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
        }, 2000);
    }
    private textSound(str: string, position: string): void {
        switch (str) {
            case "别给我打啊我要焖听":
                SoundManager.getInstance().playYx("textsound1_mp3", this.sex);
                break;
            case "都别点哦我要搂宝了":
                SoundManager.getInstance().playYx("textsound2_mp3", this.sex);
                break;
            case "感觉我的人品要爆发了":
                SoundManager.getInstance().playYx("textsound3_mp3", this.sex);
                break;
            case "很高兴认识各位":
                SoundManager.getInstance().playYx("textsound4_mp3", this.sex);
                break;
            case "你上大学专业是放炮系的吗":
                SoundManager.getInstance().playYx("textsound5_mp3", this.sex);
                break;
            case "你这牌打的很硬气嘛":
                SoundManager.getInstance().playYx("textsound6_mp3", this.sex);
                break;
            case "傻愣打牌琢磨啥呢":
                SoundManager.getInstance().playYx("textsound7_mp3", this.sex);
                break;
            case "输了不要跑啊哈哈哈":
                SoundManager.getInstance().playYx("textsound8_mp3", this.sex);
                break;
            case "我这点子也真是没谁了":
                SoundManager.getInstance().playYx("textsound9_mp3", this.sex);
                break;
            case "这牌不出意外是雪山飞狐了":
                SoundManager.getInstance().playYx("textsound10_mp3", this.sex);
                break;
            case "这牌让你打的能不能看着点下面":
                SoundManager.getInstance().playYx("textsound11_mp3", this.sex);
                break;
            case "真是有钱难买上家差啊":
                SoundManager.getInstance().playYx("textsound12_mp3", this.sex);
                break;
            default:
                break;
        }
    }
    private onClose(event: egret.TouchEvent): void {
        if (this.roomid.text != "") {
            // WinManager.getInstance().showWin("vip房不能退出")
            var hasProp = false;
            for (var prop in this.round) {
                hasProp = true;
                break;
            }
            console.log(hasProp);

            if (hasProp == false) {
                if (this.wait_dongName.name == this.roomuser) {
                    //没有开始的时候，房主退出，其他的话就直接和解散一样
                    WinManager.getInstance().jiesan();

                } else {
                    ServerManager.getInstance().exitGame();
                }
                return;
            }

            ServerManager.getInstance().senDissolve("N", null, this.position);
            return;
        }
        ServerManager.getInstance().exitGame();
    }
    /**
     * 关闭准备
     */
    public closeZhunbei() {
        this.wait_dongzhunbupng.visible = false;
        this.wait_nanzhunbupng.visible = false;
        this.wait_xizhunbupng.visible = false;
        this.wait_beizhunbupng.visible = false;

    }
    //结束界面，释放监听
    public end(str: string = null) {
        if(this.chatSen)
		{
			this.chatSen.onClose();
		}
        this.wait_closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.wait_dongzhunbupng.visible = false;
        this.wait_nanzhunbupng.visible = false;
        this.wait_xizhunbupng.visible = false;
        this.wait_beizhunbupng.visible = false;
        if (str == "exit") {
            this.wait_dongName.text = "";
            this.wait_dongCode.text = ""
            this.wait_dongName.name = null;
            this.wait_dongPng.visible = false;
            this.wait_nanName.text = "";
            this.wait_nanCode.text = "";
            this.wait_nanName.name = null;
            this.wait_nanPng.visible = false;
            this.wait_xiName.text = "";
            this.wait_xiCode.text = "";
            this.wait_xiName.name = null;
            this.wait_xiPng.visible = false;
            this.wait_beiName.text = "";
            this.wait_beiCode.text = "";
            this.wait_beiName.name = null;
            this.wait_beiPng.visible = false;
        }
    }
}
