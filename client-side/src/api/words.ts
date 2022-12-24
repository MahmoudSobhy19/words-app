import axios from "axios";

// Get Words List from Server side.
export const getWords = async () => {
  try{
    const { data } = await axios.get('/words');
    return data;
  } catch(err){
    console.log(err);
  }
};