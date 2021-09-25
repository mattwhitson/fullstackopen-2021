import { Diagnose } from "../types";
import diagnoseData from '../../data/diagnoses.json';

const getAll = (): Array<Diagnose> => {
    return diagnoseData;
};

export default {
    getAll
};