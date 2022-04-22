import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rendering } from "../redux/actions/rendering.acion";


const Quiz = () => {

    const [number, setNumber] = useState(0)
    const [score, setScore] = useState(0)
    const [clicked, setClicked] = useState(false)

    const data = useSelector(state => state.getQuizData)

    const dispatch = useDispatch()

    const userChoiceAnAnswer = (choice) => {
        setClicked(true)
        setTimeout(() => {
            if (choice === data.data?.[number].correct_answer && number < 9) {
                setNumber(preve => preve + 1)
                setScore(preve => preve + 1)
                setClicked(false)
            } else if (choice === data.data?.[number].correct_answer && number === 9) {
                dispatch(rendering('start'))
            }
            else {
                dispatch(rendering('start'))
            }
        }, 4000);
    }

    const renderAnswers = () => {
        return data.data?.[number].answers.map((item, i) => {
            return (
                <div className=" flex justify-center" key={i}>
                    <button onClick={() => userChoiceAnAnswer(item)}
                        className={` rounded-lg text-white h-10 w-2/3 my-3
                    ${!clicked && 'hover:bg-amber-500'} ${clicked && item === data.data?.[number].correct_answer
                                ? 'bg-teal-500' : (!clicked ? 'bg-indigo-600' : 'bg-red-500')}`}>
                        {item}
                    </button>
                </div>
            )
        })
    }

    console.log(data.data?.[number].correct_answer)

    return (
        <div className="flex justify-center items-center h-screen">
            {data.data?.loading ?
                <div className="flex items-center animate-bounce">
                    <div className="w-8 h-8 bg-amber-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-teal-400 rounded-full mx-5"></div>
                    <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
                </div>
                : <div className="bg-white h-3/4 w-2/4 rounded-lg shadow-lg">
                    <h2 className="font-bold text-2xl text-center text-amber-500 mt-5">score : {score}</h2>
                    <h2 className="font-bold text-2xl text-center text-amber-500 mt-5">
                        question {number + 1}/10
                    </h2>
                    <h1 className="font-bold text-center mt-3 text-slate-800 text-xl">
                        {data.data?.[number].question}
                    </h1>
                    {renderAnswers()}
                </div>
            }

        </div>
    )
}

export default Quiz;