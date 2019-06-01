import { DO_CREATE_ALBUM, RESULT_CREATE_ALBUM } from "./actionTypes";

export const doCreateAlbum = (value) => ({
    type: DO_CREATE_ALBUM,
    value
});

export const resultCreateAlbum = (value) => ({
    type: RESULT_CREATE_ALBUM,
    value
});