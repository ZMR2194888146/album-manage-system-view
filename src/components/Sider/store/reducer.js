import {fromJS} from "immutable";
import {SHOW_DRAWER, HIDDEN_DRAWER} from "./actionType";

const siderState = fromJS({
    showDrawer: false
});

const state = (state = siderState, action) => {
    switch (action.type) {
        case SHOW_DRAWER:
            return state.set('showDrawer', true);
        case HIDDEN_DRAWER:
            return state.set('showDrawer', false);
        default:
            return state;
    }
};

export default state;