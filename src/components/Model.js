import React from "react";
import { useGlobalContext } from "../context";

const Model = () => {
    const { isModelOpen, closeModel, correct, questions} = useGlobalContext();
    return (
    <div
        className={`${
        isModelOpen ? "model-container isOpen" : "model-container"
        }`}
    >
        <div className="model-content">
            <h2>Congrats!</h2>
            <p>
                You answered {((correct / questions.length)* 100).toFixed(0)}% of
                questions correctly
            </p>
            <button
            className="btn btn-success close-btn"
            style={{ width: "50%" }}
            onClick={closeModel}
            >
            Play Again
            </button>
        </div>  
    </div>
    );
};    

export default Model;