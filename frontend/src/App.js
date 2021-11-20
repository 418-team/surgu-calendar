import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import ruLocale from "moment/locale/ru"

import Home from './components/Home';
import Header from "./components/Header/index"
import { Event, Admin } from './components/Admin';
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
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route path="/admin/:id" component={Event}/>

                    <Route path="/admin">
                        <Admin />
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;
