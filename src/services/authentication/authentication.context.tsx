import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { Alert } from 'react-native';
import { auth } from '../../../firebaseConfig';

type authenticationContextType = {
  authUser: User | undefined;
  isLoadingAuth: boolean;
  login: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  logOut: () => void;
  error: any;
};

const authenticationContext = createContext<
  authenticationContextType | undefined
>(undefined);

function useAuthenticationContext() {
  const context = useContext(authenticationContext);
  if (context === undefined) {
    throw new Error(
      'useAuthenticationContex must be used within a AuthenticationProvide',
    );
  }
  return context;
}

function AuthenticationProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [authUser, setAuthUser] = useState<User | undefined>(
    auth.currentUser ? auth.currentUser : undefined,
  );
  const [isLoadingAuth, setisLoadingAuth] = useState(false);
  const [error, setError] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthUser(user);
    } else {
      setAuthUser(undefined);
    }
  });
  const signUp = async (email: string, password: string) => {
    setisLoadingAuth(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      setAuthUser(user);
      setisLoadingAuth(false);
      setError(null);
    } catch (error: any) {
      setisLoadingAuth(false);
      setError(error.toString());
    }
  };
  const login = async (email: string, password: string) => {
    setisLoadingAuth(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      setAuthUser(user);
      setisLoadingAuth(false);
      setError(null);
    } catch (error: any) {
      setisLoadingAuth(false);
      setError(error.toString());
    }
  };

  const logOut = async () => {
    await signOut(auth);
    Alert.alert('Successfully signed out');
    setAuthUser(undefined);
    setError(null);
  };

  return (
    <authenticationContext.Provider
      value={{
        authUser,
        isLoadingAuth,
        login,
        signUp,
        logOut,
        error,
      }}
    >
      {children}
    </authenticationContext.Provider>
  );
}
export { AuthenticationProvider, useAuthenticationContext };
