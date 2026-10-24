import { FormValidation } from "./FormValidation.js";

class DomManipulation {

    static addEventListenners() {
        const inputs = document.querySelectorAll("input[type='email'], input[type='text'], input[type='password']");
        const select = document.querySelector("select");
        const submit = document.querySelector("input[name='send']");
        const form = document.querySelector("form");

        inputs.forEach((input)=> {
            input.addEventListener("input", (event)=>{
                DomManipulation.checkInput(event, select);
            })
        })

        select.addEventListener("change", (event)=>{
            DomManipulation.checkSelect(event, select);
        })

        submit.addEventListener("click", (event)=>{
            event.preventDefault();

            let result;

            const inputs = document.querySelectorAll("input[type='email'], input[type='text'], input[type='password']");
            const select = document.querySelector("select");

            inputs.forEach(input=>{
                if(input.type == "email") {

                    //if the user doesnt insert or insert a invalid email show error message
                    if(FormValidation.checkRequired(input)) {
                        this.displayErrorMessage(input, input.dataset.required);
                        result = true;
                    }else if (FormValidation.checkMisMatch(input)){
                        this.displayErrorMessage(input, input.dataset.mismatch);
                        result = true;
                    }else{
                        this.removeErrorMessage(input);
                        result = false;
                    }

                //check text input
                }else if(input.type == "text") {
                    if(select.value == ""){
                        this.displayErrorMessage(select, select.dataset.invalid);
                        result = true;
                    }else{
                        this.removeErrorMessage(select)

                        let validation = FormValidation.checkPostalCode(select, input);

                        if(validation != true) {
                            this.displayErrorMessage(input, result)
                            result = true;
                        }else{
                            this.removeErrorMessage(input)
                            result = false;
                        }
                    }
                //check password input
                }else {
                    if(FormValidation.checkRequired(input)) {
                        this.displayErrorMessage(input, input.dataset.required);
                        result = true;
                    }else if (FormValidation.checkLength(input)){
                        this.displayErrorMessage(input, input.dataset.short);
                        result = true;
                    }else if(input.id == "passconf") {
                        const password = document.querySelector("input[id='password']").value;

                        if(FormValidation.checkPassValues(password, input.value)){
                            this.removeErrorMessage(input);
                            event.target.className = "green-border";
                            result = false;
                        }else{
                            this.displayErrorMessage(input, input.dataset.different);
                            event.target.className = "red-border";
                            result = true;
                        }
                    } 
                    else{
                        this.removeErrorMessage(input);
                        result = false;
                    }
                }
            })

            if(!result){
                form.submit();
            }

        })

    }

    static checkInput(event, select){  
        //check email input
        let result;
        if(event.target.type == "email") {

            //if the user doesnt insert or insert a invalid email show error message
            if(FormValidation.checkRequired(event.target)) {
                this.displayErrorMessage(event.target, event.target.dataset.required);
                result = true;
            }else if (FormValidation.checkMisMatch(event.target)){
                this.displayErrorMessage(event.target, event.target.dataset.mismatch);
                result = true;
            }else{
                this.removeErrorMessage(event.target);
                result = false;
            }

        //check text input
        }else if(event.target.type == "text") {
            if(select.value == ""){
                this.displayErrorMessage(select, select.dataset.invalid);
                event.target.className = "";
                result = true;
            }else{
                this.removeErrorMessage(select)

                let validation = FormValidation.checkPostalCode(select, event.target);

                if(validation != true) {
                    this.displayErrorMessage(event.target, validation)
                    event.target.className = "red-border";
                    result = true;
                }else{
                    this.removeErrorMessage(event.target)
                    event.target.className = "green-border";
                    result = false;
                }
            }
        //check password input
        }else {
            if(FormValidation.checkRequired(event.target)) {
                this.displayErrorMessage(event.target, event.target.dataset.required);
                result = true;
            }else if (FormValidation.checkLength(event.target)){
                this.displayErrorMessage(event.target, event.target.dataset.short);
                result = true;
            }else if(event.target.id == "passconf") {
                const password = document.querySelector("input[id='password']").value;

                if(FormValidation.checkPassValues(password, event.target.value)){
                    this.removeErrorMessage(event.target);
                    result = false;
                    event.target.className = "green-border";
                }else{
                    this.displayErrorMessage(event.target, event.target.dataset.different);
                    event.target.className = "red-border";
                    result = true;
                }
            } 
            else{
                this.removeErrorMessage(event.target);
                result = false;
            }
        }
    }

    static checkSelect(event,select){
        const inputElement = document.querySelector("input[type='text']");

        if(event.target.value == ""){
            this.displayErrorMessage(select, select.dataset.invalid);
            this.removeErrorMessage(inputElement)
            select.className = "red-border";
            inputElement.className = "";
        }else{
            this.removeErrorMessage(select)
            select.className = "green-border";

            let result = FormValidation.checkPostalCode(select, inputElement);

            if(inputElement.value.length > 0) {
                if(result != true) {
                    this.displayErrorMessage(inputElement, result)
                    inputElement.className = "red-border";
                }else{
                    this.removeErrorMessage(inputElement)
                    inputElement.className = "green-border";
                }
            }
        }
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