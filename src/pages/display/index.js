import React from "react";
import {Button, Card, Empty} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom";


import {
    toCheckPhoto,
    toCloseCheckPhoto,
    toGetPhotoList,
    toChangeAlbumToPublic,
    toGetCommentsListByPid
} from "./store/actionCreate";
import NotData from "../../static/original.png";
import CheckPhoto from "../../components/CheckPhoto";

//使用div左浮产生图片紧贴的效果
class Display extends React.Component {

    //关闭照片详情窗口
    closeCheckBox = (e) => {
        e.stopPropagation();
        this.props.closeCheckPhoto();
    };

    //弹出照片详情窗口
    showCheckBox = (e, id) => {
        e.stopPropagation();
        this.props.doCheckPhoto(id);
    };

    //将照片的数据进行分组，即将图片放入到合适的div槽中
    adjustmentPicture = (value) => {
        let array = new Array(4);
        array[0] = [];
        array[1] = [];
        array[2] = [];
        array[3] = [];
        let i = 0;
        value.map(v => {
            array[i++ % 4].push({
                id: v.id,
                src: v.path,
                title: v.name === "" ? "没有标题" : v.name,
                description: v.description === "" ? "没有描述" : v.description
            });
        });
        return array;
    };

    //根据调整好的数据渲染图片
    renderPictureBord = (value) => {
        let i = 0;
        return value.map(pic =>
            <div style={{float: "left", width: 205}} key={i++}>
                {pic.map(p => (
                    <Card hoverable key={p.id} style={{width: 200, float: "left", margin: "10px 0 0 10px"}}
                          cover={<img src={p.src} alt="封面"/>} onClick={(e) => this.showCheckBox(e, p.id)}
                    >
                        <Card.Meta
                            title={p.title}
                            description={p.description}
                        />
                    </Card>
                ))}
            </div>
        )
    };

    componentWillMount() {
        if (!this.props.showAlbum) {
            console.log("albumShow:" + this.props.showAlbum + "=>doGetPhotoListByUid");
            this.props.doGetPhotoListByUid(this.props.uid);
        }
    }

    render() {
        const {psrc, comment} = this.props;
        return (
            <div onClick={this.closeCheckBox}>
                {psrc !== undefined ?
                    <div style={{width: 840, margin: "auto"}}>
                        {this.renderPictureBord(this.adjustmentPicture(psrc))}
                    </div>
                    :
                    <Empty
                        style={{marginTop: "25vh"}}
                        image={NotData}
                        description={<span>没有照片，上传一个吧</span>}
                    >
                        <Link to="/upload"><Button htmlType="button" type="primary" icon="upload">上传</Button></Link>
                    </Empty>
                }
                <CheckPhoto visible={this.props.showPicInfo} src={this.props.checkPhoto.src}
                            avatar="/abc/3.jpg" nickname="tom"
                            handleLike={null} editUrl="/edit"
                            motto="I Love You, But just like you!" comments={comment}
                            showMeta={true}
                            handleShare={() => this.props.doSharePhoto(this.props.checkPhoto.id)}/>

            </div>
        );
    }
}

const mapState = (state) => ({
    comment: state.getIn(['DisplayState', 'comment']),
    checkPhoto: state.getIn(['DisplayState', 'checkPhoto']),
    psrc: state.getIn(['DisplayState', 'psrc']),
    showPicInfo: state.getIn(['DisplayState', 'showPicInfo']),
    uid: state.getIn(['LoginState', 'uid']),
    showAlbum: state.getIn(['DisplayState', 'albumShow'])
});

const mapDispatch = (dispatch) => ({
    doSharePhoto(id) {
        dispatch(toChangeAlbumToPublic(id));
    },
    doCheckPhoto(id) {
        dispatch(toCheckPhoto(id));
        dispatch(toGetCommentsListByPid(id));
    },
    closeCheckPhoto() {
        dispatch(toCloseCheckPhoto());
    },
    doGetPhotoListByUid(uid) {
        dispatch(toGetPhotoList(uid));
    }
});

export default connect(mapState, mapDispatch)(Display);