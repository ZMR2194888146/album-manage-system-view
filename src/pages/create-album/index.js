import React from "react";
import {Button, Card, Form, Input, Radio} from "antd";
import {connect} from "react-redux";
import { doCreateAlbum } from "./store/actionCreator";

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

class CreateAlbum extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (!err) {
                const input = this.props.form.getFieldsValue();
                const info = {
                    uid: this.props.uid,
                    name: input.name,
                    description: input.description,
                    album_type: input.type
                };
                this.props.toCreateAlbum(info);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Card title="创建相册" style={{width: 500, margin: "20px auto"}}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...itemLayout} label="名字">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请为相册取一个名字'}]
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem label="描述" {...itemLayout}>
                        {getFieldDecorator('description')(
                            <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem {...itemLayout} label="相册类型">
                        {getFieldDecorator('type', {
                            rules: [{required: true, message: '请选择你创建的是哪一种类型的相册'}]
                        })(
                            <Radio.Group>
                                <Radio defaultChecked={false} value="public">共享相册</Radio>
                                <Radio defaultChecked value="private">私有相册</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem {...tailLayout}>
                        <Button type="primary" htmlType="submit" icon="plus">创建</Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

const CreateAlbumWrapper = Form.create()(CreateAlbum);

const mapState = (state) => ({
   uid: state.getIn(['LoginState', 'uid'])
});

const mapDispatch = (dispatch) => ({
     toCreateAlbum(value){
         dispatch(doCreateAlbum(value));
     }
});

export default connect(mapState, mapDispatch)(CreateAlbumWrapper);