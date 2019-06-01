import {fromJS} from "immutable";
import {message} from "antd";
import {HANDLE_SUBMiT_RESULT} from "./actionType";

const Cstate = fromJS({});

const state = (state = Cstate, action) => {
    switch (action.type) {
        case HANDLE_SUBMiT_RESULT:
            if (action.value.code === 200) {
                message.success("comment on success");
            }
            return state;
        default:
            return state;
    }
};
export default state;