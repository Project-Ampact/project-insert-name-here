import { useState, useContext, createContext } from 'react';

const authContext = createContext();

// To access this, export AuthService
function useProvideAuth() {
    const [user, setUser] = useState(null);

    if (!user) {
      console.log("init use provide auth");
      // This part of code gets initialized at the beginning
      let username = document.cookie.split('=')[1] || null
      console.log(username)
      if (username) {
        setUser(document.cookie.split('=')[1])
      }
    }
  
    // after login request successful, will sign in the user
    const signin = (cb) => {
      setUser(user);
      cb();
    };
  
    // after registration successful, will set the user state
    const set = (user, cb) => {
      console.log("setting user as ", user);
      setUser(user);
      cb();
    };
  
    // after sign out button is pressed, will make user state to null
    const signout = cb => {
      setUser(null);
      // use history to redirect to landing page
      // clear cookie here
      document.cookie = 'username=; Max-Age=-99999999;';
    };
  
    return {
      user,
      signin,
      signout,
      set,
    };
  }

// Wraps the app in the auth context
export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

// Use this to access the functions in useProvideAuth
export function AuthService() {
  return useContext(authContext)
}
