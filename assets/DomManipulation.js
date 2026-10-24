import { FormValidation } from "./FormValidation.js";

class DomManipulation {

    static addEventListenners() {
        const inputs = document.querySelectorAll("input[type='email'], input[type='text'], input[type='password']");
        const select = document.querySelector("select");
        const submit = document.querySelector("input[type='submit']");

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

            const inputs = document.querySelectorAll("input[type='email'], input[type='text'], input[type='password']");
            const select = document.querySelector("select");

            inputs.forEach(input=>{
                if(input.type == "email") {

                    //if the user doesnt insert or insert a invalid email show error message
                    if(FormValidation.checkRequired(input)) {
                        this.displayErrorMessage(input, input.dataset.required);
                    }else if (FormValidation.checkMisMatch(input)){
                        this.displayErrorMessage(input, input.dataset.mismatch);
                    }else{
                        console.log(FormValidation.checkMisMatch(input))
                        this.removeErrorMessage(input);
                    }

                //check text input
                }else if(input.type == "text") {
                    if(select.value == ""){
                        this.displayErrorMessage(select, select.dataset.invalid);
                    }else{
                        this.removeErrorMessage(select)

                        let result = FormValidation.checkPostalCode(select, input);

                        if(result != true) {
                            this.displayErrorMessage(input, result)
                        }else{
                            this.removeErrorMessage(input)
                        }
                    }
                //check password input
                }else {
                    if(FormValidation.checkRequired(input)) {
                        this.displayErrorMessage(input, input.dataset.required);
                    }else if (FormValidation.checkLength(input)){
                        this.displayErrorMessage(input, input.dataset.short);
                    }else if(input.id == "passconf") {
                        const password = document.querySelector("input[id='password']").value;

                        if(FormValidation.checkPassValues(password, input.value)){
                            this.removeErrorMessage(input);
                        }else{
                            this.displayErrorMessage(input, input.dataset.different);
                        }
                    } 
                    else{
                        this.removeErrorMessage(input);
                    }
                }
            })
            
            // const inputElement = document.querySelector("input[type='text']");

            // if(select.value == ""){
            //     this.displayErrorMessage(select, select.dataset.invalid);
            //     this.removeErrorMessage(inputElement)
            // }else{
            //     this.removeErrorMessage(select)

            //     let result = FormValidation.checkPostalCode(select, inputElement);

            //     if(inputElement.value.length > 0) {
            //         if(result != true) {
            //             this.displayErrorMessage(inputElement, result)
            //         }else{
            //             this.removeErrorMessage(inputElement)
            //         }
            //     }
            // }

        })

    }

    static checkInput(event, select){  
        //check email input
        if(event.target.type == "email") {

            //if the user doesnt insert or insert a invalid email show error message
            if(FormValidation.checkRequired(event.target)) {
                this.displayErrorMessage(event.target, event.target.dataset.required);
            }else if (FormValidation.checkMisMatch(event.target)){
                this.displayErrorMessage(event.target, event.target.dataset.mismatch);
            }else{
                console.log(FormValidation.checkMisMatch(event.target))
                this.removeErrorMessage(event.target);
            }

        //check text input
        }else if(event.target.type == "text") {
            if(select.value == ""){
                this.displayErrorMessage(select, select.dataset.invalid);
            }else{
                this.removeErrorMessage(select)

                let result = FormValidation.checkPostalCode(select, event.target);

                if(result != true) {
                    this.displayErrorMessage(event.target, result)
                }else{
                    this.removeErrorMessage(event.target)
                }
            }
        //check password input
        }else {
            if(FormValidation.checkRequired(event.target)) {
                this.displayErrorMessage(event.target, event.target.dataset.required);
            }else if (FormValidation.checkLength(event.target)){
                this.displayErrorMessage(event.target, event.target.dataset.short);
            }else if(event.target.id == "passconf") {
                const password = document.querySelector("input[id='password']").value;

                if(FormValidation.checkPassValues(password, event.target.value)){
                    this.removeErrorMessage(event.target);
                }else{
                    this.displayErrorMessage(event.target, event.target.dataset.different);
                }
            } 
            else{
                this.removeErrorMessage(event.target);
            }
        }
    }

    static checkSelect(event,select){
        const inputElement = document.querySelector("input[type='text']");

        if(event.target.value == ""){
            this.displayErrorMessage(select, select.dataset.invalid);
            this.removeErrorMessage(inputElement)
        }else{
            this.removeErrorMessage(select)

            let result = FormValidation.checkPostalCode(select, inputElement);

            if(inputElement.value.length > 0) {
                if(result != true) {
                    this.displayErrorMessage(inputElement, result)
                }else{
                    this.removeErrorMessage(inputElement)
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