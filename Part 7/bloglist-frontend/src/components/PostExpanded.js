import React from 'react'
import Comment from './Comment'

const PostExpanded = ({ post }) => {
    
    if(!post) {
        return null
    }

    return(
        <>
            <h1>{post.title}</h1>
            <div>
                {<a href={post.url} target="_blank" rel="noreferrer">{post.url}</a>}
                <p>{post.likes} likes</p>
                <p>Added by {post.author}</p>
            </div>
            <Comment post={post} />
        </>
    )
}

export default PostExpanded