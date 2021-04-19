import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BootcampsPage from './Pages/BootcampsPage';
import Navbar from './components/Navbar';
import AddBootcamp from './Pages/AddBootcampPage';

function App() {
  return (
    <>

      <Navbar />
      <Router>
        <Switch>

          <Route exact path="/" component={BootcampsPage} />
          <Route exact path="/addBootcamp" component={AddBootcamp} />
        </Switch>
      </Router>
    </>

  );
}

export default App;
