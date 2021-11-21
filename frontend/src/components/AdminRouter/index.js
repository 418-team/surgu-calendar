import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Header from '../Header';
import Home from '../Home';
import { Admin, Event, Group, Groups, NewEvent, NewGroup, Tags } from '../Admin';

function Navigation() {
    return null;
}

function AdminRouter() {
    return (
        <Router>
            <div>
                <Header/>
                <div style={{padding: '40px 100px 0px', backgroundColor: "rgb(238, 240, 242)"}}>
                    <Switch>
                        <Route exact path="/"><Home/></Route>

                        <Route path={'/admin/tags'} component={Tags}/>

                        <Route path="/admin/group/:id" component={Group}/>

                        <Route path="/admin/group" component={Groups}/>

                        <Route path="/admin/addgroup" component={NewGroup}/>

                        <Route path="/admin/addevent" component={NewEvent}/>

                        <Route path="/admin/:id" component={Event}/>

                        <Route path="/admin">
                            <Admin/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default AdminRouter;