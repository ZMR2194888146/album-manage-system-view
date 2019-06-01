import {fromJS} from "immutable";
import {message} from "antd";
import {HANDLE_ALL_USER} from "./actionTypes";

const muserState = fromJS({
    userList: []
});

const state = (state = muserState, action) => {
    switch (action.type) {
        case HANDLE_ALL_USER:
            if (action.value.code === 200) {
                return state.set('userList', action.value.data);
            } else {
                message.info("no data");
                return state;
            }
        default:
            return state;
    }
};

export default state;