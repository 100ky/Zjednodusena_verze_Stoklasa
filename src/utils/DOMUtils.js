/**
 * Třída pro práci s DOM elementy a validaci vstupů
 * Obsahuje statické metody pro často používané operace
 */
export class DOMUtils {
    /**
     * Získá DOM element podle jeho ID
     * @param {string} id - ID elementu
     * @returns {HTMLElement} - Nalezený element
     */
    static getElement(id) {
        return document.getElementById(id);
    }

    /**
     * Získá hodnotu z input elementu a ořízne whitespace
     * @param {string} id - ID input elementu
     * @returns {string} - Očištěná hodnota
     */
    static getValue(id) {
        return this.getElement(id).value.trim();
    }

    // Nastaví hodnotu elementu
    static setValue(id, value) {
        this.getElement(id).value = value;
    }

    // Vymaže hodnotu elementu
    static clearValue(id) {
        this.setValue(id, '');
    }

    // Nastaví událost kliknutí
    static setOnClick(id, handler) {
        this.getElement(id).onclick = handler;
    }

    // Nastaví text elementu
    static setText(id, text) {
        this.getElement(id).textContent = text;
    }

    /**
     * Validuje formát jména/příjmení
     * Musí začínat velkým písmenem a obsahovat pouze písmena včetně českých znaků
     * @param {string} name - Jméno nebo příjmení k validaci
     * @returns {boolean} - Výsledek validace
     */
    static isValidName(name) {
        const nameRegex = /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][a-záčďéěíňóřšťúůýž]{1,29}$/;
        return nameRegex.test(name);
    }

    /**
     * Validuje věk osoby
     * @param {number} age - Věk k validaci
     * @returns {boolean} - Výsledek validace
     */
    static isValidAge(age) {
        return !isNaN(age) && age > 0 && age <= 120 && Number.isInteger(Number(age));
    }

    /**
     * Validuje formát telefonního čísla
     * Podporuje formát s předvolbou +420 i bez ní
     * @param {string} phone - Telefonní číslo k validaci
     * @returns {boolean} - Výsledek validace
     */
    static isValidPhoneNumber(phone) {
        const phoneRegex = /^(\+420)?\s*[1-9][0-9]{8}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    /**
     * Zobrazí chybovou zprávu uživateli
     * @param {string} message - Text chybové zprávy
     */
    static showError(message) {
        alert(message);
    }
}
