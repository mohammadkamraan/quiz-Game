import React, { useState } from "react";
import { useSelector } from "react-redux";
import SomethingWentWrong from "./errHandlers/SomethingWentWrong";

import Loading from "./Loading";
import QuestionHandler from "./QuestionsHandler";


const Quiz = () => {


    const { hasError, loading } = useSelector(state => state.getQuizData)

    const haveAnError = () => {
        if (hasError) {
            return <SomethingWentWrong />
        } else {
            return <QuestionHandler />
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            {loading ?
                <Loading />
                : haveAnError()
            }
        </div>
    )
}

export default Quiz;