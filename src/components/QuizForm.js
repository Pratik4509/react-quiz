import React from 'react';
import { useGlobalContext } from '../context';
const QuizForm = () => {
    const {quiz, handleChange, handleSubmit, error} = useGlobalContext();
    return (
    <section className="quiz quiz-small">
        <form>
            <h2 style={{marginBottom: "2rem"}}>Let's Start Quiz</h2>
            <div className="mb-3">
                <label className="form-label" htmlFor="noofQuestiosn">Number of Questions </label>
                <input
                    type="number"
                    name="amount"
                    className="form-control"
                    value={quiz.amount}
                    onChange={handleChange}
                    min={1}
                    max={50}
                />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="category">Category </label>
                <select
                    name="category"
                    id="category"
                    className="form-select"
                    value={quiz.category}
                    onChange={handleChange}
                >    
                <option value="sports">Sports</option>
                <option value="gk">General Knowledge</option>
                <option value="history">History</option>
                <option value="politics">Politics</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="difficuty">Difficuty </label>
                <select
                    name="difficuty"
                    id="difficuty"
                    className="form-select"
                    value={quiz.difficuty}
                    onChange={handleChange}
                >    
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                </select>
            </div>
            {error && (
                <p className="error">
                    Can't Generate Questions
                </p>
            )}
            <button 
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary start-btn"
            >
                Start
            </button>
        </form>
    </section>
    );
};

export default QuizForm;


