import {ADMIN_LOGIN, HANDLE_LOGIN_RESULT} from "./actionTypes";

export const doAdminLogin = (value) => ({
    type: ADMIN_LOGIN,
    value
});

export const doHandleLoginResult = (value) => ({
    type: HANDLE_LOGIN_RESULT,
    value
});