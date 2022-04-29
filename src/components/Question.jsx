import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setAnswerIsCorrect} from "../redux/actions/getQuizData.action";

const initialTime = 60;
const Question = (question) => {
    const dispatch = useDispatch();

    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if(time === 0) {
            dispatch(setAnswerIsCorrect(false));
        }

        setTimeout(() => {
            setTime(time - 1);
        }, 1000)
    }, [time])

    const answerIsCorrect = (selectedAnswer) => {
        return selectedAnswer === question.correctAnswer;
    }

    const answerSelected = (selectedAnswer) => {
        dispatch(setAnswerIsCorrect(answerIsCorrect(selectedAnswer)));
    }

    const renderAnswers = (answers) => {
        return answers.map((answer, index) => {
            const classes = answerIsCorrect(answer) ? 'border border-red-300' : '';
            return <button className={classes} onClick={() => answerSelected(answer)} key={index}>{answer}</button>
        })
    }

    return (
        <div className="bg-white h-3/4 w-2/4 rounded-lg shadow-lg">
            <h2>Timer: {time}</h2>
            <h2 className="font-bold text-2xl text-center text-amber-500 mt-5">{question.number}</h2>
            <h1 className="font-bold text-center mt-3 text-slate-800 text-xl">{question.body}</h1>
            <ul>{renderAnswers(question.answers)}</ul>
        </div>
    )
}

export default Question;
