import React, { useEffect, useState } from 'react';
import { getWords } from './api/words';
import Rank from './pages/Rank';
import Practice from './pages/Practice';
import { WordsInterface } from './interfaces/words';
import Loader from "./components/Loader";

const App: React.FC = () => {
  const [words, setWords] = useState<WordsInterface[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [load, setLoad] = useState<Boolean>(false);

  const getWordsList =async () => {
    setLoad(true);
    
    // Get WordsList.
    const data = await getWords();
    setWords(data);

    // Reset to try again.
    setScore(null);
    setLoad(false);
  };

  useEffect(() => {
    getWordsList();
  }, []);

  // if load to get data.
  if(load) {
    return(
      <Loader />
    )
  };

  return (
    <div className='flex items-center flex-col min-h-screen'>
      <h1 className='bg-gray-400 text-green-700 text-3xl font-bold py-4 w-full h-fit text-center'>Words Test</h1>

      {/* if exist score redirect to Rank page else redirect to  */}
      {score? (
        <Rank score={score} tryAgain={() => getWordsList()} />
      ) : (
        <Practice words={words} setScore={setScore} />
      )}
    </div>
  );
}

export default App;
