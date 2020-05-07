import React from 'react';
import {pages} from '../../Data/AppElements';
import Sidebar from '../Sidebar/Sidebar';


class Dashboard extends React.Component {
    state = {
        currentPage: pages[0]
    }
    render() {
        return (
            <Sidebar options={pages} selectedPage={this.state.currentPage}></Sidebar>            
        );
    }
}

export default Dashboard;