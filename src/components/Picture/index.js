import React from "react";

class Picture extends React.Component{

    render() {
        return(
            <img src={this.props.src} />
        );
    }
}

export default Picture;