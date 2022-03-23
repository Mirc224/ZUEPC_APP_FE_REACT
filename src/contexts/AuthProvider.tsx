import { useState } from "react";
import { AuthContext } from "./AuthContext";

type Props = {
    children: any
}

const AuthContextProvider = ({children}: Props) => {
  const [auth, setAuth] = useState({});
  return (
      <AuthContext.Provider value={{
        auth,
        setAuth}}>
        {children}
      </AuthContext.Provider>
  );
}

export default AuthContextProvider;