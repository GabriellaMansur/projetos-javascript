// Seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");


//Nova funcionalidades
const openCloseGeneratorButton = document.querySelector("#open-generate-password");
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-button");

// Funções
const getLettersLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

const getLettersUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

const getNumbers = () => {
    return Math.floor(Math.random() * 10).toString();
}

const getSymbol = () => {
    const symbols = "(){}[]=<>/,.!@#$%^&*";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const generatePassword = (getLettersLowerCase, getLettersUpperCase, getNumbers, getSymbol) => {
    let password = "";

    // Segunda versão
    const passwordLength = +lengthInput.value;

    const generators = [];

    if(lettersInput.checked) {
        generators.push(getLettersLowerCase, getLettersUpperCase)
    }

    if(numbersInput.checked) {
        generators.push(getNumbers)
    }

    if(symbolsInput.checked) {
        generators.push(getSymbol)
    }

    if(generators.length === 0) {
        return
    }

    for(let i= 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue = generators[Math.floor(Math.random() * generators.length)]();

            password += randomValue;
        })
    }

    password = password.slice(0, passwordLength)
    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;

}

// Eventos
generatePasswordButton.addEventListener("click", () => {
    generatePassword(  getLettersLowerCase,
        getLettersUpperCase,
        getNumbers,
        getSymbol);
        
});

openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide");
});


copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();

    const password = generatedPasswordElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Senha copiada com sucesso";

        setTimeout(()=> {
            copyPasswordButton.innerText = "Copiar"
        }, 1000)
    });


});