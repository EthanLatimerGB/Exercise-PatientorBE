import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routers/diagnosesRouter';
import patientRouter from './routers/patientsRouter';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001; 

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
    res.status(200).send('pong');
});

app.use((request, _response, next) => {
    console.log(`Method: ${request.method}`);
    console.log(`Path: ${request.path}`);
    console.log(`Body: ${JSON.stringify(request.body)}`);
    console.log('--------');
    next();
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
