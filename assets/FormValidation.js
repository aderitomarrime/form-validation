class FormValidation {

    static checkRequired(element) {
        if(element.validity.valueMissing){
            return true;
        }else {
            return false;
        }
    }

    static checkMisMatch(element) {
        if(element.validity.typeMismatch){
            return true;
        }else {
            return false;
        }
    }

    static checkLength(element) {
        if(element.validity.tooShort){
            return true;
        }else {
            return false;
        }
    }

    static checkEmptyOptionSelected(selectElement) {
        if(selectElement.value == "") {
            return true;
        }else {
            return false;
        }
    }

    static checkPostalCode(selectElement, inputElement) {
        
        const constraints = {
            fr: [
                "^\\d{5}$",
                "French postal codes must have exactly 5 digits: e.g. 75012"
            ],
            po: [
                "^\\d{4}-\\d{3}$",
                "Portuguese postal codes must have exactly 7 digits: e.g. 0111-100"
            ],
            sp: [
                "^\\d{5}$",
                "Spanish postal codes must have exactly 5 digits: e.g. 67820"
            ]
        }

        const country = selectElement.value;
        const constraint = new RegExp(constraints[country][0], "");

        if(constraint.test(inputElement.value)) {
            return true;
        }else {
            return constraints[country][1];
        }
    }

    static checkPassValues(pass, passConfirmation) {
        if(pass === passConfirmation) {
            return true;
        }else {
            return false;
        }
    }
}

export { FormValidation }