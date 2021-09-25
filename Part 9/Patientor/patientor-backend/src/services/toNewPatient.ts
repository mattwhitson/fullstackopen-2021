import { Gender, NewPatient } from "../types";

type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};


const parseString = (obj: unknown): string => {
    if(!obj || !isString(obj)) 
        throw new Error('missing content or incorrect type');
    return obj;
};

const parseGender = (obj: unknown): Gender => {
    if(!obj || !isGender(obj))
        throw new Error('gender is incorrectly selected');
    return obj;
};

const toNewPatient =({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
    const newPatient =({
        name: parseString(name),
        dateOfBirth: parseString(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation)
    });

    return newPatient;
};

export default toNewPatient;