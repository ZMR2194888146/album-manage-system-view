import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";

import {Provider} from "react-redux";
import store from "./store";
import AlbumRoute from './router';


class AlbumWrapper extends React.Component{
    render() {
        return(
            <Provider store={store}>
                <AlbumRoute/>
            </Provider>
        );
    }
}

ReactDOM.render(<AlbumWrapper />, document.getElementById('root'));
