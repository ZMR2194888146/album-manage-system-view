import React from "react";
import {Button, Card, Empty} from "antd";
import NotData from "../../static/original.png";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {actionCreator} from "../upload/store";
import {actionCreator as DISActionCreator} from "../display/store";

class AlbumManager extends React.Component {

    componentWillMount() {
        this.props.toGetAlbumList(this.props.uid);
    }

    render() {
        const {albums} = this.props;
        return (
            <div>
                {albums.size !== 0 ?
                    albums.map(value => (
                        <Link to="/display" key={value.id}>
                            <Card hoverable cover={<img src={value.cover} alt="封面" height={190}/>}
                                  style={{float: "left", height: 300, width: 200, margin: "10px 0 0 10px"}}
                                  onClick={() => this.props.toShowThisAlbum(value.id)}>
                                <h4>{value.name}</h4>
                                <h6>创建时间：{value.create_time}</h6>
                                <h6>照片数量：{value.account}</h6>
                            </Card>
                        </Link>
                    ))
                    :
                    <Empty
                        style={{marginTop: "25vh"}}
                        image={NotData}
                        description={<span>还没有创建相册，创建一个吧  </span>}
                    >
                        <Button htmlType="button" type="primary" icon="plus"><Link
                            style={{color: "#fff", textDecoration: "none"}} to="/create">创建</Link></Button>
                    </Empty>
                }

            </div>
        );
    }
}

const mapState = (state) => ({
    albums: state.getIn(['UploadState', 'albumList']),
    uid: state.getIn(['LoginState', 'uid']),
});

const mapDispatch = (dispatch) => ({
    toGetAlbumList(uid) {
        dispatch(actionCreator.getAlbumList(uid));
    },
    toShowThisAlbum(id) {
        //先清空原有的照片列表，然后获取该相册下的所有照片
        dispatch(DISActionCreator.clearPhotoList());
        dispatch(DISActionCreator.toGetPhotoListByAid(id));
    }
});

export default connect(mapState, mapDispatch)(AlbumManager);