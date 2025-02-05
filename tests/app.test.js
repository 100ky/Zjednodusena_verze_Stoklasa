describe('InsuranceApp - Edit Functionality', () => {
    let app;
    
    beforeEach(() => {
        // Setup DOM elements
        document.body.innerHTML = `
            <input id="firstName" />
            <input id="lastName" />
            <input id="age" />
            <input id="phoneNumber" />
            <button id="createInsuredButton">Přidat pojištěného</button>
            <ul id="insuredUl"></ul>
        `;
        app = new InsuranceApp();
    });

    test('should populate form fields when editing insured person', () => {
        // Arrange
        const testPerson = new Insured('Jan', 'Novák', 30, '123456789');
        app.insuredList = [testPerson];

        // Act
        app.editInsured(0);

        // Assert
        expect(document.getElementById('firstName').value).toBe('Jan');
        expect(document.getElementById('lastName').value).toBe('Novák');
        expect(document.getElementById('age').value).toBe('30');
        expect(document.getElementById('phoneNumber').value).toBe('123456789');
    });

    test('should save edited insured person', () => {
        // Arrange
        const originalPerson = new Insured('Jan', 'Novák', 30, '123456789');
        app.insuredList = [originalPerson];
        
        // Set form values
        document.getElementById('firstName').value = 'Petr';
        document.getElementById('lastName').value = 'Svoboda';
        document.getElementById('age').value = '35';
        document.getElementById('phoneNumber').value = '987654321';

        // Act
        app.saveInsured(0);

        // Assert
        const editedPerson = app.insuredList[0];
        expect(editedPerson.firstName).toBe('Petr');
        expect(editedPerson.lastName).toBe('Svoboda');
        expect(editedPerson.age).toBe(35);
        expect(editedPerson.phoneNumber).toBe('987654321');
    });
});
