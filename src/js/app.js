import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import '../css/common.css';
import PcHome from './component/Home/pc_home';
import MediaQuery from 'react-responsive';


class Index extends React.Component {
    render() {
        return (
            <MediaQuery query='(min-device-width : 1224px)'>
                <BrowserRouter >
                    <Route path="/" component={PcHome}/>
                </BrowserRouter>
            </MediaQuery>
        )
    }
}

ReactDOM.render(
    <Index/>, document.getElementById('root'));