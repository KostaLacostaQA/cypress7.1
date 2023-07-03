// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (email, password) => {
    cy.get('.login__title').should('have.text', 'Авторизация')
    .then (() => {
        cy.get('[type="email"]').type(`${email}`)
        .then (() => {
            cy.get('[type="password"]').type(`${password}`) 
            .then (() => {
                cy.contains('Авторизоваться').click()
            })
        })
    })
})

Cypress.Commands.add('selectDay', (dayOfweek) => {
    cy.get('.page-nav').should('be.visible')
    .then (() => {
        cy.get('.page-nav').children().eq(dayOfweek).click()
    })
})

Cypress.Commands.add('goToRandomHall', () => {
    cy.selectDay(Math.round(Math.random() * 5) + 1)
    cy.get('div>ul>li')
    .then (($hallArray) => {
        let hallNumber = Math.round(Math.random() * ($hallArray.length-1))
        cy.wrap($hallArray).eq(hallNumber).click()
        .then (() => {
            cy.contains('Забронировать').should('be.visible')
        })
    })
})

Cypress.Commands.add('getFreeRandomChair', () => {
    let rowsCount = Cypress.$("div.buying-scheme__row")
    let rows = rowsCount.length
    let chairsInRowCount = Cypress.$("div>span.buying-scheme__chair")
    let chairsInRow = chairsInRowCount.length/rows
    let attempts = rows * chairsInRow * 3
    for (let cntr = 0; cntr < attempts; cntr++) {
        let row = Math.round(Math.random() * (rows - 1)) + 1
        let chair = Math.round(Math.random() * (chairsInRow - 1)) + 1
        cy.log(`Выбрано: ${row} ряд, ${chair} место`)
        let chairSelector = "div:nth-child(" + row + ") > span:nth-child(" + chair + ")"
        let classNamed = Cypress.$(chairSelector).prop('className')
        if (!(classNamed.includes("buying-scheme__chair_taken"))) {
            cy.get(chairSelector).click()
            return
        }
    }
    throw new Error(
      `Сделано ${attempts} попыток - не удалось найти свободное кресло!`
    )
  })