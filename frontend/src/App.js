import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from './components/Home';
import Header from "./components/Header/index"
import { Event } from './components/Admin';

function App() {
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
                    <Route path="/admin">
                        <Event />
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;
