class DomManipulation {

    static addEventListenners() {
        const inputs = document.querySelectorAll("input[type='email'], input[type='text'], input[type='password']");
        const select = document.querySelector("select");
        const submit = document.querySelector("input[type='submit']");

        inputs.forEach((input)=> {
            console.log(input.type)
        })
    }

    static displayErrorMessage(element){

    }

    static removeErrorMessage(element){

    }
}

export { DomManipulation }