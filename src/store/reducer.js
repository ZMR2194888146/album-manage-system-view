import {combineReducers} from "redux-immutable";

import LoginState from "../pages/login/store/reducer";
import SiderState from "../components/Sider/store/reducer";
import DisplayState from "../pages/display/store/reducer";
import CreateAlbum from "../pages/create-album/store/reducer";
import UploadState from "../pages/upload/store/reducer";
import EditPhotState from "../pages/edit-photo/store/reducer";
import SharedState from "../pages/share-album/store/reducer";
import UserState from "../pages/user/store/reducer";
import MUserState from "../pages/manager-user/store/reducer";
import ModifyUserMottoState from "../pages/modify/store/reducer";
import CState from "../components/CheckPhoto/store/reducer";

export default combineReducers({
    LoginState,
    SiderState,
    DisplayState,
    CreateAlbum,
    UploadState,
    EditPhotState,
    SharedState,
    UserState,
    MUserState,
    ModifyUserMottoState,
    CState
});