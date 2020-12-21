/* eslint-disable @typescript-eslint/no-unsafe-member-access */     //Disables object protecctions to pass object properties from line 20-24
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */   //Disables failing to compile due to an any type being used
import { NewPatientEntry, Gender, Entry, HealthCheckRating, SickLeaveType } from '../src/types/types';

//Type Checkers for parsers

const isId = (id: any): id is String => {
    return typeof id === 'string' || id instanceof String;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: any): number is number => {
    return typeof number === 'number' || number instanceof Number;
};

const isArrayOfStrings = (parseArray: any): parseArray is string[] => {
    return Array.isArray(parseArray) && parseArray.every(item => typeof item === 'string');
};

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

//Parsers

const parseName = (name: any): string => {
    if(!name || !isString(name)){
        throw new Error('Name is missing or is not in correct format');
    }
    return name;
};

const parseID = (id: any): string =>{
    if(!id || !isString(id)) {
        throw new Error('ID is missing or is not in correct format');
    }
    return id;
};

const parseDate = (date: any): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error('DOB is missing or is not in correct format');
    }
    return date;
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

const parseDescription = (dsc: any): string => {
    if(!dsc || !isString(dsc)){
        throw new Error('Description is missing or is not in correct format');
    }
    return dsc;
};

const parseSpecialist = (specialist: any): string => {
    if(!specialist || !isString(specialist)){
        throw new Error('Specialist is missing or is not in correct format');
    }
    return specialist;
};

const parseSickleave = (sickLeave: any): SickLeaveType => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const startDate = sickLeave.startDate;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const endDate = sickLeave.endDate;
    
    if(!startDate || !isString(startDate)){
        throw new Error('Startdate is missing or of incorrect format');
    }

    if(!endDate || !isString(endDate)){
        throw new Error('Enddate is missing or of incorrect format');
    }

    return {
        startDate: startDate,
        endDate: endDate
    };
};

const parseHealthCheckRating = (checkRating: any): HealthCheckRating => {
    if(!checkRating || !isNumber(checkRating)){
        throw new Error('Health Check rating is not in correct format');
    }

    if(checkRating >= 0 || checkRating <=3){
        return checkRating;
    }else{
        throw new Error('Health Check rating is not in the range of types');
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDiagnosisCodes = (diagCodes : any): string[] | undefined => {
    if(!diagCodes) return [];
    if(!isArrayOfStrings(diagCodes)){
        throw new Error('Diagnosis is missing or is not in correct format');
    }
    return diagCodes;
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const parseEntries = (entries: any) => entries;


//functions for parsing data objects

const toID = (id: any): string => {
    if(!id || !isId(id)) throw new Error('ID does not exist or isn\'t associated with a patient');

    //Just a workaround to a text parser
    return parseDescription(id);
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        entries: parseEntries(object.entries)
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object: any): Entry => {
    if(!object.type || !isString(object.type)){
        throw new Error('Type does not exist or is not a string');
    }

    switch(object.type){
        case'HealthCheck':
            return {
                id: parseID(object.id),
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
        case'Hospital':
            return {
                id: parseID(object.id),
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: "Hospital",
                discharge: {
                    date: parseDate(object.discharge.date),
                    criteria: parseDescription(object.discharge.criteria)
                }
            };
        case'OccupationalHealthcare':
            if(!object.sickLeave){
                return {
                    id: parseID(object.id),
                    description: parseDescription(object.description),
                    date: parseDate(object.date),
                    specialist: parseSpecialist(object.specialist),
                    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                    type: "OccupationalHealthcare",
                    employerName: parseName(object.employerName)
                };
            }
            return {
                id: parseID(object.id),
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: "OccupationalHealthcare",
                sickLeave: parseSickleave(object.sickleave),
                employerName: parseName(object.employerName)
            };
        default:
            throw new Error('Type is not listed in db');
    }    
};

//exports

export {
    toNewEntry,
    toNewPatientEntry,
    toID
};