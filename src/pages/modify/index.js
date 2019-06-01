import React from "react";
import {Button, Card, Form, Input} from "antd";
import {connect} from "react-redux";

import {doMidifyUserMotto} from "./store/actionCreator";

const FormItem = Form.Item;
const itemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16}
    }
};

const tailLayout = {
    wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 8, offset: 8}
    }
};

class ModifyInfo extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                let input = this.props.form.getFieldsValue();
                let info = {
                    uid: this.props.uid,
                    motto: input.motto
                };
                this.props.sendMotto(info);
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div style={{width: 600, margin: "20px auto"}}>
                <Card title="修改用户信息">
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem {...itemLayout} label="个性签名">
                            {getFieldDecorator('motto')(
                                <Input type="text"/>
                            )}
                        </FormItem>
                        <FormItem {...tailLayout}>
                            <Button htmlType="submit" type="primary">修改</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

const ModifyWrapper = Form.create()(ModifyInfo);

const mapState = (state) => ({
    uid: state.getIn(['LoginState', 'uid'])
});

const mapDispatch = (dispatch) => ({
    sendMotto(value) {
        dispatch(doMidifyUserMotto(value));
    }
});

export default connect(mapState, mapDispatch)(ModifyWrapper);