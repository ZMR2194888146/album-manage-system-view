import {fromJS} from "immutable";
import {HANDLE_ACTIVE_USER_LIST} from "./actionTypes";

const userState = fromJS({
    users: []
});

const state = (state = userState, action) => {
    switch (action.type) {
        case HANDLE_ACTIVE_USER_LIST:
            if (action.value.code === 200) {
                return state.set('users', action.value.data);
            }
            return state;
        default:
            return state;
    }
};

export default state;