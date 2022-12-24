import React, { useEffect, useState } from 'react';
import { getRank } from '../api/rank';
import { Button } from '../components/Button';
import Loader from '../components/Loader';

interface RankInterface {
  score: number;
  tryAgain: () => void;
}

const Rank: React.FC<RankInterface> = ({ score, tryAgain }) => {
  const [rank, setRank] = useState<number | null>(null);

  const [load, setLoad] = useState<Boolean>(false);

  const handelGetRank =async () => {
    setLoad(true);
    // Get Rank by score.
    const data = await getRank(score);
    setRank(data);
    setLoad(false);
  };

  useEffect(() => {
    handelGetRank();
  }, []);

  // if load to get data.
  if(load) {
    return(
      <Loader />
    )
  };
  
  return ( 
    <div className='flex flex-col justify-center items-center gap-4'>
      <div className='flex flex-col gap-4 items-center text-2xl font-semibold mt-6 bg-gray-200 px-20 py-6 rounded'>
        <p className='text-green-600'>Congratulations !</p>
        <div className='flex items-center gap-2'>
          <p className='text-gray-600'>Your Rank is : </p>
          <h3 className='mt-1'>{rank}</h3>
        </div>

        <Button 
          className='text-lg mt-4'
          onClick={() => tryAgain()}
        >
          Try Again
        </Button>
      </div> 
    </div>
   );
}
 
export default Rank;