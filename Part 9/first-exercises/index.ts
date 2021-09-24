import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { parseArgs } from './bmiCalculator';
import { parseArguments } from './exerciseCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('hello world')
})

app.get('/bmi', (_req, res) => {
    const weight = Number(_req.query.weight);
    const height = Number(_req.query.height);
    try {
        if(!height || !weight) throw new Error("Missing/Incorrect parameter(s)");

        parseArgs(height, weight);
        const result = bmiCalculator(weight, height);

        res.send({
            weight: weight,
            height: height,
            bmi: result
        });             // eslint-disable-next-line
    } catch (e) {       // eslint-disable-next-line
        res.send({error: e.message});
    }
});

app.post('/calculator', (req, res) => {
    try {
        console.log(req.body)
        if(!req.body) throw new Error("Missing request body")
        const days = parseArguments(req.body.body)
        const result = exerciseCalculator(days)

        res.send({ result })
    } catch(e) {
        res.send({ error: e.message})
    }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});