import React from 'react';
import QuizForm from './components/QuizForm';
import Loading from './components/Loading';
import Model from './components/Model';
import { useGlobalContext } from './context';

const App = () => {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
    showAnswer
  } = useGlobalContext();

  if(waiting) {
    return <QuizForm/>
  }

  if(loading){
    return (
      <Loading />
    )
  }

const{ question, incorrect_answers, correct_answer} = questions[index];
let answers =[...incorrect_answers];
const tempIndex = Math.floor(Math.random() * 4);

if(tempIndex === 3){
  answers.push(correct_answer)
} else{
 answers.push(answers[tempIndex]);
 answers[tempIndex] = correct_answer
}

  return (
    <main>
      <Model/>
      <section className="quiz">
        <div className="info">
          <p>Correct Answer: {correct}/{index}</p>
          <p>Total Questions: {questions.length}</p>
        </div>
        <article className="container">
          <h2 className="text-center" dangerouslySetInnerHTML={{__html: question}}></h2>
          <div>
            {answers.map((answer, index) => {
              return (
                <>
                  <button
                    key={index}
                    style={{width: "60%", textAlign: "center"}}
                    className="btn btn-primary answer-btn"
                    onClick={() => checkAnswer(correct_answer === answer)}
                    dangerouslySetInnerHTML={{__html: answer}}
                  />
                </>
              )
            })}
          </div>
        </article>
        <p className={`${
        showAnswer ? "showAnswer" : "dontShowAnswer"
        }`}>Correct Answer: <span>{showAnswer}</span></p>
        <button className="btn btn-warning next-question"
          style={{ marginRight: "1rem"}}
          onClick={nextQuestion}>
            Next Question
          </button>
      </section>
    </main>
  );
};
export default App;

