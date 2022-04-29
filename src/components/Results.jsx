import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { rendering } from "../redux/actions/rendering.acion";

const Results = () => {

    const Score = useSelector(state => state.score)

    const name = useSelector(state => state.sendName)

    const dispatch = useDispatch()

    const gameMessage = () => {
        if (Score === 10) {
            return `congratulations ${name} you answered all the questions`
        } else {
            return `you couldn't answere all the questions ${name}`
        }
    }

    const restartGame = () => dispatch(rendering('start'))

    return (
        <div className="flex justify-center items-center h-screen font-quicksand">
            <div>
                <h1 className="text-3xl text-white">{gameMessage()}</h1>
                <h2 className="text-3xl text-white my-5">youre score is : {Score}/10</h2>
                <div className="flex justify-center">
                    <button className="bg-amber-500 h-12 w-1/2 text-white text-2xl
                     rounded-lg shadow-md"
                        onClick={restartGame}>
                        restart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Results;