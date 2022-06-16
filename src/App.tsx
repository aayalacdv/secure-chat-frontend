import { UserContextProvider, UserContext } from './context/UserContext';
import Room from './components/Room';
import Home from './components/Home';

import { useContext, useRef } from 'react';

function App() {


  const userNameRef = useRef<HTMLInputElement>(null) 
  const ctx = useContext(UserContext)



  const handleUserName = () => {
    const value = userNameRef.current!.value; 

    if(!value){
      return 
    }


    console.log(value)

    ctx.setUserName('hola')

  }


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
