const LoginEvent = cc.Class({
    properties: {
        eventManager: null,
    },

    statics: {
        getInstance() {
            if (!this.eventManager) {
                this.eventManager = new LoginEvent();
            }
            return this.eventManager;
        },
    },

    initEvent() {
        //注册 事件
        bb.user.Event.addObserver(this);

        var services_handlers = {};
        services_handlers[bb.stype.Auth] = this.on_auth_server_return.bind(this);
        bb.net.register_serivces_handler(services_handlers);
    },

    // 登录验证入口函数
    on_auth_server_return(stype, ctype, body) {
        switch (ctype) {
            case bb.cmd.Auth.GUEST_LOGIN:
                bb.user.setLoginUserInfo(body);
                break;
        }
    },

    onMsgEvent(event, data) {
        switch(event) {
            case bb.user.EventName.LOGIN_SUCCESS: {
                bb.scene.getInstance().runScene("HallScene");
                break;
            }
            case bb.user.EventName.LOGIN_FAILE: {
                console.log('玩家登录失败');
                break;
            }
        }
    }
   
});

module.exports = LoginEvent;
