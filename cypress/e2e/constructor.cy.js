describe('Check constructor page', () => {
  const email = 'resavv@mail.ru';
  const password = '123';

  beforeEach(() => {
    cy.viewport(1920,1080)
    cy.visit('/')
  })
  it('Should open and close modal ingredient', () => {
    cy.get('[data-test=60d3b41abdacab0026a733c6]').click()
    cy.get('[data-test=cross]').click()
  })

  it('Should add ingredients to list and get order', () => {
    cy.get('[data-test=60d3b41abdacab0026a733c6]').trigger("dragstart")
    cy.get('[data-test=dropfield]').trigger("drop")
    cy.get('[data-test=60d3b41abdacab0026a733cc]').trigger("dragstart")
    cy.get('[data-test=dropfield]').trigger("drop")
    cy.get('button').contains('Оформить заказ').click()
    cy.get('[type="text"]').type(email)
    cy.get('[type="password"]').type(password)
    cy.get('button').contains('Войти').click()
    cy.get('[type="button"]').click()
  })

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
})