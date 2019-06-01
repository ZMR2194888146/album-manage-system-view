import React from "react";
import {Layout, Card, Button, Divider} from "antd";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import QRcode from "qrcode.react";
import WebSocket from "react-websocket";

import {LoginWrapper} from "./styled";

import {adminLogin, getLoignUrl, toChangeLoginStatus} from "./store/actionCreator";

import UserBind from "../../components/UserBind";
import AdminLoginBox from "../../components/AdminLoginBox";


const {Content, Footer} = Layout;


class Login extends React.Component {

	componentWillMount() {
		this.props.doGetLoginUrl();
	}

	handleMessage = (data) => {
		let re = JSON.parse(data);
		if (re.code === 200) {
			let va = {};
			va.code = 200;
			va.uid = re.uid;
			va.avatar = re.avatar;
			va.aliUserId = re.aliUserId;
			va.isBind = re.bind;
			va.isLogin = re.login;
			this.props.changeLoginStatus(va);
		}
	};

	render() {
		if (this.props.isLogin) {
			if (this.props.isAdmin) {
				return <Redirect to="/admin/user"/>;
			} else {
				return <Redirect to="/"/>;
			}
		} else {
			return (
				<LoginWrapper>
					<Layout style={{height: "100%"}}>
						<Content className="left-wrapper">
							<div className="welcome">
								<p>欢迎使用</p>
								<Divider/>
								<h2>电子相册管理系统</h2>
							</div>
						</Content>
						<div className="right-wrapper">
							{this.props.isSelect ?
								this.props.isAdmin ?
									<AdminLoginBox/>
									:
									this.props.isBind ?
										<UserBind/>
										:
										<Redirect to="/"/>
								:
								<Card
									title="用户登录"
									style={{width: 255}}
									actions={[
										<Button htmlType="button" type="primary"
												onClick={this.props.showAdminLoginBox}>管理员登录</Button>
									]}
								>
									<div style={{width: "100%"}}>
										<span>普通用户请使用支付宝扫描二维码登录，管理员请点击按钮后输入用户名和密码后登录</span>
										<QRcode value={this.props.url + "&state=" + this.props.sid}
												logo="favicon.ico"
												size={128}/>
										{this.props.sid !== -1
											?
											<WebSocket debug={true} url={"ws://aboy.easy.echosite.cn/ws/" + this.props.sid}
													   onMessage={this.handleMessage}/>
											:
											null
										}
									</div>
								</Card>
							}
						</div>
						<Footer style={{textAlign: "center"}}>
							<h5>Copyright © <a href="http://www.aboy.site">小男孩的空间</a></h5>
						</Footer>
					</Layout>
				</LoginWrapper>
			);
		}
	}
}

const mapState = (state) => ({
	url: state.getIn(['LoginState', 'loginURL']),
	sid: state.getIn(['LoginState', 'sid']),
	isSelect: state.getIn(['LoginState', 'isSelect']),
	isLogin: state.getIn(['LoginState', 'isLogin']),
	isBind: state.getIn(['LoginState', 'isBind']),
	isAdmin: state.getIn(['LoginState', 'isAdmin'])
});

const mapDispatch = (dispatch) => ({
	showAdminLoginBox() {
		dispatch(adminLogin());
	},
	doGetLoginUrl() {
		dispatch(getLoignUrl());
	},
	changeLoginStatus(value) {
		dispatch(toChangeLoginStatus(value));
	}
});

export default connect(mapState, mapDispatch)(Login);