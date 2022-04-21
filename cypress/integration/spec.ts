describe('My First Test using app actions', () => {
  const getHomeComponent = () => cy.window().should('have.property', 'HomePageComponent');

  const getHeroes = () => getHomeComponent().should('have.property', 'heroes$');

  it('Visits the initial project page', () => {
    cy.visit('/');

    console.log(getHomeComponent());

    getHeroes().then((value: any) => {
      value.subscribe(heroes => {
        assert.isArray(heroes);
      });
    });
  });
});
