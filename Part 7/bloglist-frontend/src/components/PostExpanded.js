const PostExpanded = ({ post }) => {
    if(!post) {
        return null
    }
    return(
        <>
        <h1>{post.title}</h1>
        <div>
            {<a href={post.url} target="_blank">{post.url}</a>}
            <p>{post.likes} likes</p>
            <p>Added by {post.author}</p>
        </div>
        </>
    )
}

export default PostExpanded