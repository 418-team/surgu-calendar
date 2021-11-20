import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import ruLocale from "moment/locale/ru"

import Home from './components/Home';
import Header from "./components/Header/index"
import { Event, Admin, NewEvent, NewGroup, Groups, Group, Tags, Tag } from './components/Admin';
import moment from 'moment';
import axios from 'axios';


function App() {
    axios.defaults.baseURL = 'http://94.41.65.26';
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.access_token
    };
    moment.locale("ru", [ruLocale])
  return (
    <div className="App">
      <header className="App-header">
      </header>
        <Router>
            <div>
                <Header/>
                <div style={{ padding: "40px 100px 0px" }}>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route path={"/admin/tags"} component={Tags}/>

                    <Route path="/admin/group/:id" component={Group}/>

                    <Route path="/admin/group" component={Groups}/>

                    <Route path="/admin/addgroup" component={NewGroup}/>

                    <Route path="/admin/addevent" component={NewEvent}/>

                    <Route path="/admin/:id" component={Event}/>

                    <Route path="/admin">
                        <Admin />
                    </Route>
                </Switch>
                </div>
            </div>
        </Router>
    </div>
  );
}

export default App;
