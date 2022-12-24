"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const TestData_json_1 = __importDefault(require("./TestData.json"));
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Get list of 10 words random at least 1 adjective, 1 adverb, 1 noun, 1 verb.
app.get('/words', (req, res) => {
    try {
        let words = [];
        do {
            // list 10 words random.
            words = TestData_json_1.default.wordList.sort(() => Math.random() - Math.random()).slice(0, 10);
        } while (
        // check list is contain at least 1 adjective, 1 adverb, 1 noun, 1 verb.
        words.filter((words) => words.pos === 'adjective').length === 0 ||
            words.filter((words) => words.pos === 'adverb').length === 0 ||
            words.filter((words) => words.pos === 'noun').length === 0 ||
            words.filter((words) => words.pos === 'verb').length === 0);
        res.status(200).send(words);
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
// takes score in req body and res with rank rounded to nearest hundredth.
app.get('/rank', (req, res) => {
    try {
        const score = req.body.score;
        // get lowest score fron scoresList.
        const scoreFromList = TestData_json_1.default.scoresList.filter((el) => el < score);
        // calculate Rank by (number of score / number of scoresList) * 100.
        const calcRank = (scoreFromList.length / TestData_json_1.default.scoresList.length) * 100;
        // rounded rank percentage to two numbers.
        const rank = Number(calcRank.toFixed(2));
        res.status(200).json(rank);
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map