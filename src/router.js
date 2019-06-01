import React from 'react';
import {Switch, Route, HashRouter, Redirect} from "react-router-dom";
import {Layout} from "antd";
import {connect} from "react-redux";
import Bg from "./static/simple_tree.jpg";

import App from "./App";

import AlbumHeader from "./components/Header";
import AlbumSider from "./components/Sider";

import EditPhoto from "./pages/edit-photo";
import AlbumUpload from "./pages/upload";
import Login from "./pages/login";
import Display from "./pages/display";
import AlbumManager from "./pages/album-manager";
import ShareAlbum from "./pages/share-album";
import CreateAlbum from "./pages/create-album";
import UserList from "./pages/user";
import ModifyInfo from "./pages/modify";
import AlbumDetail from "./pages/album-detial";

import ManagerUser from "./pages/manager-user";

import NoMatch from "./pages/nomatch";

const {Header, Sider, Content} = Layout;

class AlbumRouter extends React.Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <App>
                        <Switch>
                            <Route path="/login" exact component={Login}/>
                            <Route path="/admin/user" exact component={ManagerUser}/>
                            <Route path="/" component={() => (
                                <div>
                                    {this.props.isLogin ?
                                        <Layout style={{height: "100vh"}}>
                                            <Header
                                                style={{backgroundColor: "#ffffff", borderBottom: "1px solid #eeeeee"}}>
                                                <AlbumHeader/>
                                            </Header>
                                            <Layout>
                                                <Sider
                                                    breakpoint={20}
                                                    style={{
                                                        backgroundColor: "#ffffff",
                                                        textAlign: "center",
                                                        borderRight: "1px solid #eee"
                                                    }}
                                                    width={80}>
                                                    <AlbumSider/>
                                                </Sider>
                                                <Content style={{backgroundColor: "#ffffff"}}>
                                                    <img alt="背景" src={Bg}
                                                         style={{
                                                             position: "fixed",
                                                             width: 200,
                                                             right: 20,
                                                             bottom: 0,
                                                             zIndex: 0
                                                         }}/>
                                                    <Switch>
                                                        {/*浏览照片*/}
                                                        <Route path="/" exact component={Display}/>
                                                        <Route path="/display" exact component={Display}/>
                                                        {/*上传照片*/}
                                                        <Route path="/upload" exact component={AlbumUpload}/>
                                                        {/*相册管理*/}
                                                        <Route path="/album" exact component={AlbumManager}/>
                                                        {/*分享相册*/}
                                                        <Route path="/share" exact component={ShareAlbum}/>
                                                        {/*修改个性签名*/}
                                                        <Route path="/modify" exact component={ModifyInfo}/>
                                                        {/*用户列表*/}
                                                        <Route path="/users" exact component={UserList}/>
                                                        {/*修改照片的标题和描述*/}
                                                        <Route path="/edit" exact component={EditPhoto}/>
                                                        {/*创建相册*/}
                                                        <Route path="/create" exact component={CreateAlbum}/>
                                                        <Route path="/detail" exact componrnt={AlbumDetail}/>
                                                        {/*都没有匹配到路径*/}
                                                        <Route component={NoMatch}/>
                                                    </Switch>
                                                </Content>
                                            </Layout>
                                        </Layout>
                                        :
                                        <Redirect to="/login"/>
                                    }
                                </div>
                            )}/>
                        </Switch>
                    </App>
                </HashRouter>
            </div>
        );
    };
}

const mapStateToProps = (state) => ({
    isLogin: state.getIn(['LoginState', 'isLogin'])
});

export default connect(mapStateToProps, null)(AlbumRouter);