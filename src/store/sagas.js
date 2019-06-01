import {takeEvery, put} from "redux-saga/effects";
import Axios from "axios";
import {
    actionCreator as createAlbumActionCreator,
    actionTypes as createAlbumActionTypes
} from "../pages/create-album/store";
import {actionType as uploadActionType, actionCreator as uploadActionCreator} from "../pages/upload/store";
import {actionTypes as displayActionTypes, actionCreator as displayActionCreator} from "../pages/display/store";
import {actionTypes as editActionTypes, actionAction as editActionCreator} from "../pages/edit-photo/store";
import {actionCreator as shareActionCreator, actionTypes as shareActionTypes} from "../pages/share-album/store";
import {actionCreator as loginActionCreator, actionType as loginActionTypes} from "../pages/login/store";
import {actionTypes as adminActionTypes, actionCreator as adminActionCreator} from "../components/AdminLoginBox/store";
import {actionTypes as userActionTypes, actionCreator as userActionCreator} from "../pages/user/store";
import {actionTypes as bindActionTypes, actionCreator as bindActionCreator} from "../components/UserBind/store";
import {actionCreator as managerActionCreator, actionTypes as managerActionTypes} from "../pages/manager-user/store";
import {actionCreator as modifyActionCreator, actionType as modifyActionType} from "../pages/modify/store";
import {actionCreator as CActionCreator, actionType as CActionTypes} from "../components/CheckPhoto/store";

//创建一个相册
function* sendAlbumInfo(action) {
    const info = {
        uid: action.value.uid,
        name: action.value.name,
        description: action.value.description,
        album_type: action.value.album_type
    };
    const re = yield Axios.post("/album", info);
    yield put(createAlbumActionCreator.resultCreateAlbum(re.data));
}

// 获取电子相册列表
function* getAlbumList(action) {
    let uid = action.value;
    const re = yield Axios.get("/album/" + uid);
    yield put(uploadActionCreator.handleAlbumList(re.data));
}

//获取某个用户的所有照片
function* toGetPhotoListByUid(action) {
    let uid = action.value;
    const re = yield Axios.get("/image/" + uid);
    yield put(displayActionCreator.toHandlePhotoList(re.data));
}

//更相信指定id的信息
function* updateImageInfo(action) {
    let id = action.value.pid;
    let info = {
        name: action.value.title,
        description: action.value.description
    };
    const re = yield Axios.put("/image/" + id, info);
    yield put(editActionCreator.handleResult(re.data));
}

//将照片修改为公开的
function* changePhoto(action) {
    let id = action.value;
    const re = yield Axios.put("/image/public/" + id);
    yield put(displayActionCreator.handlePhotoChangeResult(re.data));
}

//通过用户id获取器已经分享的照片列表
function* doGetSharedPhotoList(action) {
    let uid = action.value;
    const re = yield Axios.get("/image/share/" + uid);
    yield put(shareActionCreator.handleSharePhotoList(re.data));
}

//获取登录链接
function* doGetLoginUrl() {
    const re = yield Axios.get("/getLoginUrl");
    yield put(loginActionCreator.handleLoginUrl(re.data));
}

//管理员登录
function* doAdminLogin(action) {
    let loginInfo = {
        username: action.value.username,
        password: action.value.password
    };
    const re = yield Axios.post("/login", loginInfo);
    yield put(adminActionCreator.doHandleLoginResult(re.data));
}

//获取所有的用户列表
function* doGetActiveUserList() {
    const re = yield Axios.get("/users/active");
    yield put(userActionCreator.handleActiveUserList(re.data));
}

//发送用户绑定信息
function* sendBindInfo(action) {
    let info = {
        aliUserId: action.value.aliUserId,
        sid: action.value.sid,
        name: action.value.name,
        rcode: action.value.rcode
    };
    const re = yield Axios.post("/bind", info);
    yield put(bindActionCreator.handleBindResult(re.data));
}

//获取所有的用户，包括未激活的
function* getAllUser() {
    const re = yield Axios.get("/users");
    yield put(managerActionCreator.handleAllUser(re.data));
}

//修改用户签名
function* doModifyUserMotto(action) {
    let uid = action.value.uid;
    let info = {motto: action.value.motto};
    const re = yield Axios.put("/user/" + uid, info);
    yield put(modifyActionCreator.handleModifyResult(re.data));
}

//获取指定的相册里的照片
function* toGetPhotoListByAid(action) {
    let aid = action.value;
    const re = yield Axios.get("/image/album/" + aid);
    yield put(displayActionCreator.toHandleAlbumPhotoList(re.data));
}

//通过照片的id获取评论
function* toGetComments(action) {
    const re = yield Axios.get("/comment/" + action.value);
    yield put(displayActionCreator.hanleCommentsList(re.data));
}

//添加一条评论
function* submitCommrnt(action) {
    const re = yield Axios.post("/comment", action.value);
    yield put(CActionCreator.toHanleSubmitResult(re.data));
}

function* mySaga() {
    yield takeEvery(uploadActionType.GET_ALBUM_LIST, getAlbumList);
    yield takeEvery(createAlbumActionTypes.DO_CREATE_ALBUM, sendAlbumInfo);
    yield takeEvery(displayActionTypes.GET_PHOTO_LIST, toGetPhotoListByUid);
    yield takeEvery(editActionTypes.SEND_NEW_INFO, updateImageInfo);
    yield takeEvery(displayActionTypes.CHANGE_PHOTO_TO_PUBLIC, changePhoto);
    yield takeEvery(shareActionTypes.GET_SHARED_PHOTO_BY_UID, doGetSharedPhotoList);
    yield takeEvery(loginActionTypes.GET_LOGIN_URL, doGetLoginUrl);
    yield takeEvery(adminActionTypes.ADMIN_LOGIN, doAdminLogin);
    yield takeEvery(userActionTypes.GET_ACTIVE_USER_LIST, doGetActiveUserList);
    yield takeEvery(bindActionTypes.SEND_BIND_INFO, sendBindInfo);
    yield takeEvery(managerActionTypes.GET_ALL_USER, getAllUser);
    yield takeEvery(modifyActionType.MODIFY_USER_MOTTO, doModifyUserMotto);
    yield takeEvery(displayActionTypes.GET_PHOTO_LIST_BY_AID, toGetPhotoListByAid);
    yield takeEvery(displayActionTypes.GET_COMMENTS_BY_PID, toGetComments);
    yield takeEvery(CActionTypes.SUBMIT_COMMENT, submitCommrnt);
}

export default mySaga;

