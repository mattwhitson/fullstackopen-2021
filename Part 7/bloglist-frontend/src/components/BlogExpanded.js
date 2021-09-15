import React from 'react'
import { Link } from 'react-router-dom'

const BlogExpanded = ({post}) => {
  return(
    <>
      <td>
        <Link to={`/api/blogs/${post.id}`}>{`${post.title}`}</Link>
      </td>
      <td>
        {`By: ${post.author}`}
      </td>
    </>
  )
}

BlogExpanded.displayName = 'BlogExpanded'

export default BlogExpanded