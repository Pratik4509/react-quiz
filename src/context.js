import React, { useState, useContext } from 'react';
import axios from 'axios';

const table = {
    sports: 21,
    gk:9,
    history: 23,
    politics: 24,
    computers: 18,
    cartoons: 32,
    anime: 31

}

const API_ENDPOINT = 'https://opentdb.com/api.php?';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [waiting, setWaiting] = useState(true);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [error, setError] = useState(false);
    const [quiz, setQuiz] = useState({
        amount: 10,
        category: 'sports',
        difficulty: 'easy'
    });
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [showAnswer, setShowAnswer] = useState('');


    const fetchQuestions = async(url) => {
        setLoading(true);
        setWaiting(false);
        const response = await axios(url).catch((err) => console.log(err));
        if (response) {
            const data = response.data.results;
            if (data.length > 0) {
                setQuestions(data);
                setWaiting(false);
                setLoading(false);
                setError(false);
            } else {
                setWaiting(true);
                setError(true);
            }
        } else {
            setWaiting(true);
        }
    };

    const nextQuestion = () => {
        setIndex((oldIndex) => {
            const index = oldIndex + 1;
            if (index > questions.length - 1) {
                openModel();
                return 0;
            } else {
                return index;
            }
        });
    };

    const openModel = () => {
        setIsModelOpen(true);
    }

    const checkAnswer = (value) => {
        if (value) {
            setCorrect((oldState) => oldState + 1);
        }
        const c = 0;
        const count = c+index;
        setShowAnswer(questions[count]['correct_answer']);

        // console.log(showAnswer)
        setTimeout(() => {
            nextQuestion();
            setShowAnswer('');
          }, 2000)
        
    };

    const closeModel = () => {
        setWaiting(true);
        setCorrect(0);
        setIsModelOpen(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuiz({...quiz, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { amount, category, difficulty } = quiz;
        const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
        fetchQuestions(url)
    }

    return ( 
        <AppContext.Provider value={{
            waiting,
            loading,
            questions,
            index,
            correct,
            error,
            isModelOpen,
            showAnswer,
            nextQuestion,
            checkAnswer,
            closeModel,
            quiz,
            handleChange,
            handleSubmit
        }}>
            {children}
        </AppContext.Provider>    
    )
};

export const useGlobalContext = () =>{
    return useContext(AppContext);
}
export {AppContext, AppProvider}