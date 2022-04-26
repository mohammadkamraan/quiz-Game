import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { rendering } from "../redux/actions/rendering.acion";

const QuestionHandler = () => {

    const [qusetionIndex, setQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [clicked, setClicked] = useState(false)

    const data = useSelector(state => state.getQuizData)

    const dispatch = useDispatch()

    const correctAnswer = data.data?.[qusetionIndex]?.correct_answer;
    const answers = data.data?.[qusetionIndex]?.answers;

    const isCorrect = (choice) => {
        return choice === correctAnswer
    }


    const userChoiceAnAnswer = (choice) => {
        setClicked(true)
        setTimeout(() => {
            if (isCorrect(choice) && qusetionIndex < 9) {
                setQuestionIndex(previousQuestionIndex => previousQuestionIndex + 1)
                setScore(previousScore => previousScore + 1)
            } else if (!isCorrect(choice) && qusetionIndex < 9) {
                setQuestionIndex(previousQuestionIndex => previousQuestionIndex + 1)
            } else if (isCorrect(choice) && qusetionIndex === 9) {
                dispatch(rendering('start'))
            } else {
                dispatch(rendering('start'))
            }
            setClicked(false)
        }, 2000);
    }

    const renderAnswers = () => {
        return answers.map((item, i) => {
            return (
                <div className=" flex justify-center" key={i}>
                    <button onClick={() => userChoiceAnAnswer(item)}
                        className={` rounded-lg text-white h-10 w-2/3 my-3
                    ${!clicked && 'hover:bg-amber-500'} ${clicked && item === data.data?.[qusetionIndex].correct_answer
                                ? 'bg-teal-500' : (!clicked ? 'bg-indigo-600' : 'bg-red-500')}`}>
                        {item}
                    </button>
                </div>
            )
        })
    }

    console.log(data.data?.[qusetionIndex]?.correct_answer)

    return (
        <div className="bg-white h-3/4 w-2/4 rounded-lg shadow-lg">
            <h2 className="font-bold text-2xl text-center text-amber-500 mt-5">score : {score}</h2>
            <h2 className="font-bold text-2xl text-center text-amber-500 mt-5">
                question {qusetionIndex + 1}/10
            </h2>
            <h1 className="font-bold text-center mt-3 text-slate-800 text-xl">
                {data.data?.[qusetionIndex].question}
            </h1>
            {renderAnswers()}
        </div>
    )
}

export default QuestionHandler;