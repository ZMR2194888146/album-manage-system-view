import React from "react";
import {Avatar, Button, Card, Form, Icon, Input, List} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {toSubmitComment} from "./store/actionCreator";

const TextArea = Input.TextArea;
const FormItem = Form.Item;

class CheckPhoto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: false
        };
    }

    closeComments = (e) => {
        e.stopPropagation();
        this.setState({
            comments: false
        });
    };

    stopProp = (e) => {
        e.stopPropagation();
    };

    textAreaClick = (e) => {
        e.stopPropagation();
    };

    handleOpenClick = (e) => {
        e.stopPropagation();
        this.openComments();
    };

    openComments = () => {
        this.setState({
            comments: true
        });
    };

    handleSubmit = (e) => {
        console.log(this.props.id);
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                let input = this.props.form.getFieldsValue();
                let info = {
                    pid: this.props.pid,
                    uid: this.props.uid,
                    content: input.comment
                };
                this.props.toSubmitComment(info);
            }
        });

    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                {this.props.visible ?
                    <div style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        zIndex: 1000,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.5)"
                    }}>
                        <div style={{height: 400, width: 1050, margin: "15vh auto", overflow: "hidden"}}>
                            <div style={{
                                width: 700,
                                height: 400,
                                backgroundColor: "#000000",
                                float: "left",
                                textAlign: "center"
                            }}>
                                <img src={this.props.src} alt="图片" style={{lineHeight: 400, height: 400}}/>
                            </div>
                            <div style={{height: 400, width: 350, float: "left", backgroundColor: "#fff"}}
                                 onClick={this.closeComments}>
                                {this.props.showMeta ?
                                    <Card style={{height: 100}} actions={[
                                        <Icon onClick={this.props.handleLike} type="like"/>,
                                        <Icon onClick={this.handleOpenClick} type="message"/>,
                                        <Icon type="share-alt" onClick={this.props.handleShare}/>,
                                        <Link to={this.props.editUrl}><Icon type="edit"
                                                                            onClick={this.props.handleEdit}/></Link>
                                    ]}>
                                        <Card.Meta avatar={<Avatar arc={this.props.avatar}/>}
                                                   title={this.props.nickname}
                                                   description={this.props.motto}/>
                                    </Card>
                                    :
                                    null
                                }
                                <div style={{
                                    height: 300,
                                    backgroundColor: "#ffffed",
                                    marginTop: 20,
                                    textAlign: "center"
                                }}>
                                    {this.state.comments ?
                                        <div style={{width: "80%", margin: "auto", textAlign: "right"}}
                                             onClick={this.stopProp}>
                                            <Form onSubmit={this.handleSubmit}>
                                                <FormItem>
                                                    {getFieldDecorator('comment')(
                                                        <TextArea rows={4} autoFocus={true} onClick={this.textAreaClick}
                                                                  onFocus={this.openComments}/>
                                                    )}
                                                </FormItem>
                                                <FormItem>
                                                    <Button htmlType="submit" type="primary" size="small"
                                                            style={{marginTop: 5}}>发表评论</Button>
                                                </FormItem>
                                            </Form>
                                        </div>
                                        :
                                        <Input style={{width: "80%"}} onFocus={this.openComments}
                                               addonAfter={<Icon type="message" onClick={this.handleOpenClick}/>}/>
                                    }
                                    <div style={{width: "80%", height: 200, margin: "auto", overflow: "scroll"}}>
                                        <List size="small" dataSource={this.props.comments}
                                              style={{textAlign: "left", marginTop: 10}}
                                              renderItem={item => (
                                                  <List.Item>
                                                      <Card title={item.nickname} style={{width: "100%"}}>
                                                          <Card.Meta
                                                          avatar={<Avatar src={item.avatar}/>}
                                                          description={item.time}
                                                          />
                                                          <p style={{textAlign: "start"}}>{item.comment_content}</p>
                                                      </Card>
                                                  </List.Item>
                                              )}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

const CheckPhotoWrapper = Form.create()(CheckPhoto);

const mapState = (state) => ({
    pid: state.getIn(['SharedState', 'checkPhoto', 'id']),
    uid: state.getIn(['LoginState', 'uid'])
});

const mapDispatch = (dispatch) => ({
    toSubmitComment(value) {
        dispatch(toSubmitComment(value));
    }
});

export default connect(mapState, mapDispatch)(CheckPhotoWrapper);