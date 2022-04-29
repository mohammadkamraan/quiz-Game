import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { rendering } from "../redux/actions/rendering.acion";
import { sendScore } from "../redux/actions/score.action";

const QuestionHandler = () => {

    const [qusetionIndex, setQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [clicked, setClicked] = useState(false)
    const [times, setTimes] = useState(0)

    const data = useSelector(state => state.getQuizData)

    const dispatch = useDispatch()

    const correctAnswer = data.data?.[qusetionIndex]?.correct_answer;
    const answers = data.data?.[qusetionIndex]?.answers;

    const answerIsCorrect = (choice) => choice === correctAnswer

    const gameIsOver = () => qusetionIndex === 9

    const timeLimitation = () => {
        let time = 60
        let test = setInterval(() => {
            let timer = time - 1
            time = timer
            setTimes(timer)
            clearInterval(10000)
        }, 1000);
    }
    console.log(times)
    useEffect(() => {
    }, [])


    const userChoiceAnAnswer = (choice) => {
        setClicked(true)
        setTimeout(() => {
            if (answerIsCorrect(choice)) {
                if (!gameIsOver()) {
                    setQuestionIndex(previousQuestionIndex => ++previousQuestionIndex)
                    setScore(previousScore => ++previousScore)
                } else {
                    dispatch(rendering('results'))
                    dispatch(sendScore(score + 1))
                }
            } else {
                if (!gameIsOver()) {
                    setQuestionIndex(previousQuestionIndex => ++previousQuestionIndex)
                } else {
                    dispatch(sendScore(score))
                    dispatch(rendering('results'))
                }
            }
            setClicked(false)
        }, 100);
        // setTimeout(() => {
        //     if (answerIsCorrect(choice) && !gameIsOver()) {
        //         setQuestionIndex(previousQuestionIndex => ++previousQuestionIndex)
        //         setScore(previousScore => previousScore + 1)
        //     } else if (!answerIsCorrect(choice) && !gameIsOver()) {
        //         setQuestionIndex(previousQuestionIndex => ++previousQuestionIndex)
        //     } else if (answerIsCorrect(choice) && qusetionIndex === 9) {
        //         dispatch(rendering('start'))
        //     } else {
        //         dispatch(rendering('start'))
        //     }
        //     setClicked(false)
        // }, 2000);
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