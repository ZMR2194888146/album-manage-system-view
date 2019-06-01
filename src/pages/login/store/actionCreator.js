import {ADMIN_LOGIN, CHANGE_USER_TYPE, GET_LOGIN_URL, HANDLE_LOGIN_URL, LOGIN_STATUS} from "./actionType";

export const adminLogin = () => ({
    type: ADMIN_LOGIN
});

export const changeUserTypeToNormal = () => ({
   type: CHANGE_USER_TYPE
});

export const getLoignUrl = () => ({
    type: GET_LOGIN_URL
});

export const handleLoginUrl = (value) => ({
    type: HANDLE_LOGIN_URL,
    value
});

export const toChangeLoginStatus = (value) => ({
    type: LOGIN_STATUS,
    value
});