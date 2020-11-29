export enum Gender {
    Male= 'male',
    Female= 'female',
    Other= 'other'
}

export enum HealthCheckRating {
    "healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export type Discharge = {
    date: string,
    criteria: string
};

export type SickLeaveType = {
    startDate: string,
    endDate: string
};

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnoses['code']>;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    sickLeave?: SickLeaveType;
    employerName: string;
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string, 
    gender: string,
    occupation: string,
    entries: Array<Entry>
}

export interface Diagnoses {
    code: string,
    name: string,
    latin?: string,
}

export type NewPatientEntry = Omit<Patient, 'id'>; 
export type NonSensitivePatientData = Omit<Patient, 'ssn'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;