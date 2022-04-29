import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Loading from "./Loading";
import Question from "./Question";
import {setAnswerIsCorrect, setCurrentQuestionIndex} from "../redux/actions/getQuizData.action";
import {setScore} from "../redux/actions/score.action";
import {rendering} from "../redux/actions/rendering.acion";

const Quiz = () => {
    const {questions} = useSelector(state => state.getQuizData)

    const score = useSelector(state => state.score);
    const dispatch = useDispatch();
    const currentQuestionIndex = useSelector(state => state.currentQuestionIndex);
    const answerIsCorrect = useSelector(state => state.answerIsCorrect);
    const [currentQuestion, setCurrentQuestion] = useState(questions[currentQuestionIndex]);

    useEffect(() => {
        setCurrentQuestion(questions[currentQuestionIndex])
    }, [currentQuestionIndex])

    useEffect(() => {
        if(answerIsCorrect === null) {
            return;
        }
        const score = answerIsCorrect ? 1 : 0;

        addScore(score);
        goToNextQuestion();
        dispatch(setAnswerIsCorrect(null));
    }, [answerIsCorrect]);

    const goToNextQuestion = () => {
        dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
    }

    const addScore = (add = 1) => {
        dispatch(setScore(score + add));
    }

    const gameIsOver = () => {
        return currentQuestionIndex === questions.length
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div>{score}</div>
            {
                gameIsOver() ?
                    dispatch(rendering('results'))
                    : <Question
                        key={currentQuestionIndex}

                        correctAnswer={currentQuestion.correct_answer}
                        body={currentQuestion.question}
                        answers={currentQuestion.answers}
                        number={currentQuestion.number}
                        index={currentQuestionIndex}
                    />
            }
        </div>
    )
}

export default Quiz;