import React from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "./Cart";
import SignIn from "./SignIn";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
function App() {

  const [{}, setUser] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log( "The auth user -> " , authUser);
      if(authUser){
        setUser({
          type: "SET_USER",
          user: authUser
        })
      }
      else{
        setUser({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
        <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/cart">
            <Header />
            <Cart />
          </Route>
          <Route path="/payment">
            <Header />
            
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
