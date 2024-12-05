import './Header.css'
import React from "react";
import'./Search.css';
import { login, logout, useAuthentication } from "../services/authService";

const Header = () => {
    const user = useAuthentication(); 
  
    return (
      <header>
        <section id = "headersection1">
          <div>
            <h1>header!</h1>
          </div>
          <div>
            {user ? (
              <>
                <p>Welcome, {user.displayName}</p>
                <button onClick={logout}>Sign Out</button>
              </>
            ) : (
              <button onClick={login}>Sign In with Google</button>
            )}
          </div>
        </section>
        <section id = "headersection2">
          <h1>Welcome to the Shallery!!</h1>
          <h2>Lets see if you got good taste</h2>
        </section>
        <section id ="headersection3">
          <nav>
            <span>All T.V</span>
            <span>Currently Watching</span>
            <span> Completed </span>
            <span> On Hold </span>
            <span>Dropped </span>
            <span> Search!</span>
          </nav>
        </section>
        
      </header>
    );
  };
export default Header;