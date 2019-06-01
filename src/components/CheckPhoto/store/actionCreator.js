import {SUBMIT_COMMENT, HANDLE_SUBMiT_RESULT} from "./actionType";

export const toSubmitComment = (value) => ({
    type: SUBMIT_COMMENT,
    value
});

export const toHanleSubmitResult = (value) => ({
    type: HANDLE_SUBMiT_RESULT,
    value
});