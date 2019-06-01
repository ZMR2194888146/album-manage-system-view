import {
    CHECK_PHOTO,
    CLOSE_CHECK_PHOTO_BOX,
    GET_PHOTO_LIST,
    HANDLE_LIST_RESULT,
    CHANGE_PHOTO_TO_PUBLIC,
    HANDLE_PHOTO_CHANGE_RESULT,
    CLEAR_PHOTO_LIST,
    GET_PHOTO_LIST_BY_AID,
    HANDLE_ALBUM_PHOTO_LIST,
    CHANGE_ALBUM_DETAIL_STATUS,
    GET_COMMENTS_BY_PID,
    HANDLE_COMMENTS_LIST
} from "./actionTypes";

export const toCheckPhoto = (value) => ({
    type: CHECK_PHOTO,
    value
});

export const toCloseCheckPhoto = () => ({
    type: CLOSE_CHECK_PHOTO_BOX
});

export const toGetPhotoList = (value) => ({
    type: GET_PHOTO_LIST,
    value
});

export const toHandlePhotoList = (value) => ({
    type: HANDLE_LIST_RESULT,
    value
});

export const toChangeAlbumToPublic = (value) => ({
    type: CHANGE_PHOTO_TO_PUBLIC,
    value
});

export const handlePhotoChangeResult = (value) => ({
    type: HANDLE_PHOTO_CHANGE_RESULT,
    value
});

export const clearPhotoList = () => ({
    type: CLEAR_PHOTO_LIST
});

export const toGetPhotoListByAid = (value) => ({
    type: GET_PHOTO_LIST_BY_AID,
    value
});

export const toHandleAlbumPhotoList = (value) => ({
    type: HANDLE_ALBUM_PHOTO_LIST,
    value
});

export const toChangeAlbumDisplayStatus = () => ({
    type: CHANGE_ALBUM_DETAIL_STATUS
});

export const toGetCommentsListByPid = (value) => ({
    type: GET_COMMENTS_BY_PID,
    value
});

export const hanleCommentsList = (value) => ({
    type: HANDLE_COMMENTS_LIST,
    value
});