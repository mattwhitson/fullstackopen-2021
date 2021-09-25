import { HeaderProps } from "../types"

const Header = (props: HeaderProps): JSX.Element => {
    return <h1>{props.header}</h1>
}

export default Header