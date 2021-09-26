import { Patient } from '../types'

const PatientExpanded = (patient: Patient): JSX.Element => {
    return  <div>
                <h1>{patient.name}</h1>
                <p>{patient.ssn}</p>
                <p>{patient.occupation}</p>
            </div>
}

export default PatientExpanded