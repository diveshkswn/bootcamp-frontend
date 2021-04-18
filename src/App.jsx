import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BootcampsPage from './Pages/BootcampsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>

      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={BootcampsPage} />
        </Switch>
      </Router>
    </>

  );
}

export default App;
