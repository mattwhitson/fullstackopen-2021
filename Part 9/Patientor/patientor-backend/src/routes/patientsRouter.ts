import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../services/toNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getAllNoSSN());
});

router.get('/:id', (req, res) => {
    const result = patientService.findByID(req.params.id);
    if(result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);
    patientService.addPatient(newPatient);
    res.send(newPatient);
});

export default router;