import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import { Layout, LocaleProvider } from '@douyinfe/semi-ui';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard'
import MyFile from './pages/MyFiles';

import './styles/App.scss'

function App() {

    const { Header, Sider, Content } = Layout

    return (
        <LocaleProvider locale={en_US}>
            <Router>
                <Layout>
                    <Header><Navbar /></Header>
                    <Layout>
                        <Sider><Sidebar /></Sider>
                        <Content>                    
                            <div className='content-margin'>
                                <div className='content-wrapper'>
                                    <Switch>
                                        <Route exact path="/myfiles">
                                            <MyFile />
                                        </Route>
                            
                                        <Route exact path="/dashboard">
                                            <Dashboard/>
                                        </Route>
                                    </Switch>
                                </div>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        </LocaleProvider>
    );
}

export default App;
