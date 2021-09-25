import { ContentProps } from "../types"

const Content = (props: ContentProps): JSX.Element => {
    return <p>{props.name} {props.exerciseCount}</p>
}

export default Content