/* html variables */
const myForm = document.getElementById("quote-request");
const userName = document.getElementById("input-name");
const userSurname = document.getElementById("input-surname");
const userEmail = document.getElementById("input-email");
const jobType = document.getElementById("job-type");
const textArea = document.getElementById("text-area");
const userPromoCode = document.getElementById("input-promo-code");
const policyCheck = document.getElementById("policy-check");
const resultDisplayer = document.getElementById("result-displayer")


/* logic varaibles ==================================================================================*/

const jobs = [ //cost per hour for each job category
    {
        jobCategory: "Sviluppo Backend", 
        feePerHour: 20.50
    },
    {
        jobCategory: "Sviluppo Frontend", 
        feePerHour: 15.30
    },
    {
        jobCategory: "Analisi Progettuale", 
        feePerHour: 33.60
    },
];
const promoCodes = [ //discont codes
    {
        code: [
            "YHDNU32",
            "JANJC63",
            "PWKCN25",
            "SJDPO96",
            "POCIE24"
        ],
        discount: 25
    },{
        code: [
            "UJHNM78",
            "LKOPI90",
            "BHGFR45",
            "MNJYP67",
            "ZXCVB89",
            "QWERT12",
            "ASDFG34"
        ],
        discount: 30
    },{
        code: [
            "VCXZL56",
            "PLMNJ23",
            "ERTHY19"
        ],
        discount: 15
    }
];
const hoursNeeded = 10 //hours needed to complete the job


/* functions ========================================================================================*/

/**
 * return true if is a valid email
 *
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email){
    
    const splittedEmail = email.split("@");
    if (splittedEmail.length !== 2) return false; //if email doesn't contain exactly 1 "@" it wont be a 2 long
    if (splittedEmail[0].length === 0 || splittedEmail[0].length > 64) return false; //first email part must be a 1 to 63 characters long string
    if (splittedEmail[1].length === 0 || splittedEmail[1].length > 255) return false; //second email part must be a 1 to 254 characters long string
    if (email.includes(" ")) return false; //an email can not contain spaces

    return true;
}


/**
 * add opptions to a select in html
 *
 * @param {object} select // the select element to add the option to
 * @param {string} optionContent // visible text for the option in the dropdown
 * @param {string} optionValue // hidden value used when submitting the form
 */
function addSelectOption(select, optionContent, optionValue){
    const option = elementCreator("option");
    option.innerHTML = optionContent;
    option.value = optionValue;
    select.appendChild(option);
}


for(job of jobs){
    addSelectOption(jobType, job.jobCategory, job.jobCategory);
}


/**
 * returs false if any item of an array is false
 *
 * @param {array} inputs
 * @returns {boolean}
 */
function requiredInputs(inputs){
    for (input of inputs){
        if (!input){
            return false;
        }
    }
    return true;
}


/**
 * return the discount if the promocode is valid
 *
 * @param {string} code // the code to check
 * @returns {number} // return the discount if the code is valid or 0 if it is not
 */
function isValidPromoCode(code){
    for (codeType of promoCodes){
        if (codeType.code.includes(code)) return codeType.discount;
    }
    return 0;
}


/**
 * return the final price the costumer will pay with 2 decimals
 *
 * @param {number} jobPrice // the fee per hour 
 * @param {number} hours // amount of hours needed to complete the job
 * @param {number} discount // the amount in percentage that will be detracted
 * @returns {number} // result with 2 decimals
 */
function totalCalculator(jobPrice, hours, discount){

    let total = jobPrice * hours;

    if (discount !== 0){
        total -= total * discount / 100;
    }
    return total.toFixed(2);
}


/**
 * create a tage element with classes and content
 *
 * @param {string} [tag="div"] // the tag
 * @param {array} [classes=[]] // the classes
 * @param {*} [content=""] // the innerHtml
 * @returns {string} // html element
 */
function elementCreator(tag = "div", classes = [], content = ""){

    const element = document.createElement(tag);
    for(classs of classes){
        element.classList.add(classs);
    }
    element.innerHTML = content;
    return element;
}


/**
 * gets the price and an element and add to DOM
 *
 * @param {number} price
 * @param {object} element
 */
function finalPriceElement(price, element){

    element.classList.remove("d-none")
    const integerPart = Math.floor(price);
    const decimalPart = (integerPart % 1).toFixed(2).slice(2);

    const divElement = elementCreator("div", ["text-center"])

    const divTitle = elementCreator("div", ["mb-0", "fw-bold", "fs-6"], "Prezzo finale")

    const spanIntegerElement = elementCreator("span", ["fw-bold", "fs-5"], `&#8364;${integerPart}`)

    const spanDecimalElement = elementCreator("span", ["fs-6", "text-secondary"], `,${decimalPart}`)

    divElement.appendChild(divTitle);
    divElement.appendChild(spanIntegerElement);
    divElement.appendChild(spanDecimalElement);

    element.innerHTML = "";
    element.appendChild(divElement);
}


/* logic ============================================================================================*/

myForm.addEventListener("submit", function(event){

    event.preventDefault();

    const name = userName.value;
    const surname = userSurname.value;
    const email = userEmail.value;
    const job = jobType.value;
    const privacyPolicy = policyCheck.checked;

    if (requiredInputs([name, surname, job, privacyPolicy]) && isValidEmail(email)){

        const promoCode = userPromoCode.value;
        const jobPrice = jobs.find(jobPrice => jobPrice.jobCategory === job).feePerHour;
        const discount = isValidPromoCode(promoCode);
        const price = totalCalculator(jobPrice, hoursNeeded, discount);

        finalPriceElement(price, resultDisplayer);


    }else{
    alert("compila tutti i campi necessari");
    }

})