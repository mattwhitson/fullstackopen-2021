describe('login page and logging in', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Matt',
            username: 'mattwhit',
            password: 'mattwhit'
        }
        const secondUser = {
            name: 'Joe',
            username: 'joeboy',
            password: 'joeboy'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)  
        cy.request('POST', 'http://localhost:3003/api/users/', secondUser)
        cy.visit('http://localhost:3000')
    })

    it('login fails with wrong password', function() {
        cy.get('input:first').type('mattwhit')
        cy.get('input:last').type('wrong')
        cy.contains('login').click()
    
        cy.get('.error').contains('ERROR: Wrong credentials')
      })

    it('login page appears', function() {       
        cy.contains('Please Login')
        cy.contains('username')
        cy.contains('password')
    })

    it('can log in', function() {
        cy.get('input:first').type('mattwhit')
        cy.get('input:last').type('mattwhit')
        cy.contains('login').click()

        cy.contains('You have successfully logged in')
    })
})



describe('while logged in', function () {

    beforeEach(function() {
        cy.login({ name: 'Matt', username: 'mattwhit', password: 'mattwhit' })
    })

    it('a new blog can be created', function() {
        cy.contains('Create New Note').click()
        cy.get('.title').type('a post created by cypress')
        cy.get('.author').type('Cypress')
        cy.contains('Add').click()
        cy.contains('a post created by cypress')
    })

    it('can like a blog', function() {

        cy.contains('View').click()
        cy.get('.likes').contains('Likes: 0')
        cy.contains('Like').click()
        cy.get('.likes').contains('Likes: 1')
        cy.get('.success').contains('The blog titled a post created by cypress has successfully been updated')
    })

    // it('removing blog', function() {
    //     cy.contains('View').click()
    //     cy.contains('Remove').click()
    //     cy.on('window:confirm', () => true)
    //     cy.wait(2000)
    //     cy.contains('a post created by cypress').should('not.exist')
    // })
})

describe('testing functionality of other users', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
        cy.get('input:first').type('joeboy')
        cy.get('input:last').type('joeboy')
        cy.contains('login').click()

        cy.contains('You have successfully logged in')   
    })
    

    it('removing other users blog', function() { //turn off removing blog test to run this test, otherwise there will be no blog to attempt removal
        
        cy.contains('View').click()
        cy.contains('Remove').click()
        cy.on('window:confirm', () => true)
        cy.wait(2000)
        cy.contains('a post created by cypress')
    })
})

describe('likes ordered correctly', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')

        const user = {
            name: 'Matt',
            username: 'mattwhit',
            password: 'mattwhit'
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user)  
        cy.login({ name: 'Matt', username: 'mattwhit', password: 'mattwhit' })
        
        cy.createNewPost({ title: '1Like', author: 'Matt', url: 'www.google.com', likes: 1 })
        cy.createNewPost({ title: '2Like', author: 'Matt', url: 'www.google.com', likes: 2 })
        cy.createNewPost({ title: '3Like', author: 'Matt', url: 'www.google.com', likes: 3 })
        cy.createNewPost({ title: '4Like', author: 'Matt', url: 'www.google.com', likes: 4 })
        cy.createNewPost({ title: '5Like', author: 'Matt', url: 'www.google.com', likes: 5 })
    })

    it('likes ordered correctly', function() {
        cy.get('.postTitle').then(posts => {
            expect(posts[0].textContent).to.equal('5LikeHide')
            expect(posts[1].textContent).to.equal('4LikeHide')
            expect(posts[2].textContent).to.equal('3LikeHide')
            expect(posts[3].textContent).to.equal('2LikeHide')
            expect(posts[4].textContent).to.equal('1LikeHide')
        })
    })
})

