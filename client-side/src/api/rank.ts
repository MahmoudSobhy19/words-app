import axios from "axios";

// Get the student's rank based on score .
export const getRank = async (score: number) => {
  try{
    const { data } = await axios.post('/rank', { score });
    return data;
  } catch(err){
    console.log(err);
  }
};