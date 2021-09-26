import { NewPatient, Patient } from "../types";
import { PatientSecure } from "../types";
import patientData from '../../data/patients.json';
import {v1 as uuid} from 'uuid';


const patients: Array<Patient> = patientData

const getAll = (): Array<Patient> => {
    return patients;
};


const getAllNoSSN = (): PatientSecure [] => {
    return patients.map(patient => ({
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation
        })
    );
};

const findByID = (id: string): PatientSecure | undefined => {
    return patients.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatient): PatientSecure => {
    const newPatient = {
        id: uuid(),
        ...patient,
        ssn: String(patient.ssn)
    };
    patients.push(newPatient);
    
    return newPatient;
};

export default {
    getAll,
    getAllNoSSN,
    findByID,
    addPatient
};