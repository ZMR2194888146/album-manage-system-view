import { fromJS } from "immutable";
import { message } from "antd";
import { RESULT_CREATE_ALBUM } from "./actionTypes";

const creatAlbumStore = fromJS({
    name: "",
    description: "",
    albumtype: "private"
});

const state = (state = creatAlbumStore, action)=>{
    switch (action.type) {
        case RESULT_CREATE_ALBUM:
            if (action.value.code === 200) {
                message.success("创建相册成功");
            }else {
                message.error("创建相册失败");
            }
            return state;
        default:
            return state;
    }
};

export default state;