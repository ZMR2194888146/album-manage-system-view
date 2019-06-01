import {
    GET_SHARED_PHOTO_BY_UID,
    HANDLE_SHARED_PHOTO_LIST_RESULT,
    CHECK_PHOTO,
    CLOSE_CHECK_PHOTO_BOX
} from "./actionTypes";

export const getSharedPhotoList = (value) => ({
    type: GET_SHARED_PHOTO_BY_UID,
    value
});

export const handleSharePhotoList = (value) => ({
    type: HANDLE_SHARED_PHOTO_LIST_RESULT,
    value
});

export const toCheckPhoto = (value) => ({
    type: CHECK_PHOTO,
    value
});

export const toCloseCheckPhoto = () => ({
    type: CLOSE_CHECK_PHOTO_BOX
});