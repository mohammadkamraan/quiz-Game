import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { getQuizData } from "../redux/actions/getQuizData.action";
import { sendName } from "../redux/actions/name.action";
import { rendering } from "../redux/actions/rendering.acion";


const Start = () => {

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');

    const dispatch = useDispatch()

    const nameHandler = ({ target }) => {
        if (target.value.length <= 30) {
            setName(target.value);
            setNameErr('');
        } else {
            let err = 'your name must be less than 20 character';
            setNameErr(err);
        }
    }

    const startHandler = () => {
        dispatch(sendName(name))
        dispatch(rendering('quiz'))
    }

    //get quiz data
    useEffect(() => {
        dispatch(getQuizData())
    }, [])

    return (
        <>
            <header>
                <h1 className="font-bold text-center pt-10 text-amber-500 text-3xl md:text-6xl">Quiz Game</h1>
            </header>
            <>
                <h2 className="text-center text-amber-500 text-xl md:text-3xl mt-10">what is youre name?</h2>
                <div className="grid justify-items-stretch mt-6">
                    <input className={`justify-self-center rounded outline-none w-1/2 md:w-1/4 h-10 
                     border-2 ${nameErr ? 'border-red-500' : 'border-amber-500 '} bg-gradient-to-r
                      from-violet-500 to-fuchsia-500 shadow-md text-white px-2
                       placeholder:text-gray-300`}
                        placeholder="enter youre name" onChange={nameHandler} />
                    {
                        nameErr &&
                        <p className="text-center text-red-500 text-lg mt-5">{nameErr}</p>
                    }
                    <button className="justify-self-center rounded-full h-16 w-16 mt-8 bg-amber-500
                    hover:bg-teal-400 text-white text-lg md:text-2xl disabled:bg-gray-400"
                        disabled={!name || nameErr} onClick={startHandler}>
                        start
                    </button>
                </div>
            </>
        </>
    )
}

export default Start;