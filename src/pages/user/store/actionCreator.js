import {GET_ACTIVE_USER_LIST, HANDLE_ACTIVE_USER_LIST} from "./actionTypes";

export const getActiveUserList = () => ({
    type: GET_ACTIVE_USER_LIST
});

export const handleActiveUserList = (value) => ({
    type: HANDLE_ACTIVE_USER_LIST,
    value
});