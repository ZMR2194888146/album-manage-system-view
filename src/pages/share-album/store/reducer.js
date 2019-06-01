import {fromJS} from "immutable";
import {HANDLE_SHARED_PHOTO_LIST_RESULT, CHECK_PHOTO, CLOSE_CHECK_PHOTO_BOX} from "./actionTypes";
import {message} from "antd";

const shareState = fromJS({
    sharedPhotoList: [],
    checkPhoto: {},
    showPicInfo: false
});

const state = (state = shareState, action) => {
    switch (action.type) {
        case HANDLE_SHARED_PHOTO_LIST_RESULT:
            if (action.value.code === 200) {
                return state.set('sharedPhotoList', action.value.data);
            } else {
                message.warn("还没有已经分享的照片");
                return state;
            }
        case CLOSE_CHECK_PHOTO_BOX:
            return state.set('checkPhoto', {}).set('showPicInfo', false);
        case CHECK_PHOTO:
            let info = {};
            state.get('sharedPhotoList').map(v => {
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