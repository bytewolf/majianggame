/**
 *
 * @author 
 * 主要控制界面的切换
 */
class ViewManager extends eui.UILayer {
    public constructor() {
        super();
        this.init();
    }

    private static instance: ViewManager;
    public loginSen: LoginView;//登录界面
    public gameView: GamePlayView;//游戏界面
    public datingView: DatingView;//大厅界面
	/**
	 * 这里初始化
	 */
    private init() {
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
    }
    public static getInstance(): ViewManager {
        if (ViewManager.instance == null) {
            ViewManager.instance = new ViewManager();
        }

        return ViewManager.instance;
    }

    public onChangeScene(e: ChangeSceneEvent) {
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
    }
}
