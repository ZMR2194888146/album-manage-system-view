import {HANDLE_RESULT, SEND_NEW_INFO} from "./actionTypes";

export const toSendNewInfo = (value) => ({
    type: SEND_NEW_INFO,
    value
});

export const handleResult = (value) => ({
    type: HANDLE_RESULT,
    value
});