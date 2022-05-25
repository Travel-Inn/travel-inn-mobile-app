export function validateEmail(email) {
    // Email shouldn't be empty.
    if (!(email.trim())) {
        console.log("Email shouldn't be empty");
        return false;
    }
    // Regex for matching email. Email should contain a domain, an @ and a name.
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    if (validRegex.test(email)){
        return true;
    } else{
        console.log('Email should be of a valid format. Eg: JohnDoe@gmail.com');
        return false;  
    }
}

export function validatePassword(password){
    // Password shouldn't be empty.
    if (!(password.trim())) {
        console.log("password shouldn't be empty.")
        return false;
    }
    // Password should be greater than 8.
    if (password.trim().length <9) {
        console.log("Password should be greater than 8 characters.")
        return false;
    }

    // Regex for matching password. Password should contain at least 
    // 1 uppercase and lowercase letter. It should also contain a number
    // and a symbol. Should be 9 or more.
    var securePasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{9,}$/;
    if (securePasswordRegex.test(password.trim())){
        return true;
    }else{
        console.log('Password should contain a capital letter, smaller case letter, number and a symbol.');
        return false;
    }
}

export function validateText(name)
{
    // Text shouldn't be empty.
    if (!(name.trim())){
        console.log("Name field shouldn't be empty.")
        return false;
    }
    // Regex for matching name. Name should contain only letters and a hyphen.
    var validRegex = /^[a-zA-Z -]+$/;
    if (validRegex.test(name)){
        return true;
    }else{
        console.log('Name field should contain only characters. Eg: John Doe');
        return false;
    }
}


export function validatePhone(phone)
{
    // Phone shouldn't be empty.
    if (!(phone.trim())){
        console.log("Phone should not be empty.");
        return false;
    }
    // Phone should be 10 digits.
    if (phone.trim().length != 10){
        console.log("Phone should be 10 characters.");
        return false;
    }
    // Regex for matching phone. Phone should be a number.
    var validRegex = /^[0-9]+$/;
    if (validRegex.test(phone)){
        return true;
    }else {
        console.log("Phone field should be a number. Only Ghanaian numbers are supported. eg:0547642811");
        return false;
    }
}


export function validatePrices(minPrice, maxPrice){
    // Converts string-number('2) to a number type and string-text('temp') to an empty number.
    const newMinPrice = Number(minPrice.trim());
    const newMaxPrice = Number(maxPrice.trim());

    // Min price shouldn't be empty.
     if (!newMinPrice) {
        console.log("Minimum price shouldn't be empty.");
        return false;
    }
    // Min price shouldn't be less than 1.
    if (newMinPrice <= 0) {
        console.log("Minimum price should start from 1.");
        return false;
    }

    // Max price shouldn't be empty.
     if (!newMaxPrice) {
        console.log("Maximum price shouldn't be empty.");
        return false;
    }
    // Max price shouldn't be less than zero.
    if (newMaxPrice <= 0) {
        console.log("Maximum price should start from 1.");
        return false;
    }

    // Min price shouldn't be greater than max price. 
    if (newMinPrice > newMaxPrice) {
        console.log("Minimum price shouldn't be greater than Maximum Price.");
        return false
    }
    // All checks passed.
    return true;
}

export function validateBedNum(bedNum){
    const newBedNum = Number(bedNum);

    // Bed num shouldn't be empty.
    if (!newBedNum){
        console.log("Number of beds shouldn't be empty.");
        return false;
    }
    // Bed num shouldn't be less than zero.
    if (newBedNum <= 0){
        console.log("Number of beds should start from 1.");
        return false;
    }
    // All checks passed. 
    return true;
}