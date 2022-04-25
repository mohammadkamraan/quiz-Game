import React, { useEffect } from "react";

import { useSelector } from 'react-redux';

//import components
import Start from "./components/Start";
import Quiz from "./components/Quiz";



const App = () => {

  const component = useSelector(state => state.rendering)


  const conditionalRendering = () => {
    switch (component) {
      case 'start':
        return <Start />
      case 'quiz':
        return <Quiz />
      default:
        console.log('there is no component')
    }
  }


  return (
    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 font-quicksand h-screen w-full">
      {conditionalRendering()}
    </div>
  );
}

export default App;
