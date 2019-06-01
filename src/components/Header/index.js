import React from 'react';
import {Row, Col, Icon, Avatar, Popover, Menu, Button} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import ICON from "../../static/favicon.ico";
import {showDrawer} from "../Sider/store/actionCreator";

const avatarContent = (
    <Menu style={{border: "none"}}>
        <Menu.Item>
            <Link to="modify">修改用户信息</Link>
        </Menu.Item>
        <Menu.Item>
            <a href="javascript:;" onClick={()=>window.location.reload()}>退出登录</a>
        </Menu.Item>
    </Menu>
);

class Header extends React.Component {


    render() {
        return (
            <div>
                <Row type="flex" jusity="space-between">
                    <Col span={1} offset={0}>
                        <Button onClick={() => this.props.toShowDrawer()} style={{border: "none"}} htmlType="button">
                            <Icon type="bars" style={{fontSize: 24, marginLeft: -22}}/>
                        </Button>
                    </Col>
                    <Col span={20} offset={2}>
                        <img alt="Logo" src={ICON} style={{display: "inline-block", width: 50}}/>
                        <span style={{fontSize: 20, fontWeight: 800}}>Album Manage System</span>
                        <span style={{float: "right"}}>
                            <Link to="/create" style={{display: "inline-block", margin: "0 20px"}}>
                                <Icon type="plus"/>
                                创建相册
                            </Link>
                            <Link to="/upload" style={{display: "inline-block", margin: "0 20px"}}>
                                <Icon type="cloud"/>
                                上传
                            </Link>
                            <Popover content={avatarContent}>
                                <Avatar src={this.props.avatar} style={{marginLeft: 80}}/>
                            </Popover>
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatch = (dispatch) => ({
    toShowDrawer() {
        dispatch(showDrawer());
    }
});

const mapState = (state) => ({
    avatar: state.getIn(['LoginState', 'avatar'])
});

export default connect(mapState, mapDispatch)(Header);