/**
 *
 * @author
 * 主要控制界面的切换
 */
var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=ViewManager,p=c.prototype;
    /**
     * 这里初始化
     */
    p.init = function () {
        this.datingView = new DatingView();
        this.gameView = new GamePlayView();
        this.datingView = new DatingView();
        this.loginSen = new LoginView();
        this.loginSen.start();
        this.addChild(this.loginSen);
        ServerManager.getInstance();
        SoundManager.getInstance();
        this.addEventListener(ChangeSceneEvent.CHANGE_SCENE_EVENT, this.onChangeScene, this);
        // var s=new ShezhiSen;
        // s.start();
        // this.addChild(s);
    };
    ViewManager.getInstance = function () {
        if (ViewManager.instance == null) {
            ViewManager.instance = new ViewManager();
        }
        return ViewManager.instance;
    };
    p.onChangeScene = function (e) {
        e.obj.end();
        this.removeChildren();
        switch (e.eventType) {
            //登录
            case ServerManager.LOGIN:
                this.loginSen.start();
                this.addChild(this.loginSen);
                break;
            //登录
            case ServerManager.LOGIN_SUCC:
                this.datingView.start();
                this.addChild(this.datingView);
                break;
            //游戏
            case ServerManager.GAME_START:
                this.gameView.start();
                this.addChild(this.gameView);
                break;
            default:
                break;
        }
    };
    return ViewManager;
}(eui.UILayer));
egret.registerClass(ViewManager,'ViewManager');
//# sourceMappingURL=ViewManager.js.map