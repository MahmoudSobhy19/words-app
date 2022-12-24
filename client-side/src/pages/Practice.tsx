import { stringify } from 'querystring';
import React, { useState } from 'react';
import Question from '../components/Question';
import { WordsInterface } from '../interfaces/words';

interface PracticeInterface {
  words: WordsInterface[];
  setScore: (score: number) => void;
}

const Practice: React.FC<PracticeInterface> = ({ words, setScore }) => {
  const [questions, setQuestions] = useState<WordsInterface[]>(words);
  const [index, setIndex] = useState<number>(0);
  const [answerState, setAnswerState] = useState<boolean | null>(null);

  const checkAnswer = (answer: string) => {
    // add answer in questions state.
    const questionsList = [...questions];
    questionsList[index].answer = answer;
    setQuestions(questionsList);

    // check answer and add to current state.
    if(questions[index].pos === answer) {
      setAnswerState(true);
    } else {
      setAnswerState(false);
    }

    // set time to check last questions or no and if last set score.
    setTimeout(() => {
      // check if last questions and set score by filter with correct answer.
      if (questions.length === index + 1) {
        setScore(((questions.filter((question: WordsInterface) => question.pos === question.answer).length) / questions.length) * 100);
        return;
      }

      // update index to next questions and rest answer.
      setIndex(index + 1);
      setAnswerState(null);
    }, 1000);
  };

  return ( 
    <div className='flex items-center flex-col w-full'>
      <div className='w-full flex gap-2 justify-center items-center font-semibold text-2xl py-2 bg-gray-300'>
        <p>Progress :</p>
        <p className='mt-1 text-3xl'>{((index / questions.length) * 100).toString()}</p>
        <p className='mt-1'>%</p>
      </div>  

      <div className='h-10 my-4'>
        {answerState !== null? 
          // show result if correct or incorrect.
          answerState === true ? (
            <div className='bg-green-200 text-green-600 font-bold text-xl px-4 py-2 rounded'>Correct</div>
          ) : (
            <div className='bg-red-200 text-red-600 font-bold text-xl px-4 py-2 rounded'>Incorrect</div>
          ) : ("")
        }
      </div>

      <Question word={questions[index]?.word} checkAnswer={checkAnswer} />
    </div>
   );
}
 
export default Practice;