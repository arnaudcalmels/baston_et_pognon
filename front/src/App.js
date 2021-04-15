import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Character from './pages/Character';
import Scenario from './pages/Scenario';
import Game from './pages/Game';
import News from './pages/News';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import './App.css';


function App() {
  return (
    <div className="App">
      <Navigation />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/personnage" component={Character} />
        <Route exact path="/scenario" component={Scenario} />
        <Route exact path="/jeu" component={Game} />
        <Route exact path="/actualité" component={News} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
