import React, { useEffect, useState } from 'react';
import { Button } from './Button';

interface QuestionInterface {
  word: string;
  checkAnswer: (answer: string) => void;
}

const Question: React.FC <QuestionInterface> = ({ word, checkAnswer }) => {
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, [load]);

  return ( 
    <div className='flex flex-col items-center gap-6'>
      <div className='flex items-center gap-2 text-xl'>
        <p className='font-semibold text-gray-600'>Word is :</p>
        <h2 className=' font-bold text-3xl text-gray-700'>{word}</h2>
      </div>

      <div>
        <Button 
          onClick={() => {
            setLoad(true);
            checkAnswer("noun");
          }} 
          disabled={load}
        >
          noun
        </Button>

        <Button 
          onClick={() => {
            setLoad(true);
            checkAnswer("adverb");
          }} 
          disabled={load}
        >
          adverb
        </Button>

        <Button 
          onClick={() => {
            setLoad(true);
            checkAnswer("adjective");
          }} 
          disabled={load}
        >
          adjective
        </Button>

        <Button 
          onClick={() => {
            setLoad(true);
            checkAnswer("verb");
          }} 
          disabled={load}
        >
          verb
        </Button>
      </div>
    </div>
  );
}
 
export default Question;