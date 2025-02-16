import { Insured } from './models/Insured.js';
import { InsuredList } from './components/InsuredList.js';
import { DOMUtils } from './utils/DOMUtils.js';

/**
 * Hlavní třída aplikace pro správu pojištěných osob
 * Zajišťuje základní operace s pojištěnými a jejich validaci
 */
export class InsuranceApp {
    /**
     * Inicializuje aplikaci a vytvoří výchozí seznam pojištěných
     */
    constructor() {
        this.insuredList = [];
        this.listComponent = new InsuredList(this);
        this.init();
        this.addSampleInsured();
    }

    /**
     * Nastaví počáteční event listenery a zobrazí aplikaci
     */
    init() {
        DOMUtils.getElement('createInsuredButton').addEventListener('click', () => this.createInsured());
        DOMUtils.getElement('insuranceApp').style.display = 'block';
    }

    /**
     * Přidá vzorové pojištěné osoby do seznamu
     */
    addSampleInsured() {
        const sampleInsured = [
            new Insured('Jan', 'Novák', 30, '605548156'),
            new Insured('Petr', 'Svoboda', 45, '748126511'),
            new Insured('Eva', 'Dvořáková', 25, '456789123')
        ];
        this.insuredList.push(...sampleInsured);
        this.updateInsuredList();
    }

    /**
     * Vytvoří nového pojištěného ze vstupních polí
     * Provede validaci všech údajů před vytvořením
     */
    createInsured() {
        const firstName = DOMUtils.getValue('firstName');
        const lastName = DOMUtils.getValue('lastName');
        const age = parseInt(DOMUtils.getValue('age'));
        const phoneNumber = DOMUtils.getValue('phoneNumber');

        if (this.validateInput(firstName, lastName, age, phoneNumber)) {
            const insured = new Insured(firstName, lastName, age, phoneNumber);
            this.insuredList.push(insured);
            this.updateInsuredList();
            this.clearForm();
        }
    }

    /**
     * Komplexní validace všech vstupních údajů
     * @param {string} firstName - Jméno
     * @param {string} lastName - Příjmení
     * @param {number} age - Věk
     * @param {string} phoneNumber - Telefonní číslo
     * @returns {boolean} - Výsledek validace
     */
    validateInput(firstName, lastName, age, phoneNumber) {
        // Validace jména
        if (!DOMUtils.isValidName(firstName)) {
            DOMUtils.showError('Jméno musí začínat velkým písmenem a obsahovat pouze písmena (2-30 znaků)');
            return false;
        }

        // Validace příjmení
        if (!DOMUtils.isValidName(lastName)) {
            DOMUtils.showError('Příjmení musí začínat velkým písmenem a obsahovat pouze písmena (2-30 znaků)');
            return false;
        }

        // Validace věku
        if (!DOMUtils.isValidAge(age)) {
            DOMUtils.showError('Věk musí být celé číslo mezi 1 a 120 lety');
            return false;
        }

        // Validace telefonního čísla
        if (!DOMUtils.isValidPhoneNumber(phoneNumber)) {
            DOMUtils.showError('Neplatný formát telefonního čísla. Použijte formát: 123456789 nebo +420123456789');
            return false;
        }

        return true;
    }

    /**
     * Aktualizuje údaje existujícího pojištěného
     * @param {number} id - Index pojištěného v seznamu
     */
    updateInsured(id, firstName, lastName, age, phoneNumber) {
        this.insuredList[id] = new Insured(firstName, lastName, age, phoneNumber);
        this.updateInsuredList();
    }

    /**
     * Odstraní pojištěného ze seznamu
     * @param {number} index - Index pojištěného k odstranění
     */
    deleteInsured(index) {
        this.insuredList.splice(index, 1);
        this.updateInsuredList();
    }

    /**
     * Aktualizuje zobrazení seznamu pojištěných v UI
     */
    updateInsuredList() {
        this.listComponent.update(this.insuredList);
    }

    /**
     * Vyčistí všechna vstupní pole formuláře
     */
    clearForm() {
        ['firstName', 'lastName', 'age', 'phoneNumber'].forEach(id => {
            DOMUtils.clearValue(id);
        });
    }
}
