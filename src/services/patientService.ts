import patients from '../../data/patients';
import diagnoses from '../../data/diagnoses';
import { v4 as uuid } from 'uuid';
import { Patient, Diagnoses, NonSensitivePatientData, NewPatientEntry } from '../types/types';

const typedPatients: Array<Patient> = patients;
const typedDiagnoses: Array<Diagnoses> = diagnoses;

const getDiagnoses = (): Array<Diagnoses> => {
    return typedDiagnoses;
};

const getPatients = (): Array<Patient> => {
    return typedPatients;
};

const getNonSensitivePatient = (): NonSensitivePatientData [] => {
    return typedPatients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getOneSensitivePatient = (id: string): NonSensitivePatientData | undefined => {
    const newPatients = typedPatients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));

    const foundPatient: NonSensitivePatientData | undefined = newPatients.find((e) => e.id === id);
    if(!foundPatient){
        return undefined;
    }
    return foundPatient;
};

const addPatinet = (object: NewPatientEntry): Patient => {
    const id: string = uuid();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatient: Patient = {
        ...object,
        id
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getDiagnoses,
    getPatients,
    getNonSensitivePatient,
    addPatinet,
    getOneSensitivePatient
};