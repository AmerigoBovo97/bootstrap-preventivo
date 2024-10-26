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
            YHDNU32,
            JANJC63,
            PWKCN25,
            SJDPO96,
            POCIE24
        ],
        discount: 25
    }
];
const hoursNeeded = 10 //hours needed to complete the job

