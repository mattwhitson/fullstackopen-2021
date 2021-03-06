export interface Diagnose {
    code: string, 
    name: string,
    latin?: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export enum Gender {
    Male = "male",
    Female = "female"
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn?: string,
    gender: string,
    occupation: string,
    entries: Entry[]
}
export type NewPatient = Omit<Patient, 'id'>;

export type PatientSecure = Omit<Patient, 'ssn' | 'entries' >

