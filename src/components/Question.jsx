import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAnswerIsCorrect } from "../redux/actions/getQuizData.action";

const initialTime = 60;
const Question = (question) => {

    const [time, setTime] = useState(initialTime);
    const [clicked, setClicked] = useState(false)


    const dispatch = useDispatch();


    const correctAnswer = question.currentQuestion.correct_answer;
    const answers = question.currentQuestion.answers;

    const answerIsCorrect = (selectedAnswer) => selectedAnswer === correctAnswer;

    const answerSelected = (selectedAnswer) => {
        setClicked(true)
        setTimeout(() => {
            dispatch(setAnswerIsCorrect(answerIsCorrect(selectedAnswer)));
            setClicked(false)
        }, 2000);
    }

    const calculateTimeFraction = () => {
        return time / initialTime
    }

    const setCircleDasharray = () => {
        return `${(
            calculateTimeFraction() * 283
        ).toFixed(0)} 283`;
    }

    const siwtchRingColor = () => {
        if (time >= 40)
            return 'stroke-green-500'
        else if (time >= 30)
            return 'stroke-teal-300'
        else if (time >= 10)
            return 'stroke-amber-300'
        else if (time <= 10)
            return 'stroke-red-500'
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(time - 1);
        }, 1000)

        if (time === 0)
            dispatch(setAnswerIsCorrect(false));

        else if (clicked)
            clearTimeout(timer)

        return () => clearTimeout(timer);

    }, [time])

    const answersClass = (answer) => {
        if (clicked && answerIsCorrect(answer))
            return 'bg-teal-500'
        else {
            if (!clicked)
                return 'bg-indigo-600'
            else
                return 'bg-red-500'
        }

    }

    const renderAnswers = () => {
        return answers.map((answer, index) => {
            return (
                <div key={index} className="flex justify-center">
                    <button className={` rounded-lg text-white h-10 w-2/3 my-3
                    ${!clicked && 'hover:bg-amber-500'} ${answersClass(answer)}`}
                        onClick={() => answerSelected(answer)}
                        disabled={clicked}>{answer}</button>
                </div>
            )
        })
    }

    return (
        <div className="bg-white h-[90%] md:h-3/4 w-5/6 md:w-1/2 rounded-lg shadow-lg">
            <h2 className="font-bold text-2xl text-center text-amber-500 mt-5">
                {question.currentQuestion.number}/{question.number}
            </h2>
            <div className="flex justify-center mt-3">
                <div className="relative h-16 w-16">
                    <svg className="transform -scale-x-100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g className="stroke-0 fill-[none]">
                            <circle className="stroke-[7px] stroke-gray-500" cx="50" cy="50" r="45" />
                            <path
                                id="base-timer-path-remaining"
                                strokeDasharray={setCircleDasharray()}
                                className={`stroke-[7px] [stroke-linecap:round] transform rotate-90 origin-center transition-all duration-1000 ${siwtchRingColor()} `}
                                d="
                            M 50, 50
                            m -45, 0
                            a 45,45 0 1,0 90,0
                            a 45,45 0 1,0 -90,0
                            "
                            ></path>
                        </g>
                    </svg>
                    <span className="absolute w-16 h-16 top-0 flex items-center justify-center text-2xl">
                        {time}
                    </span>
                </div>
            </div>
            {/* <h2 className="text-center text-xl mt-3"></h2> */}
            <h1 className="font-bold text-center mt-3 text-slate-800 text-xl">{question.currentQuestion.question}</h1>
            <>{renderAnswers()}</>
        </div >
    )
}

export default Question;
