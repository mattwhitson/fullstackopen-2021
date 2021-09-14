import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { updateBlog } from "../reducers/blogReducer"

const Comment = ({ post }) => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const addComment = (event) => {
        const newObj = {
            ...post, comments: post.comments.concat(comment)
        }
        console.log(newObj)
        dispatch(updateBlog(newObj))
        setComment('')
    }

    return (
        <>
            <h2>Comments</h2>

            <form  onSubmit={addComment}>
                <div>
                    <input className="newComment" onChange={({target}) => setComment(target.value)} />
                </div>
                <button onSubmit={addComment}>Comment</button>
            </form>

            <ul>
            {post.comments.map(comment => 
                <li key={comment}>{comment}</li>
            )}
            </ul>
        </>
    )
}

export default Comment