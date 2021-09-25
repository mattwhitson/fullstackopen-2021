import { PartProps } from "../types"
const Part = ({course}: PartProps) => {
    switch(course.type) {
        case 'normal':
            return(<div><b>{course.name} {course.exerciseCount}</b><br></br>
                    <em>{course.description}</em></div>
            )
        case 'groupProject':
            return(
                <div><b>{course.name} {course.exerciseCount}</b><br></br>
                <p>Group Projects: {course.groupProjectCount}</p>
                </div>
            )
        case 'submission':
            return(
                <div><b>{course.name} {course.exerciseCount}</b><br></br>
                <em>{course.description}</em><p>Submit to: {course.exerciseSubmissionLink}</p>
                </div>
            )
        default: return null
    }
}

export default Part