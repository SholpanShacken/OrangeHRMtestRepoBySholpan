class SharedElements {
   getResetButton () {
        return cy.get('button[type="reset"]').contains('Reset')
    }
     getSearchButton () {
        return cy.get('button[type="submit"]').contains('Search')
    }
    getSelectCheckbox () {
        return cy.get ('.oxd-icon.bi-check.oxd-checkbox-input-icon');
    }




};

export default SharedElements;