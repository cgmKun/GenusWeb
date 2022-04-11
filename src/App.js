import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";

import MyFile from './pages/MyFiles';
import SideBar from './components/Sidebar';
import Navbar from './components/Navbar';

import './styles/General.scss'

function App() {
    return (
        <Router>
            <div className='background'>
                <Navbar />
                <div className="flex" >
                    <SideBar />
                    <div className="content">
                        <MyFile />
                    </div>
                </div>
            </div>


            {/*<div className="App">
                <Switch>
                    <Route exact path="/">
                        
                        <MyFile />
                    </Route>
                    
                    <Route exact path="/dashboard/:test" render={(props) => (
                        // eslint-disable-next-line react/prop-types
                        <MyFile test={props.match.params.test} />
                    )} />

                </Switch>
                    </div> */}
        </Router>
    );
}

export default App;
