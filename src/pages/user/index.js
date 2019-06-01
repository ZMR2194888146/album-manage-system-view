import React from "react";
import {List, Avatar, Empty} from "antd";
import NotData from "../../static/original.png";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getActiveUserList} from "./store/actionCreator";

class User extends React.Component {

    componentWillMount() {
        this.props.toGetUserList();
    }

    render() {
        const {users} = this.props;
        return (
            <div style={{width: 800, margin: "auto"}}>
                {users !== undefined ?
                    <List dataSource={users}
                          renderItem={item => (
                              <List.Item>
                                  <List.Item.Meta
                                      avatar={<Avatar src={item.avatar}/>}
                                      title={item.name}
                                      description={item.motto}
                                  />
                                  <Link to="/user">访问他的主页</Link>
                              </List.Item>
                          )}/>
                    :
                    <Empty
                        style={{marginTop: "25vh"}}
                        image={NotData}
                        description={<span>还没有数据</span>}/>
                }
            </div>
        );
    }
}

const mapDispatch = (dispatch) => ({
    toGetUserList() {
        dispatch(getActiveUserList());
    }
});

const mapState = (state) => ({
    users: state.getIn(['UserState', 'users'])
});

export default connect(mapState, mapDispatch)(User);