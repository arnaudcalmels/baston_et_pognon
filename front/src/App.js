import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './pages/Home';
import Character from './pages/Character';
import Scenario from './pages/Scenario';
import Game from './pages/Game';
import News from './pages/News';
import Profile from './containers/pages/Profile';
import Modal from './containers/components/Modal';
import Navigation from './containers/components/Navigation';
import Footer from './components/Footer';
import Register from './containers/components/Register';
import Login from './containers/components/Login';

import './App.css';

const App = ({ isRegisterModalOpen, isLoginModalOpen }) => {
  return (
    <div className="App">
      <Navigation />

      <Modal isOpen={isRegisterModalOpen} title='Inscription' children={<Register />}/>
      <Modal isOpen={isLoginModalOpen} title='Connexion' children={<Login />}/>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/personnage" component={Character} />
        <Route exact path="/scenario" component={Scenario} />
        <Route exact path="/jeu" component={Game} />
        <Route exact path="/actualité" component={News} />
        <Route exact path="/profil" component={Profile} />
      </Switch>

      <Footer />
    </div>
  );
}

const mapStateToProps= (state) => ({
  isRegisterModalOpen: state.auth.isRegisterModalOpen,
  isLoginModalOpen: state.auth.isLoginModalOpen
});


export default connect(mapStateToProps)(App);

