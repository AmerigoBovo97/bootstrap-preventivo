/* html variables */
const myForm = document.getElementById("quote-request");
const userName = document.getElementById("input-name");
const userSurname = document.getElementById("input-surname");
const userEmail = document.getElementById("input-email");
const jobType = document.getElementById("job-type");
const textArea = document.getElementById("text-area");
const userPromoCode = document.getElementById("input-promo-code");
const policyCheck = document.getElementById("policy-check");

/* logic varaibles */
const jobs = [ //cost per hour for each job category
    {
        jobCategory: "sviluppo backend", 
        feePerHour: 20.50
    },
    {
        jobCategory: "sviluppo frontend", 
        feePerHour: 15.30
    },
    {
        jobCategory: "analisi progettuale", 
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
    }
];
const hoursNeeded = 10 //hours needed to complete the job

/* functions */

function isValidEmail(email){
    
    const splittedEmail = email.split("@");
    if (splittedEmail.length !== 2) return false; //if email doesn't contain exactly 1 "@" it wont be a 2 long
    if (splittedEmail[0].length === 0 || splittedEmail[0].length > 64) return false; //first email part must be a 1 to 63 characters long string
    if (splittedEmail[1].length === 0 || splittedEmail[1].length > 255) return false; //second email part must be a 1 to 254 characters long string

    return true;
}

console.log(isValidEmail("amerigobovo@gmail.com"));
console.log(isValidEmail("amerigobovogmail.com"));
console.log(isValidEmail("amerigobovogmail.com@"));
console.log(isValidEmail("ameri gobovo@gmail.com"));
