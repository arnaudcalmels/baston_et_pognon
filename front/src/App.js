import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Characters from './containers/pages/Characters';
import Character from './containers/pages/Character';
import NewCharacter from './containers/pages/NewCharacter';
import Scenario from './pages/Scenario';
import Game from './pages/Game';
import News from './pages/News';
import Profile from './containers/pages/Profile';
import Modal from './components/Modal';
import Navigation from './containers/components/Navigation';
import Footer from './components/Footer';
import Register from './containers/components/Register';
import Login from './containers/components/Login';

import { closeModal } from './actions/auth';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ isRegisterModalOpen, isLoginModalOpen, closeModal }) => {
  return (
    <div className="App">
      <Navigation />

      <Modal isOpen={isRegisterModalOpen} title='Inscription' children={<Register />} closeModal={closeModal}/>
      <Modal isOpen={isLoginModalOpen} title='Connexion' children={<Login />} closeModal={closeModal}/>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/personnage" component={Characters} />
        <Route exact path="/personnage/nouveau" component={NewCharacter} />
        <Route exact path="/personnage/:id" component={Character} />
        <Route exact path="/scenario" component={Scenario} />
        <Route exact path="/jeu" component={Game} />
        <Route exact path="/actualité" component={News} />
        <Route exact path="/profil" component={Profile} />
      </Switch>

      <Footer />
      <ToastContainer autoClose={2000}/>
    </div>
  );
}

const mapStateToProps= (state) => ({
  isRegisterModalOpen: state.auth.isRegisterModalOpen,
  isLoginModalOpen: state.auth.isLoginModalOpen
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch(closeModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

