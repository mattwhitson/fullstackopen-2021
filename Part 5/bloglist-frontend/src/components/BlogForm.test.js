import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe("BlogForm tests", () => {
    const addPostMock = jest.fn()

    test('Correct info when making new post', () => {
        const component = render(
            <BlogForm addPost={addPostMock} />
        )

        const title = component.container.querySelector('.title')
        
        const form = component.container.querySelector('form')

        fireEvent.change(title, {
            target: {value: 'Testing' }
        })

        fireEvent.submit(form)
        console.log(addPostMock.mock.calls[0][0])
        expect(addPostMock.mock.calls).toHaveLength(1)
    })
})