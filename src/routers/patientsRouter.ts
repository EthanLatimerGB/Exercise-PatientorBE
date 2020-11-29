import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientService.getNonSensitivePatient();
    res.status(200).send(patients);
});

router.get('/:id', (req, res) => {
    const userID: string = req.params.id;
    const patient = patientService.getOneSensitivePatient(userID);
    if(typeof patient === 'undefined') res.status(404).send({ "error": "User not found"});
    
    res.status(200).send(patient);
});

router.post('/', (req, res) => {
    //parses all values and checks for incompatible types
    const newPatient = toNewPatientEntry(req.body);

    //performs changes to db
    const addedPatient = patientService.addPatinet(newPatient);
    res.json(addedPatient);
});

export default router;