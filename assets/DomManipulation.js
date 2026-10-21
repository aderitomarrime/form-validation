import { FormValidation } from "./FormValidation.js";

class DomManipulation {

    static addEventListenners() {
        const inputs = document.querySelectorAll("input[type='email'], input[type='text'], input[type='password']");
        const select = document.querySelector("select");
        const submit = document.querySelector("input[type='submit']");

        inputs.forEach((input)=> {
            input.addEventListener("input", (element)=>{
                
                //check email input
                if(element.target.type == "email") {

                    //if the user doesnt insert or insert a invalid email show error message
                    if(FormValidation.checkRequired(element.target)) {
                        this.displayErrorMessage(element.target, element.target.dataset.required);
                    }else if (FormValidation.checkMisMatch(element.target)){
                        this.displayErrorMessage(element.target, element.target.dataset.mismatch);
                    }else{
                        console.log(FormValidation.checkMisMatch(element.target))
                        this.removeErrorMessage(element.target);
                    }

                //check text input
                }else if(element.target.type == "text") {
                    if(select.value == ""){
                        this.displayErrorMessage(select, select.dataset.invalid);
                    }else{
                        this.removeErrorMessage(select)

                        let result = FormValidation.checkPostalCode(select, element.target);

                        if(result != true) {
                            this.displayErrorMessage(element.target, result)
                        }else{
                            this.removeErrorMessage(element.target)
                        }
                    }
                //check password input
                }else {
                    if(FormValidation.checkRequired(element.target)) {
                        this.displayErrorMessage(element.target, element.target.dataset.required);
                    }else if (FormValidation.checkLength(element.target)){
                        this.displayErrorMessage(element.target, element.target.dataset.short);
                    }else{
                        console.log(FormValidation.checkMisMatch(element.target))
                        this.removeErrorMessage(element.target);
                    }
                }
            })
        })

        select.addEventListener("change", (element)=>{
            if(element.target.value == ""){
                this.displayErrorMessage(select, select.dataset.invalid);
            }else{
                this.removeErrorMessage(select)

                const inputElement = document.querySelector("input[type='text']");
                let result = FormValidation.checkPostalCode(select, inputElement);

                if(inputElement.value.length > 0) {
                    if(result != true) {
                        this.displayErrorMessage(inputElement, result)
                    }else{
                        this.removeErrorMessage(inputElement)
                    }
                }
            }
        })
    }

    static displayErrorMessage(element, info){
        const errorMessage = element.parentNode.querySelector("span");
        errorMessage.textContent =`${info}`;
        errorMessage.className = "error active";
    }

    static removeErrorMessage(element){
        const errorMessage = element.parentNode.querySelector("span");
        errorMessage.textContent ="";
        errorMessage.className = "error";
    }
}

export { DomManipulation }