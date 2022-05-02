import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAnswerIsCorrect } from "../redux/actions/getQuizData.action";

const initialTime = 60;
const Question = (question) => {
    const dispatch = useDispatch();

    const [time, setTime] = useState(initialTime);
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        if (time === 0) {
            dispatch(setAnswerIsCorrect(false));
        }
        const timer = setTimeout(() => {
            setTime(time - 1);
        }, 1000)

        return () => clearTimeout(timer);
    }, [time])

    const correctAnswer = question.currentQuestion.correct_answer;

    const answerIsCorrect = (selectedAnswer) => selectedAnswer === correctAnswer;

    const answerSelected = (selectedAnswer) => {
        setClicked(true)
        setTimeout(() => {
            dispatch(setAnswerIsCorrect(answerIsCorrect(selectedAnswer)));
            setClicked(false)
        }, 2000);
    }

    console.log(correctAnswer);

    const renderAnswers = (answers) => {
        return answers.map((answer, index) => {
            return (
                <div key={index} className="flex justify-center">
                    <button className={` rounded-lg text-white h-10 w-2/3 my-3
                    ${!clicked && 'hover:bg-amber-500'} ${clicked && answerIsCorrect(answer)
                            ? 'bg-teal-500' : (!clicked ? 'bg-indigo-600' : 'bg-red-500')}`}
                        onClick={() => answerSelected(answer)}>{answer}</button>
                </div>
            )
        })
    }

    return (
        <div className="bg-white h-3/4 w-2/4 rounded-lg shadow-lg">
            <h2>Timer: {time}</h2>
            <h2 className="font-bold text-2xl text-center text-amber-500 mt-5">{question.currentQuestion.number}</h2>
            <h1 className="font-bold text-center mt-3 text-slate-800 text-xl">{question.currentQuestion.question}</h1>
            <ul>{renderAnswers(question.currentQuestion.answers)}</ul>
        </div>
    )
}

export default Question;
