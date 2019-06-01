import {fromJS} from "immutable";
import {message} from "antd";
import {HANDLE_MODIFY_RESULT} from "./actionTypes";

const modifyState = fromJS({});

const state = (state = modifyState, action) => {
    switch (action.type) {
        case HANDLE_MODIFY_RESULT:
            if (action.value.code === 200) {
                message.success("update success");
            } else {
                message.warn("have error");
            }
            return state;
        default:
            return state;
    }
};

export default state;