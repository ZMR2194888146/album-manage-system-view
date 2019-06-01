import React from "react";
import {Button, Layout, Table} from "antd";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getAllUser} from "./store/actionCreator";


const {Header, Content} = Layout;

const col = [
    {
        title: "用户名",
        dataIndex: 'id',
        key: 'id'
    }, {
        title: "姓名",
        dataIndex: 'name',
        key: 'id'
    }, {
        title: "认证码",
        dataIndex: 'rcode',
        key: 'id'
    }, {
        title: "用户状态",
        dataIndex: 'active',
        key: 'id',
        render: (text, record) => (
            <div>
                {record.active ?
                    <span>已激活</span>
                    :
                    <span>未激活</span>
                }
            </div>
        )
    }
];

class ManagerUser extends React.Component {

    componentWillMount() {
        this.props.toGetAllUserList();
    }

    render() {
        if (this.props.admin) {
            return (
                <Layout style={{height: "100vh"}}>
                    <Header>
                        <div style={{width: "80vw", margin: "auto", textAlign: "right", color: "#ffffff"}}>
                            <span style={{float: "left", fontSize: 26, fontWeight: 800}}>用户管理</span>
                            <Button htmlType="button">退出</Button>
                        </div>
                    </Header>
                    <Content>
                        <div style={{width: "80vw", margin: "20px auto"}}>
                            <Table dataSource={this.props.userList} columns={col}/>
                        </div>
                    </Content>
                </Layout>
            );
        } else {
            return <Redirect to="/"/>
        }
    }
}

const mapState = (state) => ({
    admin: state.getIn(['LoginState', 'isAdmin']),
    userList: state.getIn(['MUserState', 'userList'])
});

const mapDispatch = (dispatch) => ({
    toGetAllUserList() {
        dispatch(getAllUser());
    }
});

export default connect(mapState, mapDispatch)(ManagerUser);