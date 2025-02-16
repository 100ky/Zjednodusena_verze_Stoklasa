export class Modal {
    static createModal(content) {
        const modal = document.createElement('div');
        modal.className = 'edit-modal fadeIn';
        modal.innerHTML = `<div class="modal-content">${content}</div>`;
        document.body.appendChild(modal);
        return modal;
    }

    static createEditModal(insured) {
        const content = `
            <h2>Upravit pojištěného</h2>
            <input type="text" id="editFirstName" value="${insured.firstName}">
            <input type="text" id="editLastName" value="${insured.lastName}">
            <input type="number" id="editAge" value="${insured.age}">
            <input type="text" id="editPhoneNumber" value="${insured.phoneNumber}">
            <button id="saveEdit">Uložit změny</button>
            <button id="cancelEdit">Zrušit</button>
        `;
        return this.createModal(content);
    }

    static createDeleteModal(insured) {
        const content = `
            <h2>Potvrdit smazání</h2>
            <p>Opravdu chcete smazat pojištěnce ${insured.firstName} ${insured.lastName}?</p>
            <button id="confirmDelete" style="background: #dc3545;">Smazat</button>
            <button id="cancelDelete">Zrušit</button>
        `;
        return this.createModal(content);
    }
}
