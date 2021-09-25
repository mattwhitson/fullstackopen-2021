import { NewPatient, Patient } from "../types";
import { PatientSecure } from "../types";
import patientData from '../../data/patients.json';
import {v1 as uuid} from 'uuid';




const getAll = (): Array<Patient> => {
    return patientData;
};


const getAllNoSSN = (): PatientSecure [] => {
    return patientData.map(patient => ({
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation
        })
    );
};

const findByID = (id: string): PatientSecure | undefined => {
    return patientData.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatient): PatientSecure => {
    const newPatient = {
        id: uuid(),
        ...patient,
        ssn: String(patient.ssn)
    };
    patientData.concat(newPatient);
    
    return newPatient;
};

export default {
    getAll,
    getAllNoSSN,
    findByID,
    addPatient
};