import { Modal } from './Modal.js';
import { DOMUtils } from '../utils/DOMUtils.js';

export class InsuredList {
    // Konstruktor třídy pro správu seznamu pojištěných
    constructor(app) {
        this.app = app;
        this.listElement = DOMUtils.getElement('insuredUl');
    }

    // Vytvoří položku seznamu pro jednoho pojištěného
    createInsuredItem(insured, id) {
        const li = document.createElement('li');
        li.dataset.id = id;
        li.innerHTML = `
            <strong>${insured.firstName} ${insured.lastName}</strong>
            <p>Věk: ${insured.age}</p>
            <p>Tel.: ${insured.phoneNumber}</p>
            <button class="edit-btn">Upravit</button>
            <button class="delete-btn">Smazat</button>
        `;

        li.querySelector('.edit-btn').addEventListener('click', () => this.openEditModal(insured, id));
        li.querySelector('.delete-btn').addEventListener('click', () => this.openDeleteModal(insured, id));
        
        return li;
    }

    // Aktualizuje celý seznam pojištěných
    update(insuredList) {
        this.listElement.innerHTML = '';
        insuredList.forEach((insured, index) => {
            const li = this.createInsuredItem(insured, index);
            this.listElement.appendChild(li);
        });
    }

    // Otevře modální okno pro úpravu pojištěného
    openEditModal(insured, id) {
        const modal = Modal.createEditModal(insured);
        modal.querySelector('#saveEdit').addEventListener('click', () => this.saveEdit(id, modal));
        modal.querySelector('#cancelEdit').addEventListener('click', () => modal.remove());
    }

    // Otevře modální okno pro potvrzení smazání
    openDeleteModal(insured, id) {
        const modal = Modal.createDeleteModal(insured);
        modal.querySelector('#confirmDelete').addEventListener('click', () => {
            this.app.deleteInsured(id);
            modal.remove();
        });
        modal.querySelector('#cancelDelete').addEventListener('click', () => modal.remove());
    }

    // Uloží upravené údaje pojištěného
    saveEdit(id, modal) {
        const firstName = DOMUtils.getValue('editFirstName');
        const lastName = DOMUtils.getValue('editLastName');
        const age = parseInt(DOMUtils.getValue('editAge'));
        const phoneNumber = DOMUtils.getValue('editPhoneNumber');

        if (this.app.validateInput(firstName, lastName, age, phoneNumber)) {
            this.app.updateInsured(id, firstName, lastName, age, phoneNumber);
            modal.remove();
        }
    }
}
