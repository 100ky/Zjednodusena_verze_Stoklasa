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
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const age = document.getElementById('age').value;
        const phoneNumber = document.getElementById('phoneNumber').value.trim();

        // Pro debugování
        console.log({
            firstName,
            lastName,
            age,
            phoneNumber
        });

        // Vylepšená kontrola vstupů
        if (firstName && lastName && age && age > 0 && phoneNumber) {
            const newInsured = new Insured(firstName, lastName, parseInt(age), phoneNumber);
            this.insuredList[index] = newInsured;
            
            this.updateInsuredList();
            this.clearForm();
            
            // Obnovení původního chování tlačítka
            const createButton = document.getElementById('createInsuredButton');
            createButton.textContent = 'Přidat pojištěného';
            createButton.onclick = () => this.createInsured();
        } else {
            alert('Vyplňte prosím správně všechna pole. Věk musí být větší než 0.');
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
            const li = createInsuredItem(insured, index);
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

function createInsuredItem(insured, id) {
    const li = document.createElement('li');
    li.dataset.id = id;
    li.innerHTML = `
        <strong>${insured.firstName} ${insured.lastName}</strong>
        <p>Věk: ${insured.age}</p>
        <p>Tel.: ${insured.phoneNumber}</p>
        <button class="edit-btn">Upravit</button>
        <button class="delete-btn">Smazat</button>
    `;

    // Přidání event listenerů pro tlačítka
    li.querySelector('.edit-btn').addEventListener('click', () => openEditModal(insured, id));
    li.querySelector('.delete-btn').addEventListener('click', () => window.app.deleteInsured(id));
    
    return li;
}

function openEditModal(insured, id) {
    const modal = document.createElement('div');
    modal.className = 'edit-modal fadeIn';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Upravit pojištěného</h2>
            <input type="text" id="editFirstName" value="${insured.firstName}">
            <input type="text" id="editLastName" value="${insured.lastName}">
            <input type="number" id="editAge" value="${insured.age}">
            <input type="text" id="editPhoneNumber" value="${insured.phoneNumber}">
            <button id="saveEdit">Uložit změny</button>
            <button id="cancelEdit">Zrušit</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('#saveEdit').addEventListener('click', () => saveEdit(id, modal));
    modal.querySelector('#cancelEdit').addEventListener('click', () => modal.remove());
}

function saveEdit(id, modal) {
    const firstName = document.querySelector('#editFirstName').value.trim();
    const lastName = document.querySelector('#editLastName').value.trim();
    const age = parseInt(document.querySelector('#editAge').value);
    const phoneNumber = document.querySelector('#editPhoneNumber').value.trim();


    // Validace bez alert
    if (!firstName || !lastName || !phoneNumber || isNaN(age) || age <= 0) {
        return false; // Vrátíme false místo alert
    }

    const editedInsured = new Insured(firstName, lastName, age, phoneNumber);
    
    // Update in UI and storage
    const li = document.querySelector(`li[data-id="${id}"]`);
    li.innerHTML = `
        <strong>${editedInsured.firstName} ${editedInsured.lastName}</strong>
        <p>Věk: ${editedInsured.age}</p>
        <p>Tel.: ${editedInsured.phoneNumber}</p>
        <button class="edit-btn">Upravit</button>
        <button class="delete-btn">Smazat</button>
    `;
    
    li.querySelector('.edit-btn').addEventListener('click', () => openEditModal(editedInsured, id));
    modal.remove();
    return true; // Úspěšná editace
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new InsuranceApp();
});
