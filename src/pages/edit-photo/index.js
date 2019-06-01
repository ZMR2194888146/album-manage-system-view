import React from "react";
import {Button, Form, Input} from "antd";
import FormItem from "antd/lib/form/FormItem";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {toSendNewInfo} from "./store/actionCreator";

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

class EditPhoto extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(err => {
            if (!err) {
                let input = this.props.form.getFieldsValue();
                let info = {
                    pid: this.props.pid,
                    title: input.title,
                    description: input.description
                };
                this.props.sendNewPhoto(info);
            }
        })
    };

    render() {
        if (this.props.pid === undefined){
            return <Redirect to="/"/>;
        }else {
            const {getFieldDecorator} = this.props.form;
            return (
                <div style={{width: 800, margin: "10vh auto"}}>
                    <div style={{width: 380, display: "inline-block", float: "left"}}>
                        <img alt="需要修改的图片" width={400} src={this.props.src}/>
                    </div>
                    <div style={{width: 380, display: "inline-block", float: "left"}}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem label="图片标题" {...itemLayout}>
                                {getFieldDecorator('title')(
                                    <Input type="text"/>
                                )}
                            </FormItem>
                            <FormItem label="图片描述" {...itemLayout}>
                                {getFieldDecorator('description')(
                                    <Input type="text"/>
                                )}
                            </FormItem>
                            <FormItem {...tailLayout}>
                                <Button type="primary" htmlType="submit">修改</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            );
        }
    }
}

const EditPhotoWrapper = Form.create()(EditPhoto);

const mapState = (state) => ({
    pid: state.getIn(['DisplayState', 'checkPhoto', 'id']),
    src: state.getIn(['DisplayState', 'checkPhoto', 'src'])
});

const mapDispatch = (dispatch) => ({
    sendNewPhoto(info) {
        dispatch(toSendNewInfo(info));
    }
});

export default connect(mapState, mapDispatch) (EditPhotoWrapper);