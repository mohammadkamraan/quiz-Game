import React from "react";

const Loading = () => {
    return (
        <div className="flex items-center animate-bounce">
            <div className="w-8 h-8 bg-amber-500 rounded-full"></div>
            <div className="w-8 h-8 bg-teal-400 rounded-full mx-5"></div>
            <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
        </div>
    )
}

export default Loading;