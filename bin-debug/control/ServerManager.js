/**
 *COM("code", "msg"),
    S("000000", "成功"),
    E("000001", "错误"),
    P("000002", "参数错误"),
    SYS_REQ_E("000003", "报文错误"),
    N_LOGIN("100000","请先登录"),
    N_PERMISION("200000","权限不足"),
    
    U_N_EXSIT("300000","用户不存在"),
    U_RECOMMEND_EXSIT("300001","推荐不存在"),
    
    G_N_EXSIT("400000","游戏不存在"),
    G_C_FAIL("400001","游戏创建失败"),
    G_J_FAIL("400002","加入失败"),
    G_E_FAIL("400003","退出失败"),
    
    G_DISSOLVE_FAIL("400004","不可发起解散"),
    G_DISSOLVE_P_FAIL("400005","参数错误"),
    G_C_P_FAIL("400007","游戏创建参数错误"),
    G_C_E_FAIL("400008","房卡不足"),
    G_J_PWD_E("400009","密码错误"),
    
    G_OVER("500000","游戏结束"),
 * @author
 * 主要控制界面的切换
 */
var ServerManager = (function () {
    function ServerManager() {
        this.userid = "111";
        this.vision = "0";
        this.isVipOpen = false;
        /**
         *重连
         */
        this.ischonglian = false;
        //创建 WebSocket 对象
        this.socket = new egret.WebSocket();
        //设置数据格式为二进制，默认为字符串
        this.socket.type = egret.WebSocket.TYPE_STRING;
        //添加收到数据侦听，收到数据会调用此方法
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        //添加链接打开侦听，连接成功会调用此方法
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        //添加异常侦听，出现异常会调用此方法
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        this.urlloader = new egret.URLLoader();
        this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        this.urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onurlloadereRROR, this);
        this.quickurlloader = new egret.URLLoader();
        this.quickurlloader.addEventListener(egret.Event.COMPLETE, this.onCompleteQuick, this);
        this.quickurlloader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onurlloadereRROR, this);
        this.redigitloader = new egret.URLLoader();
        this.redigitloader.addEventListener(egret.Event.COMPLETE, this.onCompleteRedigit, this);
        this.redigitloader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onurlloadereRROR, this);
        this.updateloader = new egret.URLLoader();
        this.updateloader.addEventListener(egret.Event.COMPLETE, this.onCompleteUpdate, this);
        this.updateloader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onurlloadereRROR, this);
        this.timer = new egret.Timer(300000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    }
    var d = __define,c=ServerManager,p=c.prototype;
    /**
      * update
      */
    p.onUpdate = function (name, image, sex) {
        if (sex === void 0) { sex = "1"; }
        var str = "id=" + this.userid +
            "&imageid=" + image +
            "&name=" + name +
            "&sex=" + sex +
            "&token=" + this.token;
        var urlreq = new egret.URLRequest();
        urlreq.url = "http://" + ServerManager.jsonurl + ":8080/majiang/common/updateuser";
        urlreq.method = egret.URLRequestMethod.POST;
        urlreq.data = new egret.URLVariables(str);
        this.updateloader.load(urlreq);
    };
    p.onCompleteUpdate = function (event) {
        var obj = JSON.parse(this.updateloader.data);
        if (obj.code == "000000") {
            WinManager.getInstance().showWin("修改成功");
            ViewManager.getInstance().datingView.imageSetsen.getSucc(obj);
        }
        else {
            if (obj.msg)
                WinManager.getInstance().showWin(obj.msg);
            else
                WinManager.getInstance().showWin("修改失败");
        }
    };
    p.onTimer = function (event) {
        var bind = { token: this.token, type: 'bind' };
        this.sendData(JSON.stringify(bind));
    };
    /**
      *
      */
    p.onRedigit = function (id, password, name) {
        this.userid = id;
        var str = "id=" + id +
            "&pwd=" + password +
            "&name=" + name;
        var urlreq = new egret.URLRequest();
        urlreq.url = "http://" + ServerManager.jsonurl + ":8080/majiang/common/register";
        urlreq.method = egret.URLRequestMethod.POST;
        urlreq.data = new egret.URLVariables(str);
        this.redigitloader.load(urlreq);
    };
    p.onCompleteRedigit = function (event) {
        var obj = JSON.parse(this.redigitloader.data);
        if (obj.code == "000000") {
            WinManager.getInstance().showWin("注册成功");
            ViewManager.getInstance().loginSen.getRedigit(obj);
        }
        else {
            WinManager.getInstance().showWin("注册失败，帐号已被注册");
        }
    };
    /**
   *
   */
    p.onQuickGame = function () {
        var str = "";
        console.log(egret.localStorage.getItem("quickGame"));
        var urlreq = new egret.URLRequest();
        urlreq.url = "http://" + ServerManager.jsonurl + ":8080/majiang/common/quickregister";
        if (egret.localStorage.getItem("quickGame")) {
            str = "id=" + egret.localStorage.getItem("quickGame") +
                "&pwd=" + "pwd";
            urlreq.url = "http://" + ServerManager.jsonurl + ":8080/majiang/common/login";
        }
        urlreq.method = egret.URLRequestMethod.POST;
        urlreq.data = new egret.URLVariables(str);
        this.quickurlloader.load(urlreq);
    };
    p.onCompleteQuick = function (event) {
        var obj = JSON.parse(this.quickurlloader.data);
        console.log(obj);
        if (obj.code == "000000") {
            this.userid = obj.userid;
            egret.localStorage.setItem("quickGame", obj.userid);
            this.gamestate = "0";
            var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
            changeEvent.eventType = ServerManager.LOGIN_SUCC;
            changeEvent.obj = ViewManager.getInstance().getChildAt(0);
            ViewManager.getInstance().dispatchEvent(changeEvent);
            ViewManager.getInstance().datingView.idTxt.text = this.userid;
            this.token = obj.token;
            if (obj.gametoken) {
                this.ischonglian = true;
                this.gametoken = obj.gametoken;
            }
            this.initWebSocket();
        }
        else {
            WinManager.getInstance().showWin(obj.msg);
        }
    };
    /**
    * denglu
    */
    p.onLogin = function (id, pwd) {
        this.userid = id;
        var str = "id=" + id +
            "&pwd=" + pwd;
        var urlreq = new egret.URLRequest();
        urlreq.url = "http://" + ServerManager.jsonurl + ":8080/majiang/common/login";
        urlreq.method = egret.URLRequestMethod.POST;
        urlreq.data = new egret.URLVariables(str);
        this.urlloader.load(urlreq);
        WinManager.getInstance().showWin("正在登录");
    };
    p.onurlloadereRROR = function (event) {
        console.log("get error : " + event);
        WinManager.getInstance().showWin("与服务器连接出错,请检查网络");
    };
    p.onComplete = function (event) {
        var obj = JSON.parse(this.urlloader.data);
        console.log(obj);
        if (obj.code == "000000") {
            this.gamestate = "0";
            ViewManager.getInstance().datingView.idTxt.text = this.userid;
            //登录成功，如果掉线重连
            this.token = obj.token;
            if (obj.gametoken) {
                this.ischonglian = true;
                this.gametoken = obj.gametoken;
            }
            this.initWebSocket();
        }
        else {
            if (obj.msg == "请先登录") {
                WinManager.getInstance().showWin(obj.msg);
            }
            else {
                WinManager.getInstance().showWin(obj.msg);
            }
        }
    };
    p.initWebSocket = function () {
        //连接服务器
        // this.socket.connect("116.252.178.51", 9527);
        this.socket.connect(ServerManager.jsonurl, 9527);
    };
    /**
        *liaotian
        */
    p.chat = function (str, position) {
        var pai = { token: this.token, gametoken: this.gametoken, type: 'roomMsg', userid: this.userid, text: str, position: position };
        this.sendData(JSON.stringify(pai));
    };
    /**
     *出牌
     */
    p.chupai = function (str) {
        var vv = Number(this.vision);
        if (vv == NaN) {
            vv = 0;
        }
        this.fangzhiposition();
        var pai = { token: this.token, type: 'da', pai: str, version: vv, position: this.position };
        this.sendData(JSON.stringify(pai));
    };
    /**
     *
     * @param str
     * @param action
     * 吃碰胡
     */
    p.chipenghu = function (str, action) {
        var vv = Number(this.vision);
        if (vv == NaN) {
            vv = 0;
        }
        this.fangzhiposition();
        var pai = { token: this.token, type: 'action', action: action, pai: str, version: vv, position: this.position, id: this.userid };
        this.sendData(JSON.stringify(pai));
    };
    /**
   *
   * @param str
   * @param action
   * 听
   */
    p.ting = function () {
        var vv = Number(this.vision);
        if (vv == NaN) {
            vv = 0;
        }
        this.fangzhiposition();
        var pai = { token: this.token, type: 'action', action: "ting", version: vv, position: this.position, id: this.userid };
        this.sendData(JSON.stringify(pai));
    };
    /**
    *
    * @param str
    * @param action
    * 抢听
    */
    p.qting = function (str) {
        var vv = Number(this.vision);
        if (vv == NaN) {
            vv = 0;
        }
        this.fangzhiposition();
        var pai = { token: this.token, type: 'action', action: "qting", pai: str, version: vv, position: this.position, id: this.userid };
        this.sendData(JSON.stringify(pai));
    };
    /**
  *
  * @param str 动作，是自摸还是胡
  * 抢听
  */
    p.zimohu = function (str) {
        var vv = Number(this.vision);
        if (vv == NaN) {
            vv = 0;
        }
        this.fangzhiposition();
        var pai = { token: this.token, type: 'action', action: str, version: vv, position: this.position, id: this.userid };
        this.sendData(JSON.stringify(pai));
    };
    p.fangzhiposition = function () {
        console.log("this.position:" + this.position);
        if (!this.position) {
            this.position = ViewManager.getInstance().gameView.position;
        }
    };
    /**
    *
    * @param str
    * @param action
    * 过
    */
    p.guoAction = function () {
        var vv = Number(this.vision);
        if (vv == NaN) {
            vv = 0;
        }
        this.fangzhiposition();
        var pai = { token: this.token, type: 'action', action: "no", version: vv, position: this.position, id: this.userid };
        this.sendData(JSON.stringify(pai));
    };
    /**
    * 创建游戏
    */
    p.Cgame = function (pwd, bao, lou, bian, dian, hongzhonglou, title, goodsType) {
        var objj3 = { token: this.token, type: 'C', roomtype: "3", pwd: pwd, bao: bao, lou: lou, bian: bian, hlou: hongzhonglou, dian: dian, title: title, goodsType: goodsType };
        var ss = JSON.stringify(objj3);
        this.sendData(ss);
    };
    /**
     * 游戏
     */
    p.game = function (str, id, pwd) {
        if (id === void 0) { id = null; }
        if (pwd === void 0) { pwd = null; }
        var objj3 = { token: this.token, type: 'J', gametoken: id, roomtype: str, pwd: pwd };
        var ss = JSON.stringify(objj3);
        this.sendData(ss);
    };
    /**
    * 同步结果
    */
    p.sync = function (id) {
        var objj3 = { token: this.token, type: 'sync', gametoken: id, id: id };
        var ss = JSON.stringify(objj3);
        this.sendData(ss);
    };
    /**
     * 退出游戏
     */
    p.exitGame = function () {
        var objj3 = { token: this.token, type: 'E', gametoken: this.gametoken };
        var ss = JSON.stringify(objj3);
        this.sendData(ss);
    };
    /**
     * 准备
     */
    p.senReady = function () {
        var objj = { token: this.token, type: 'ready' };
        this.sendData(JSON.stringify(objj));
    };
    /**
    * 发起解散VIP
    */
    p.senDissolve = function (str, id, position) {
        if (id === void 0) { id = null; }
        if (position === void 0) { position = null; }
        var posi = this.position;
        if (position != null) {
            posi = position;
        }
        var objj;
        if (id == null) {
            objj = { token: this.token, type: 'dissolve', flag: str, position: posi };
        }
        else {
            objj = { token: this.token, type: 'dissolve', flag: str, id: id, position: posi };
        }
        this.sendData(JSON.stringify(objj));
    };
    /**
       * 获取用户信息
       */
    p.getUser = function (id) {
        if (id === void 0) { id = null; }
        if (id == null)
            var objj = { token: this.token, type: 'user', userid: this.userid };
        else
            var objj = { token: this.token, type: 'user', userid: id };
        this.sendData(JSON.stringify(objj));
    };
    /**
     *发送
     */
    p.sendData = function (str) {
        console.log("发送：" + str);
        this.socket.writeUTF(str);
    };
    /**
     *连接socket
     */
    p.onSocketOpen = function () {
        WinManager.getInstance().closeWin();
        console.log("onSocketOpen接连");
        var bind = { token: this.token, type: 'bind' };
        this.sendData(JSON.stringify(bind));
        this.timer.start();
        var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
        changeEvent.eventType = ServerManager.LOGIN_SUCC;
        changeEvent.obj = ViewManager.getInstance().getChildAt(0);
        ViewManager.getInstance().dispatchEvent(changeEvent);
        if (this.ischonglian) {
            var objj3 = { token: this.token, type: 'J', gametoken: this.gametoken };
            this.sendData(JSON.stringify(objj3));
        }
        this.getUser();
    };
    /**
     *socket关闭
     */
    p.onSocketClose = function () {
        WinManager.getInstance().showWin("与服务器断开链接，请重新登录");
        console.log("WebSocketClose关闭");
        var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
        changeEvent.eventType = ServerManager.LOGIN;
        changeEvent.obj = ViewManager.getInstance().getChildAt(0);
        ViewManager.getInstance().dispatchEvent(changeEvent);
    };
    /**
     *socket出错
     */
    p.onSocketError = function () {
        console.log("WebSocketError错误");
        WinManager.getInstance().showWin("与服务器断开链接，请重新登录");
        var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
        changeEvent.eventType = ServerManager.LOGIN;
        changeEvent.obj = ViewManager.getInstance().getChildAt(0);
        ViewManager.getInstance().dispatchEvent(changeEvent);
    };
    /**
     *获取socket信息
     */
    p.onReceiveMessage = function (e) {
        var myDate = new Date();
        var mytime = myDate.toLocaleTimeString();
        var msg = this.socket.readUTF();
        console.log(mytime + "-收到数据:" + msg);
        var json = JSON.parse(msg);
        if (json.code) {
            if (json.code == "100000") {
                var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
                changeEvent.eventType = ServerManager.LOGIN;
                changeEvent.obj = ViewManager.getInstance().getChildAt(0);
                ViewManager.getInstance().dispatchEvent(changeEvent);
            }
            else if (json.code == "400000") {
                this.ischonglian = false;
            }
            else if (json.code == "500000") {
                //游戏结束了
                var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
                changeEvent.eventType = ServerManager.LOGIN_SUCC;
                changeEvent.obj = ViewManager.getInstance().getChildAt(0);
                ViewManager.getInstance().dispatchEvent(changeEvent);
            }
            WinManager.getInstance().showWin(json.msg);
        }
        if (json.version) {
            if (json.version.value) {
                this.vision = json.version.value;
            }
            else {
                this.vision = json.version;
            }
        }
        switch (json.type) {
            //出牌
            case "P":
                if (this.gamestate == "3")
                    ViewManager.getInstance().gameView.getChuPai(json);
                break;
            //摸牌
            case "mo":
                if (this.gamestate == "3")
                    ViewManager.getInstance().gameView.getMoPai(json);
                break;
            //绑定
            case "bind":
                break;
            //加入
            case "J":
                // {"type":"J","player":{"id":"aaa","token":"aaa1464917057007","pai":[],"da":[],"position":"nan","state":0,"hu":{},"menqianqing":"0","isTing":false},"version":0}
                if (!ViewManager.getInstance().gameView.parent) {
                    var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
                    changeEvent.eventType = ServerManager.GAME_START;
                    changeEvent.obj = ViewManager.getInstance().getChildAt(0);
                    ViewManager.getInstance().dispatchEvent(changeEvent);
                }
                ViewManager.getInstance().gameView.waitSen.getJ(json);
                break;
            //创建
            case "C":
                break;
            //退出成功
            case "E":
                ViewManager.getInstance().gameView.getExit(json, this.userid);
                break;
            //准备
            case "ready":
                break;
            //准备
            case "sync":
                ViewManager.getInstance().datingView.vipsen.getRoom(json);
                break;
            case "user":
                // {"type":"user","user":{"id":"111","name":"111","pwd":"111","regTime":"Jun 14, 2016 11:27:13 PM","ip":"180.136.193.12","amount":10000600.0,"gametoken":""}}
                if (json.user.id == this.userid) {
                    ViewManager.getInstance().datingView.getUser(json);
                }
                break;
            //用户状态
            case "u_state":
                // {"userid":"111","state":"2","type":"u_state","version":0} 
                if (this.userid == json.userid) {
                    if (ViewManager.getInstance().gameView.waitSen.parent == null) {
                        ViewManager.getInstance().gameView.addChild(ViewManager.getInstance().gameView.waitSen);
                        ViewManager.getInstance().gameView.waitSen.start();
                    }
                    if (ViewManager.getInstance().gameView.overSen.parent)
                        ViewManager.getInstance().gameView.removeChild(ViewManager.getInstance().gameView.overSen);
                }
                ViewManager.getInstance().gameView.waitSen.getUstate(json);
                break;
            //游戏状态
            case "gamestate":
                // {"gamestate":"3","type":"gamestate","version":0} 
                if (json.gamestate == "3") {
                }
                else if (json.gamestate == "8" || json.gamestate == "10" || json.gamestate == "11") {
                    //游戏结束
                    ViewManager.getInstance().gameView.gameover(json);
                }
                this.gamestate = json.gamestate;
                break;
            //游戏开始，获得牌
            case "gameinfo":
                this.gametoken = json.id;
                this.vision = json.version.value;
                ViewManager.getInstance().gameView.waitSen.round = json.code4vip;
                // {"type":"gameinfo","id":"0roomtype_p","roomtype":"roomtype_p","no":"0","dong":{"id":"111","token":"1111464916996944","pai":[],"da":[],"position":"dong","state":0,"hu":{},"isTing":false},"state":{},"version":{},"bao":false,"lou":false,"bian":false,"dian":false}   
                if (this.gamestate == "3") {
                    this.position = ViewManager.getInstance().gameView.getStartPai(json, this.userid);
                }
                else {
                    if (!ViewManager.getInstance().gameView.parent) {
                        var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
                        changeEvent.eventType = ServerManager.GAME_START;
                        changeEvent.obj = ViewManager.getInstance().getChildAt(0);
                        ViewManager.getInstance().dispatchEvent(changeEvent);
                    }
                    if (this.ischonglian == true) {
                        if (json.curentpai) {
                            // 游戏中
                            this.gamestate = "3";
                            this.position = ViewManager.getInstance().gameView.getChonglian(json, this.userid);
                            ViewManager.getInstance().gameView.waitSen.getGameinfo(json);
                            this.vision = json.version.value;
                        }
                        else {
                            //房间中
                            ViewManager.getInstance().gameView.waitSen.getGameinfo(json);
                            var objj = { token: this.token, type: 'ready' };
                            this.sendData(JSON.stringify(objj));
                        }
                    }
                    else {
                        ViewManager.getInstance().gameView.waitSen.getGameinfo(json);
                        var objj = { token: this.token, type: 'ready' };
                        this.sendData(JSON.stringify(objj));
                    }
                }
                break;
            //动作,获得可以做动作的数据
            case "action":
                if (this.gamestate == "3")
                    ViewManager.getInstance().gameView.getAction(json);
                break;
            //吃，获得吃动作的数据，就是有人吃之后返回
            case "chi":
                if (this.gamestate == "3")
                    ViewManager.getInstance().gameView.getChi(json);
                break;
            //吃，获得吃动作的数据，就是有人吃之后返回
            case "peng":
                if (this.gamestate == "3")
                    ViewManager.getInstance().gameView.getPeng(json);
                break;
            case "gang":
                if (this.gamestate == "3")
                    ViewManager.getInstance().gameView.getGang(json);
                break;
            case "agang":
                if (this.gamestate == "3")
                    ViewManager.getInstance().gameView.getAGang(json);
                break;
            case "qting":
                if (this.gamestate == "3")
                    ViewManager.getInstance().gameView.getQting(json);
                break;
            case "ting":
                if (this.gamestate == "3")
                    ViewManager.getInstance().gameView.getting(json);
                break;
            case "zimo":
                ViewManager.getInstance().gameView.getZimo(json);
                this.gamestate = "8";
                break;
            case "hu":
                ViewManager.getInstance().gameView.getHu(json);
                this.gamestate = "8";
                break;
            case "result":
                ViewManager.getInstance().gameView.getResult(json);
                this.gamestate = "8";
                break;
            case "bao":
                ViewManager.getInstance().gameView.getBao(json);
                // ViewManager.getInstance().gameView.baoPai.texture = RES.getRes("majiang_json." + json.pai + "dongshow_png");
                break;
            case "dissolve":
                WinManager.getInstance().dissolve(json);
                // ViewManager.getInstance().gameView.baoPai.texture = RES.getRes("majiang_json." + json.pai + "dongshow_png");
                break;
            case "roomMsg":
                ViewManager.getInstance().gameView.getMsg(json);
                break;
            default:
                break;
        }
    };
    ServerManager.getInstance = function () {
        if (ServerManager.instance == null) {
            ServerManager.instance = new ServerManager();
        }
        return ServerManager.instance;
    };
    ServerManager.LOGIN = "Login";
    ServerManager.LOGIN_SUCC = "LoginSucc";
    ServerManager.GAME_START = "game_start";
    ServerManager.jsonurl = "180.76.173.116";
    return ServerManager;
}());
egret.registerClass(ServerManager,'ServerManager');
//# sourceMappingURL=ServerManager.js.map