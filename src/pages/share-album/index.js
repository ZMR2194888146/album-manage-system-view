import React from "react";
import {Card, Empty} from "antd";
import NotData from "../../static/original.png";
import {connect} from "react-redux";

import {actionCreator} from "./store";
import CheckPhoto from "../../components/CheckPhoto";

class AlbumManager extends React.Component {

    componentWillMount() {
        this.props.toGetSharedPhotoList(this.props.uid);
    }

    closeCheckBox = (e) => {
        e.stopPropagation();
        this.props.closeCheckPhoto();
    };

    toShowCheckBox = (e, id) => {
        e.stopPropagation();
        this.props.toCheckPhoto(id);
    };

    render() {
        const {albums} = this.props;
        return (
            <div onClick={this.closeCheckBox}>
                {albums.size !== 0 ?
                    albums.map(value => (
                        <div key={value.id}>
                            <Card key={value.id} hoverable cover={<img src={value.path} alt="封面" height={190}/>}
                                  style={{float: "left", height: 270, width: 200, margin: "10px 0 0 10px"}}
                                  onClick={(e) => this.toShowCheckBox(e, value.id)}>
                                <h4>名字:{value.name}</h4>
                                <h6>描述:{value.description}</h6>
                            </Card>
                        </div>
                    ))
                    :
                    <Empty
                        style={{marginTop: "25vh"}}
                        image={NotData}
                        description={<span>没有已分享的照片</span>}/>
                }
                <CheckPhoto visible={this.props.showPicInfo} src={this.props.checkPhoto.src}
                            avatar="/abc/3.jpg" nickname="tom"
                            handleLike={null} editUrl=""
                            motto="I Love You, But just like you!" comments={[]}
                            showMeta={false} handleComment={null}
                            handleShare={() => this.props.doSharePhoto(this.props.checkPhoto.id)}/>
            </div>
        );
    }
}

const mapState = (state) => ({
    checkPhoto: state.getIn(['SharedState', 'checkPhoto']),
    showPicInfo: state.getIn(['SharedState', 'showPicInfo']),
    uid: state.getIn(['LoginState', 'uid']),
    albums: state.getIn(['SharedState', 'sharedPhotoList'])
});

const mapDispatch = (dispatch) => ({
    toGetSharedPhotoList(id) {
        dispatch(actionCreator.getSharedPhotoList(id));
    },
    toCheckPhoto(id) {
        dispatch(actionCreator.toCheckPhoto(id))
    },
    closeCheckPhoto() {
        dispatch(actionCreator.toCloseCheckPhoto())
    }
});

export default connect(mapState, mapDispatch)(AlbumManager);