const UserExpanded = ({user}) => {
    
    if(!user) {
        return null
    }
    return (
        <div>
            <h1>{user.name}</h1>
            <h2>Added Blogs</h2>
            <ul>
                {user.posts.map(post => 
                    <li key={post.id}>{post.title}</li>
                )}
            </ul>
        </div>

    )
}

export default UserExpanded