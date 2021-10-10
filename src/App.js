import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Step1 from './components/steps/Step1';
import Step2 from './components/steps/Step2';
import Step3 from './components/steps/Step3';
import Step4 from './components/steps/Step4';
import Finish from './components/steps/Finish';
import Home from './components/Home';
import ModalContext from './store/modal-context';
import { useState } from 'react';
import { useData } from './store/DataContext';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useData();

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        modalOpen: isModalOpen,
        openModal: openModalHandler,
        closeModal: closeModalHandler,
      }}
    >
      <Home />
      <Router>
        <Switch>
          <Route exact path='/' component={Step1} />
          {data.step1Finished ? (
            <Route path='/step2' component={Step2} />
          ) : (
            <Redirect to='/' />
          )}
          {data.step2Finished ? (
            <Route path='/step3' component={Step3} />
          ) : (
            <Redirect to='/' />
          )}
          {data.step3Finished ? (
            <Route path='/step4' component={Step4} />
          ) : (
            <Redirect to='/' />
          )}
          {data.isFinished ? (
            <Route path='/finish' component={Finish} />
          ) : (
            <Redirect to='/' />
          )}
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Router>
    </ModalContext.Provider>
  );
};

export default App;
