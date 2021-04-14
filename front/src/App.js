import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from '../src/pages/Home';
import Character from '../src/pages/Character';
import Scenario from '../src/pages/Scenario';
import Game from '../src/pages/Game';
import News from '../src/pages/News';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/personnage" component={Character} />
        <Route exact path="/scenario" component={Scenario} />
        <Route exact path="/jeu" component={Game} />
        <Route exact path="/actualité" component={News} />

      </Switch>
    </div>
  );
}

export default App;
