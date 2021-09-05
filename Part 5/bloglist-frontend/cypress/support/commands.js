Cypress.Commands.add('login', ({ name, username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      name, username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })
  
Cypress.Commands.add('createNewPost', ({title, author, url, likes}) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { title, author, url, likes},
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
        }
      })
      cy.visit('http://localhost:3000')
})


