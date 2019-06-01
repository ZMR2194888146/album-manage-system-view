import { GET_ALBUM_LIST, HANDLE_ALBUM_LIST, SELECT_ALBUM } from "./actionTypes";

export const getAlbumList = (value) => ({
    type: GET_ALBUM_LIST,
    value
});

export const handleAlbumList = (value) => ({
    type: HANDLE_ALBUM_LIST,
    value
});

export const selectAlbum = (value) => ({
    type:  SELECT_ALBUM,
    value
});