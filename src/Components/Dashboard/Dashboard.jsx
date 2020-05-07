import React from 'react';
import {pages} from '../../Data/AppElements';
import Sidebar from '../Sidebar/Sidebar';


class Dashboard extends React.Component {
    state = {
        currentPage: pages[0]
    }
    render() {
        return (            
            <Sidebar options={pages} selectedPage={this.state.currentPage} optionSelectedHandler={(page)=>this.setCurrentpage(page)}></Sidebar>                        
        );
    }
    setCurrentpage = (page) => {
        //updating state only if selected page is different
        if(page !== this.state.currentPage)
            this.setState({currentPage:page});
    }
}

export default Dashboard;