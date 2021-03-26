import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { AccountContext } from "./Accounts";
import Pool from '../Cognito_Config'

export default (Home) => {
  const [status, setStatus] = useState(false);
  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session) => {
      console.log("Session:", session);
      setStatus(true);
    });
  }, []);

  

  const user = Pool.getCurrentUser();
  if (user) {
    return (
      <div>
        Home
        <Link to="/login"><button onClick={logout}>Logout</button></Link>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
};
