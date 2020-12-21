import patients from '../../data/patients';
import diagnoses from '../../data/diagnoses';
import { v4 as uuid } from 'uuid';
import { Patient, Diagnoses, NonSensitivePatientData, NewPatientEntry, Entry } from '../types/types';

let typedPatients: Array<Patient> = patients;
const typedDiagnoses: Array<Diagnoses> = diagnoses;

const getDiagnoses = (): Array<Diagnoses> => {
    return typedDiagnoses;
};

const getPatients = (): Array<Patient> => {
    return typedPatients;
};

const getFullPatient = (id: string): Patient | undefined => {
    const foundPatient: Patient | undefined = typedPatients.find((patient) => patient.id === id);
    if(typeof foundPatient === "undefined") return undefined;
    return foundPatient;
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

const addEntries = (foundPatient: Patient, entry: Entry): Patient => {
    const currentEntries = foundPatient.entries; 
    currentEntries.push(entry);

    return {
        ...foundPatient,
        entries: currentEntries
    };
};

const modifyPatient = (id: string, changedPatient: Patient): Array<Patient> => {
    typedPatients = typedPatients.map((patient) => {
        if(patient.id === id) return changedPatient;
        return patient;
    });

    return typedPatients;
};

export default {
    getDiagnoses,
    getPatients,
    getNonSensitivePatient,
    getFullPatient,
    addPatinet,
    getOneSensitivePatient,
    addEntries,
    modifyPatient
};