/* eslint-disable @typescript-eslint/no-unsafe-member-access */     //Disables object protecctions to pass object properties from line 20-24
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */   //Disables failing to compile due to an any type being used
import { NewPatientEntry, Gender } from '../src/types/types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const parseName = (name: any): string => {
    if(!name || !isString(name)){
        throw new Error('Name is not entered or is not a string');
    }
    return name;
};

const parseDOB = (dob: any): string => {
    if(!dob || !isString(dob) || !isDate(dob)){
        throw new Error('DOB is missing or is not in correct format');
    }
    return dob;
};

const parseSSN = (ssn: any): string => {
    if(!ssn || !isString(ssn)){
        throw new Error('SSN is missing or not in correct format');
    }
    return ssn;
};

const parseGender = (gender: any): Gender => {
    if(!gender || !isGender(gender)){
        throw new Error('Gender is missing or is not in correct format');
    }
    return gender;
};

const parseOccupation = (occ: any): string => {
    if(!occ || !isString(occ)){
        throw new Error('Occupation is missing or is not in correct format');
    }
    return occ;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const parseEntries = (entries: any) => entries;



const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDOB(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        entries: parseEntries(object.entries)
    };
};

export default toNewPatientEntry;