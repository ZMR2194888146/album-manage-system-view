import {fromJS} from "immutable";
import {message} from "antd";
import {
    CHECK_PHOTO,
    CLOSE_CHECK_PHOTO_BOX,
    HANDLE_LIST_RESULT,
    HANDLE_PHOTO_CHANGE_RESULT,
    CLEAR_PHOTO_LIST,
    HANDLE_ALBUM_PHOTO_LIST,
    CHANGE_ALBUM_DETAIL_STATUS,
    HANDLE_COMMENTS_LIST
} from "./actionTypes";

const displayStore = fromJS({
    checkPhoto: {},
    showPicInfo: false,
    comment: [],
    psrc: [],
    albumShow: false
});

const state = (state = displayStore, action) => {
    switch (action.type) {
        case HANDLE_COMMENTS_LIST:
            return state.set('comment', action.value.data);
        case HANDLE_ALBUM_PHOTO_LIST:
            if (action.value.code === 200) {
                return state.set('psrc', action.value.data);
            }
            message.info("this album is empty");
            return state;
        case CLEAR_PHOTO_LIST:
            return state.set('psrc', []).set('albumShow', true);
        case HANDLE_LIST_RESULT:
            return state.set('psrc', action.value.data);
        case HANDLE_PHOTO_CHANGE_RESULT:
            if (action.value.code === 200) {
                message.success("设置分享成功，已分享的照片在其他用户浏览时可见");
            } else {
                message.warn("设置分享失败，出了点问题，请稍后重试");
            }
            return state;
        case CHANGE_ALBUM_DETAIL_STATUS:
            return state.set('albumShow', false);
        case CLOSE_CHECK_PHOTO_BOX:
            return state.set('checkPhoto', {}).set('showPicInfo', false);
        case CHECK_PHOTO:
            let info = {};
            state.get('psrc').map(v => {
                if (action.value === v.id) {
                    info.src = v.path;
                    info.id = v.id;
                    info.title = v.title;
                }
            });
            return state.set('checkPhoto', info).set('showPicInfo', true);
        default:
            return state;
    }
};

export default state;