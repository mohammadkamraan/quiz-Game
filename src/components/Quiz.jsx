import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setAnswerIsCorrect, setCurrentQuestionIndex } from "../redux/actions/getQuizData.action";
import { setScore } from "../redux/actions/score.action";
import { rendering } from "../redux/actions/rendering.acion";

import Loading from "./Loading";
import Question from "./Question";
import SomeThingWentWrong from './errHandlers/SomethingWentWrong';


const Quiz = () => {

    const { questions, loading, hasError } = useSelector(state => state.getQuizData)

    const score = useSelector(state => state.score);

    const answerIsCorrect = useSelector(state => state.answerIsCorrect);

    const currentQuestionIndex = useSelector(state => state.currentQuestionIndex);

    const dispatch = useDispatch();

    const goToNextQuestion = () => {
        dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
    }

    const addScore = (add = 1) => {
        dispatch(setScore(score + add));
    }

    const gameIsOver = () => currentQuestionIndex === questions.length

    const conditionalRendering = () => {
        if (hasError)
            return <SomeThingWentWrong />

        else if (loading)
            return <Loading />

        else if (gameIsOver())
            dispatch(rendering('results'))

        else
            return <Question
                key={currentQuestionIndex}
                currentQuestion={questions[currentQuestionIndex]}
                number={questions.length} />


    }

    useEffect(() => {
        if (answerIsCorrect === null) {
            return;
        }
        const score = answerIsCorrect ? 1 : 0;
        addScore(score);
        goToNextQuestion();
        dispatch(setAnswerIsCorrect(null));
    }, [answerIsCorrect]);

    return (
        <div className="flex justify-center items-center h-screen">
            {conditionalRendering()}
        </div>
    )
}

export default Quiz;