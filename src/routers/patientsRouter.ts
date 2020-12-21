import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry, toID } from '../utils';
import { v4 as uuid } from 'uuid';

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

router.post('/:id/entries', (req, res) => {
    try{
        //parses ID otherwise throws error
        const userID = toID(req.params.id);

        //searches for patient and if there is a patient found with id, progresses to stage of adding new entries
        const foundPatient = patientService.getFullPatient(userID);

        if(!foundPatient || typeof foundPatient ==='undefined') {
            res.status(404).send({ "error": "User not Found with included in ID field" }); 
        }
        else{
            //parses entry and then updates the patient if sucessful
            const reqEntry = toNewEntry({...req.body, id: uuid()});
            const updatedPatient = patientService.addEntries(foundPatient, reqEntry);

            //inserts the updated patient to the array
            patientService.modifyPatient(userID, updatedPatient);
        
            //response if successful
            res.status(200).send(updatedPatient);
        }
    }
    catch(error){
        console.error(error);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res.status(400).json({ "error": error });
    }
});

export default router;