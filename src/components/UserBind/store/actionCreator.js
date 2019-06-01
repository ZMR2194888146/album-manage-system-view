import {SEND_BIND_INFO, HANDLE_BIND_RESULT} from "./actionTypes";

export const sendBindInfo = (value) => ({
    type: SEND_BIND_INFO,
    value
});

export const handleBindResult = (value) => ({
    type: HANDLE_BIND_RESULT,
    value
});