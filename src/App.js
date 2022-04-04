import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MyFile from './pages/MyFiles';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <MyFile />
                    </Route>
                    
                    <Route exact path="/dashboard/:test" render={(props) => (
                        // eslint-disable-next-line react/prop-types
                        <MyFile test={props.match.params.test} />
                    )} />

                </Switch>
            </div>
        </Router>
    );
}

export default App;
