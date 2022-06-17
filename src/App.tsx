import { UserContextProvider, UserContext } from './context/UserContext';
import Room from './components/Room';
import Home from './components/Home';

import { useContext, useEffect, useRef } from 'react';
import { generateRSAKeys } from './rsaUtils/basic-RSA';

function App() {


  return (
    <>
      <UserContextProvider>
        <Home/>
        <Room/>
      </UserContextProvider>
    </>
  );
}

export default App;
