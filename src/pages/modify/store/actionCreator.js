import {HANDLE_MODIFY_RESULT, MODIFY_USER_MOTTO} from "./actionTypes";

export const doMidifyUserMotto = (value) => ({
    type: MODIFY_USER_MOTTO,
    value
});

export const handleModifyResult = (value) => ({
    type: HANDLE_MODIFY_RESULT,
    value
});