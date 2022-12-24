import express, { Express, Request, Response} from 'express';
import cors from 'cors';
import testData from './TestData.json';

const app: Express = express();
const port = 8080;

app.use(express.json());
app.use(cors());


interface Words {
  id: number;
  word: string;
  pos: string;
}

// Get list of 10 words random at least 1 adjective, 1 adverb, 1 noun, 1 verb.
app.get('/words', (req: Request, res: Response) => {
  try {
    let words: Words[] = [];
  
    do {
      // list 10 words random.
      words = testData.wordList.sort(() => Math.random() - Math.random()).slice(0, 10);
    } while (
      // check list is contain at least 1 adjective, 1 adverb, 1 noun, 1 verb.
      words.filter((words: Words) => words.pos === 'adjective').length === 0 ||
      words.filter((words: Words) => words.pos === 'adverb').length === 0 ||
      words.filter((words: Words) => words.pos === 'noun').length === 0 ||
      words.filter((words: Words) => words.pos === 'verb').length === 0 
    )
  
    res.status(200).send(words);
  } catch(err) {
    res.status(500).send("Internal Server Error");
  }
});

// takes score in req body and res with rank rounded to nearest hundredth.
app.post('/rank', (req: Request, res: Response) => {
  try {
    const score = req.body.score;
    // get lowest score fron scoresList.
    const scoreFromList = testData.scoresList.filter((el: number) => el < score);
    // calculate Rank by (number of score / number of scoresList) * 100.
    const calcRank = (scoreFromList.length / testData.scoresList.length) * 100;
    // rounded rank percentage to two numbers.
    const rank = Number(calcRank.toFixed(2));

    res.status(200).json(rank);
  } catch(err) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});