class Insured {
    constructor(firstName, lastName, age, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.phoneNumber = phoneNumber;
    }

    toString() {
        return `${this.firstName} ${this.lastName}, Věk: ${this.age}, Telefon: ${this.phoneNumber}`;
    }
}

class InsuranceApp {
    constructor() {
        this.insuredList = [];
        this.init();
        this.addSampleInsured();
    }

    init() {
        document.getElementById('createInsuredButton').addEventListener('click', () => this.createInsured());
        document.getElementById('insuranceApp').style.display = 'block'; // Zobrazit aplikaci pojištění
    }

    addSampleInsured() {
        const sampleInsured = [
            new Insured('Jan', 'Novák', 30, '123456789'),
            new Insured('Petr', 'Svoboda', 45, '987654321'),
            new Insured('Eva', 'Dvořáková', 25, '456789123')
        ];
        this.insuredList.push(...sampleInsured);
        this.updateInsuredList();
    }

    createInsured() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = parseInt(document.getElementById('age').value);
        const phoneNumber = document.getElementById('phoneNumber').value;

        if (firstName && lastName && age && phoneNumber) {
            const insured = new Insured(firstName, lastName, age, phoneNumber);
            this.insuredList.push(insured);
            this.updateInsuredList();
            this.clearForm();
        } else {
            alert('Vyplňte všechna pole');
        }
    }

    editInsured(index) {
        const insured = this.insuredList[index];
        document.getElementById('firstName').value = insured.firstName;
        document.getElementById('lastName').value = insured.lastName;
        document.getElementById('age').value = insured.age;
        document.getElementById('phoneNumber').value = insured.phoneNumber;

        document.getElementById('createInsuredButton').textContent = 'Uložit změny';
        document.getElementById('createInsuredButton').onclick = () => this.saveInsured(index);
    }

    saveInsured(index) {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = parseInt(document.getElementById('age').value);
        const phoneNumber = document.getElementById('phoneNumber').value;

        if (firstName && lastName && age && phoneNumber) {
            // Vytvoření nového pojištěnce
            const newInsured = new Insured(firstName, lastName, age, phoneNumber);
            // Aktualizace záznamu na daném indexu
            this.insuredList[index] = newInsured;
            
            this.updateInsuredList();
            this.clearForm();
            document.getElementById('createInsuredButton').textContent = 'Přidat pojištěného';
            document.getElementById('createInsuredButton').onclick = () => this.createInsured();
        } else {
            alert('Vyplňte všechna pole');
        }
    }

    deleteInsured(index) {
        this.insuredList.splice(index, 1);
        this.updateInsuredList();
        this.clearForm();
    }

    updateInsuredList() {
        const insuredUl = document.getElementById('insuredUl');
        insuredUl.innerHTML = '';
        this.insuredList.forEach((insured, index) => {
            const li = document.createElement('li');
            const deleteButton = document.createElement('button');
            const editButton = document.createElement('button');
            
            deleteButton.textContent = '🗑️ Smazat';
            editButton.textContent = '✏️ Upravit';
            
            deleteButton.onclick = (e) => {
                e.stopPropagation();
                this.deleteInsured(index);
            };
            
            editButton.onclick = (e) => {
                e.stopPropagation();
                this.editInsured(index);
            };

            li.innerHTML = `
                <strong>${insured.firstName} ${insured.lastName}</strong>
                <div style="margin: 10px 0">
                    <span style="margin-right: 20px">📅 ${insured.age} let</span>
                    <span>📱 ${insured.phoneNumber}</span>
                </div>
            `;
            
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            
            li.classList.add('fadeIn');
            insuredUl.appendChild(li);
        });
    }

    clearForm() {
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('age').value = '';
        document.getElementById('phoneNumber').value = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new InsuranceApp();
});
