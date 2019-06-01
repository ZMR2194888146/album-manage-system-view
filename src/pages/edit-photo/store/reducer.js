import { fromJS } from "immutable";
import {message} from "antd";
import {HANDLE_RESULT} from "./actionTypes";

const editState = fromJS({

});

const state = (state = editState, action) => {
    switch (action.type) {
        case HANDLE_RESULT:
            if (action.value.code === 200) {
                message.success("修改成功");
            } else {
                message.warn("出现错误");
            }
            return state;
        default:
            return state;
    }
};

export default state;