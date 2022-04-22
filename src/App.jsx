import React, { useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';

import { getQuizData } from "./redux/actions/getQuizData.action";
//import components
import Start from "./components/Start";
import Quiz from "./components/Quiz";



const App = () => {

  const component = useSelector(state => state.rendering)

  const dispatch = useDispatch()

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

  //get quiz data
  useEffect(() => {
    dispatch(getQuizData())
  }, [])

  return (
    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 font-quicksand h-screen w-full">
      {conditionalRendering()}
    </div>
  );
}

export default App;
