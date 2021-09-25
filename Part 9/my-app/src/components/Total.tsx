import { TotalProps } from "../types";

const Total = (props: TotalProps) => {
    return <p>Number of exercises{" "}
    {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
}

export default Total;