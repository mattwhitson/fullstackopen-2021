import { Link } from "react-router-dom"

const UsersList = ({allUsers}) => {
    return(
        <>
        
            <h2>Users</h2>
            
            <b>Blogs Posted</b>
            {allUsers.map(user => 
                <ul key={user.id}>
                    <li>
                    <Link to={`/api/users/${user.id}`}>{user.name}</Link>&nbsp;&nbsp;&nbsp;{user.posts.length}
                    </li>
                </ul>
                )}
              
          
          </>
    )
}

export default UsersList