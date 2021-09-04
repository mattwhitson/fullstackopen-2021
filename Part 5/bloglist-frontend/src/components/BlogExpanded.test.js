import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogExpanded from './BlogExpanded'


describe('tests', () => {
    const updateBlogMock = jest.fn()

    const Blog = {
        title: 'Testing',
        author: 'Matt',
        url: 'www.google.com',
        likes: 1
    }

    test('Correct text output', () => {
        const component = render(
            <BlogExpanded post={Blog} />
        )

        const post = component.container.querySelector('.infoHidden')

        expect(post).toHaveTextContent(
            'Testing By: Matt View'
        )
    })

    test('displays url and likes', () => {
        const component = render(
            <BlogExpanded post={Blog} />
        )

        const button = component.getByText('View')
        const post = component.container.querySelector('.infoVisible')
        fireEvent.click(button)
        
        expect(post).toHaveTextContent("www.google.com")
        expect(post).toHaveTextContent("1")
        
    })

     test('like function called twice', () => {

        //cannot for the life of me figure out how to have it 
        const component = render(
            <BlogExpanded post={Blog} updateBlog={updateBlogMock}/>
        )

        const button = component.getByText('Like')
        fireEvent.click(button)
        fireEvent.click(button)

        expect(updateBlogMock.mock.calls).toHaveLength(2)
     })   

})
