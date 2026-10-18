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

                //check password input
                }else {

                }
            })
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