import { ContentProps } from "../types"
import Part from './Part'

const Content = (props: ContentProps): JSX.Element => {
    return  <div>{props.courseParts.map(course => 
                    <Part course={course} /> 
                )}
            </div>
} 


export default Content