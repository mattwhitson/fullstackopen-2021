import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = ({ user }) => {

    const padding = {
        padding: 5
      }
    
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                    <Link style={padding} to="/api/blogs">Blogs</Link>
                </Nav.Link>
                
                <Nav.Link href="#" as="span">
                    <Link style={padding} to="/api/users">Users</Link>
                </Nav.Link>
                {/* <Nav.Link href="#" as="span">
                    {user
                    ? <em style={padding}>{user} logged in</em>
                    : <Link style={padding} to="/login">login</Link>
                    }
                </Nav.Link> */}
                <Navbar.Text>
                    Signed in as: {user.name}
                </Navbar.Text>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Text>
                    Signed in as: {user.name}
            </Navbar.Text>
        </Navbar>
    )
}

export default Navigation