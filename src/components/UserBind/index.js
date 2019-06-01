import {Button, Form, Input} from "antd";
import React from "react";
import {connect} from "react-redux";

import {sendBindInfo} from "./store/actionCreator";

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

class AdminLoginBox extends React.Component{

    sendBindInfo = (e) => {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                let input = this.props.form.getFieldsValue();
                let info = {
                    aliUserId: this.props.aliUserId,
                    sid: input.sid,
                    name: input.name,
                    rcode: input.rcode
                };
                this.props.toSendBindInfo(info);
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return(
            <Form style={{height: 325, width: "100%", float: "left"}} onSubmit={this.sendBindInfo}>
                <FormItem {...itemStyle} label="学号">
                    {getFieldDecorator('sid', {
                        rules: [{required: true, message: '请输入学号'}]
                    })(
                        <Input className="input-box" type="text" placeholder="请输入你的学号"/>
                    )}
                </FormItem>
                <FormItem {...itemStyle} label="姓名">
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: '请输入姓名'}]
                    })(
                        <Input className="input-box" type="text" placeholder="请输入你的姓名"/>
                    )}
                </FormItem>
                <FormItem {...itemStyle} label="认证码">
                    {getFieldDecorator('rcode', {
                        rules: [{required: true, message: '请输入认证码'}]
                    })(
                        <Input className="input-box" type="text" placeholder="请输入你从管理员那里获取到的认证码"/>
                    )}
                </FormItem>
                <FormItem {...tailStyle}>
                    <Button type="primary" htmlType="submit" style={{span: "0 20px"}}>认证身份</Button>
                </FormItem>
            </Form>
        );
    }
}

const AdminLoginBoxWrapper = Form.create()(AdminLoginBox);

const mapState = (state) => ({
    aliUserId: state.getIn(['LoginState', 'aliUserId'])
});

const mapDispatch = (dispatch) => ({
    toSendBindInfo(value) {
        dispatch(sendBindInfo(value));
    }
});

export default connect(mapState, mapDispatch)(AdminLoginBoxWrapper);