export class Insured {
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
