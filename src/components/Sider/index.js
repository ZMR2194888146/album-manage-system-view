import React from 'react';
import {Icon, Menu, Drawer} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {DrawerMenuWrapper, SiderMenuWrapper} from "./style";

import {hiddenDrawer} from "./store/actionCreator";
import {toChangeAlbumDisplayStatus, toGetPhotoList} from "../../pages/display/store/actionCreate";

const MenuItem = Menu.Item;

class Sider extends React.Component {

    onClose = () => {
        this.props.toHiddenDrawer();
    };

    onClickPicture = () => {
        this.props.toCloseAlbumDisplay();
        this.props.getPhotoList(this.props.uid);
    };

    renderMenu() {
        return (
            <Menu style={{border: "none"}}>
                <MenuItem style={{height: 60, paddingTop: 12}} key={1}>
                    <Link to="/" onClick={this.onClickPicture} id="showPic">
                        <div style={{fontSize: 10, textAlign: "center"}}>
                            <Icon type="picture"/>
                            <span className="itemName">照片</span>
                        </div>
                    </Link>
                </MenuItem>
                <MenuItem style={{height: 60, paddingTop: 12}} key={2}>
                    <Link to="/album">
                        <div style={{fontSize: 10, textAlign: "center"}}>
                            <Icon type="database"/>
                            <span className="itemName">相册</span>
                        </div>
                    </Link>
                </MenuItem>
                <MenuItem style={{height: 60, paddingTop: 12}} key={3}>
                    <Link to="/share">
                        <div style={{fontSize: 10, textAlign: "center"}}>
                            <Icon type="share-alt"/>
                            <span className="itemName">分享</span>
                        </div>
                    </Link>
                </MenuItem>
                <MenuItem style={{height: 60, paddingTop: 12}} key={4}>
                    <Link to="/users">
                        <div style={{fontSize: 10, textAlign: "center"}}>
                            <Icon type="user"/>
                            <span className="itemName">用户列表</span>
                        </div>
                    </Link>
                </MenuItem>
            </Menu>
        );
    }

    render() {
        return (
            <div>
                <SiderMenuWrapper>
                    {this.renderMenu()}
                </SiderMenuWrapper>
                <Drawer
                    title="电子相册管理系统"
                    closable={false}
                    placement="left"
                    onClose={this.onClose}
                    visible={this.props.showDrawer}>
                    <DrawerMenuWrapper>
                        {this.renderMenu()}
                    </DrawerMenuWrapper>
                </Drawer>
            </div>
        );
    }

}

const mapState = (state) => ({
    uid: state.getIn(['LoginState', 'uid']),
    showDrawer: state.getIn(['SiderState', 'showDrawer'])
});

const mapDispatch = (dispatch) => ({
    toHiddenDrawer() {
        dispatch(hiddenDrawer());
    },
    toCloseAlbumDisplay() {
        dispatch(toChangeAlbumDisplayStatus());
    },
    getPhotoList(uid) {
        dispatch(toGetPhotoList(uid));
    }
});

export default connect(mapState, mapDispatch)(Sider);