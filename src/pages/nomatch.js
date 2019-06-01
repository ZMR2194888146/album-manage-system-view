import React from "react";
import { Layout } from "antd";
import {NavLink} from "react-router-dom";

const { Content } = Layout;

class NoMatch extends React.Component{
    render() {
        return(
            <Layout style={{height: "50vh", backgroundColor: "#fff"}}>
                <Content style={{ textAlign: "center", paddingTop: "20vh"}} >
                    <h3>你访问的页面不存在</h3>
                    <NavLink to="/">回到首页</NavLink>
                </Content>
            </Layout>
        );
    }
}
export default NoMatch;