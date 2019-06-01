import {Button, Form, Input} from "antd";
import React from "react";
import { connect } from "react-redux";

import { changeUserTypeToNormal } from "../../pages/login/store/actionCreator";
import {doAdminLogin} from "./store/actionCreator";

const FormItem = Form.Item;

const itemStyle = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12}
    }
};

const tailStyle = {
    wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 12, offset: 8}
    }
};

class AdminLoginBox extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                let input = this.props.form.getFieldsValue();
                let info = {
                    username: input.username,
                    password: input.password
                };
                this.props.adminLogin(info);
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...itemStyle} label="用户名">
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名'}]
                    })(
                        <Input type="text"/>
                    )}
                </FormItem>
                <FormItem {...itemStyle} label="密码">
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码'}]
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem {...tailStyle}>
                    <div>
                        <Button htmlType="submit" type="primary">登录</Button>
                        <Button htmlType="button" type="primary" style={{margin: "0 10px"}} onClick={this.props.doBack}>返回</Button>
                    </div>
                </FormItem>
            </Form>
        );
    }
}

const AdminLoginBoxWrapper = Form.create()(AdminLoginBox);

const mapDispatch = (dispatch) => ({
   doBack(){
       dispatch(changeUserTypeToNormal());
   },
    adminLogin(value) {
        dispatch(doAdminLogin(value));
    }
});

export default connect(null, mapDispatch)(AdminLoginBoxWrapper);