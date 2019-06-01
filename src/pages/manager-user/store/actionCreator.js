import {GET_ALL_USER, HANDLE_ALL_USER} from "./actionTypes";

export const getAllUser = () => ({
    type: GET_ALL_USER
});

export const handleAllUser = (value) => ({
    type: HANDLE_ALL_USER,
    value
});