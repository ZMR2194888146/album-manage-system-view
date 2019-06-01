import React from "react";
import {Button, Card, Form, Icon, Select, Upload} from "antd";
import {connect} from "react-redux";

import {getAlbumList, selectAlbum} from "./store/actionCreator";

const Option = Select.Option;

const fileProps = {
    name: "file",
    listType: 'picture',
    className: 'upload-list-inline'
};

class ImageUpload extends React.Component {

    componentWillMount() {
        this.props.toGetAlbumList(this.props.uid);
    }

    changeSelect = (value) => {
        this.props.changeAlbum(value);
    };

    renderOption = (value) => {
        return value.map(item => (
            <Option value={item.id} key={item.id}>{item.name}</Option>
        ));
    };

    render() {
        return (
            <div style={{width: 500, margin: "20px auto"}}>
                <Card title="上传照片">
                    <div>
                        <span>请选择相册</span>
                        <Button size="small" type="primary" style={{margin: "0 20px"}} htmlType="button" onClick={()=>this.props.toGetAlbumList(this.props.uid)}>刷新</Button>
                    </div>
                    <Select style={{width: 300}} onSelect={this.changeSelect}>
                        {this.renderOption(this.props.albumList)}
                    </Select>
                </Card>
                {this.props.selectAlbum.uid !== undefined ?
                    <div>
                        <Card title="相册描述" size="small" style={{marginTop: 10}}>
                            <h5>{this.props.selectAlbum.description}</h5>
                            <Upload {...fileProps} action={"/image/" + this.props.uid + "/" + this.props.selectAlbum.id}>
                                <Button htmlType="button">
                                    <Icon type="upload"/>
                                    选择需要上传的照片
                                </Button>
                            </Upload>
                        </Card>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

const mapState = (state) => ({
    uid: state.getIn(['LoginState', 'uid']),
    albumList: state.getIn(['UploadState', 'albumList']),
    selectAlbum: state.getIn(['UploadState', 'selectedAlbum'])
});

const mapDispatch = (dispatch) => ({
    toGetAlbumList(uid) {
        dispatch(getAlbumList(uid));
    },
    changeAlbum(id) {
        dispatch(selectAlbum(id));
    }
});

const UploadWrapper = Form.create()(ImageUpload);

export default connect(mapState, mapDispatch)(UploadWrapper);