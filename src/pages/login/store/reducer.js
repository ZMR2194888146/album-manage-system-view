import {fromJS} from "immutable";
import {message} from "antd";
import {ADMIN_LOGIN, CHANGE_USER_TYPE, HANDLE_LOGIN_URL, LOGIN_STATUS} from "./actionType";
import {HANDLE_LOGIN_RESULT} from "../../../components/AdminLoginBox/store/actionTypes";
import {HANDLE_BIND_RESULT} from "../../../components/UserBind/store/actionTypes";

const defaultState = fromJS({
    isBind: false,
    isAdmin: false,
    isLogin: false,
    isSelect: false,
    avatar: "",
    loginURL: "",
    aliUserId: "",
    sid: -1,
    uid: -1
});

const state = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_STATUS:
            if (action.value.code === 200) {
                const {isBind} = action.value;
                if (isBind) {
                    message.info("need bind your info");
                    return state.merge({
                        aliUserId: action.value.aliUserId,
                        isBind: true,
                        isSelect: true
                    });
                } else {
                    return state.merge({
                        uid: action.value.uid,
                        isLogin: true,
                        isSelect: true,
                        avatar: action.value.avatar
                    });
                }
            } else {
                return state;
            }
        case HANDLE_BIND_RESULT:
            if (action.value.code === 200) {
                message.success("bind success");
                return state.merge({
                    avatar: action.value.data.avatar,
                    isLogin: true,
                    uid: action.value.data.uid
                });
            } else {
                message.warn("error in the binding");
            }
            return state;
        case HANDLE_LOGIN_RESULT:
            if (action.value.code === 200) {
                return state.set('isLogin', true).set('isAdmin', true).set('avatar', action.value.avatar);
            }
            message.error(action.value.message);
            return state;
        case HANDLE_LOGIN_URL:
            if (action.value.sid !== undefined) {
                return state.set('loginURL', action.value.url).set('sid', action.value.sid);
            } else {
                message.error("登录未就绪，请稍后刷新重试");
                return state;
            }
        case CHANGE_USER_TYPE:
            return state.set('isAdmin', false).set('isSelect', false);
        case ADMIN_LOGIN:
            return state.set('isAdmin', true).set('isSelect', true);
        default:
            return state;
    }
};

export default state;