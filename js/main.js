/* html variables */
const myForm = document.getElementById("quote-request");
const userName = document.getElementById("input-name");
const userSurname = document.getElementById("input-surname");
const userEmail = document.getElementById("input-email");
const jobType = document.getElementById("job-type");
const textArea = document.getElementById("text-area");
const userPromoCode = document.getElementById("input-promo-code");
const policyCheck = document.getElementById("policy-check");

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
    const option = document.createElement("option");
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


/* logic ============================================================================================*/

myForm.addEventListener("submit", function(event){

    event.preventDefault();

    const name = userName.value;
    const surname = userSurname.value;
    const email = userEmail.value;
    const job = jobType.value;
    const promoCode = userPromoCode.value;
    const privacyPolicy = policyCheck.checked;

    if (requiredInputs([name, surname, job, privacyPolicy]) && isValidEmail(email)){

        const jobPrice = jobs.find(jobPrice => jobPrice.jobCategory === job).feePerHour;
        const discount = isValidPromoCode(promoCode);
        console.log(totalCalculator(jobPrice, hoursNeeded, discount));

    }else{
    alert("compila tutti i campi necessari");
    }

})