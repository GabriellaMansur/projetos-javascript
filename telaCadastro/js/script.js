class Validator {

    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate'
            
        ]
    }

    //iniciar a validação de todos os campos
    validate(form) {

        //resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        //pegar os inputs
        let inputs = document.getElementsByTagName('input');

        // transformo uma HTMLCollection -> array
        let inputsArray = [...inputs];

        // loop nos inputs e validação mediante ao que for encontrado
    // loop nos inputs e validação mediante ao que for encontrado
inputsArray.forEach(function(input) {
    // loop em todas as validações existentes
    for (let i = 0; this.validations.length > i; i++) {
        // verifica se a validação atual existe no input
        if (input.getAttribute(this.validations[i]) != null) {

            // data-min-length -> minlength: limpando a string para virar um método
            let method = this.validations[i].replace('data-', '').replace('-', '');

            // valor do input
            let value = input.getAttribute(this.validations[i]);

            // invocar o método
            this[method](input, value);
        }
    }
}.bind(this)); // Fazendo o bind do contexto do objeto Validator


    }
    // Verifica se um input tem um número mínimo de caracteres
    minlength(input, minValue) {
       let inputLenght = input.value.length;

       let errorMessage = `O campo precisa ter pelo menos ${minValue} carcatrees`;

       if (inputLenght < minValue) {
        this.printMessage(input, errorMessage);
       }
    }

    //Verifica se o input passou do limite de caracteres
    maxlength(input, maxValue) {
        let inputLenght = input.value.length;

        let errorMessage = `O campo precida ter menos de ${maxValue} caracteres`;

        if (inputLenght > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    // valida emails
    emailValidate(input) {
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail no padrão joaodasilva@email.com `;

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }

    }

//14:12

    //método para imprimir mensagem de erro
    printMessage(input, msg) {

        // verificar a quantidade de erros
        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty == null) {
        let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);  
        }

     

    }

    // veridfica se o input é requerido
    required(input) {
        let inputValue = input.value;
        if (inputValue === '') {
            let errorMessage = `Este campo é obrigatório`;

            this.printMessage(input, errorMessage);
        }
    }

    //limpa as validações da tela
    cleanValidations(validation) {
        validation.forEach(element => element.remove());
    }

}




let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

//vendo que dispara as validações
submit.addEventListener('click', (e) => {
    e.preventDefault();
    validator.validate(form);
})
