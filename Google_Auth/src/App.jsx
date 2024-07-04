import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './redux/store';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
//11789195567-6daqc9hahjrt4h521uog2enarkbef2lc.apps.googleusercontent.com
// clint secret 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

function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="11789195567-6daqc9hahjrt4h521uog2enarkbef2lc.apps.googleusercontent.com">
        <Router>
          <div className="App">
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
            </Routes>
          </div>
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;