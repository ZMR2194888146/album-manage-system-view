import {fromJS} from "immutable";
import { message } from "antd";
import {HANDLE_ALBUM_LIST, SELECT_ALBUM} from "./actionTypes";

const UploadState = fromJS({
    albumList: [],
    selectedAlbum: {}
});

const state = (state = UploadState, action) => {
    switch (action.type) {
        case SELECT_ALBUM:
            let newState = {};
            state.get('albumList').map(item => {
                if (action.value === item.id) {
                    newState = state.set('selectedAlbum', item);
                }
            });
            return newState;
        case HANDLE_ALBUM_LIST:
            if (action.value.code === 200) {
                return state.set('albumList', action.value.data).set('selectedAlbum', {});
            }else {
                message.error("还没有创建相册，先去创建一个吧");
                return state;
            }
        default:
            return state;
    }
};

export default state;