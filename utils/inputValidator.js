import { errorToastNotifier } from "../widgets/toastNotification";

export function validateEmail(email) {
    // Email shouldn't be empty.
    if (!(email.trim())) {
        errorToastNotifier("Error", "Email shouldn't be empty");
        return false;
    }
    // Regex for matching email. Email should contain a domain, an @ and a name.
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    if (validRegex.test(email)){
        return true;
    } else{
        errorToastNotifier("Error", 'Email should be of a valid format. Eg: JohnDoe@gmail.com');
        return false;  
    }
}


export function validatePassword(password){
    // Password shouldn't be empty.
    if (!(password.trim())) {
        errorToastNotifier("Error", "Password shouldn't be empty.");
        return false;
    }
    // Password should be greater than 8.
    if (password.trim().length <9) {
        errorToastNotifier("Error","Password should be greater than 8 characters.");
        return false;
    }

    // Regex for matching password. Password should contain at least 
    // 1 uppercase and lowercase letter. It should also contain a number
    // and a symbol. Should be 9 or more.
    var securePasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{9,}$/;
    if (securePasswordRegex.test(password.trim())){
        return true;
    }else{
        errorToastNotifier("Error",'Password should contain a capital letter,\n smaller case letter, number and a symbol.');
        return false;
    }
}

export function validateText(name)
{
    // Text shouldn't be empty.
    if (!(name.trim())){
        errorToastNotifier("Error", "Name field shouldn't be empty.");
        return false;
    }
    // Regex for matching name. Name should contain only letters and a hyphen.
    var validRegex = /^[a-zA-Z -]+$/;
    if (validRegex.test(name)){
        return true;
    }else{
        errorToastNotifier("Error", 'Name field should contain only characters. Eg: John Doe');
        return false;
    }
}

export function validateNumber(phone, length)
{
    // Phone shouldn't be empty.
    if (!(phone.trim())){
        errorToastNotifier("Error", "Number field shouldn't be empty.");       
        return false;
    }
    // Phone should be 10 digits.
    if (phone.trim().length != length){
        errorToastNotifier("Error", "Number Field should be " + length +" characters.");
        return false;
    }
    // Regex for matching phone. Phone should be a number.
    var validRegex = /^[0-9]+$/;
    if (validRegex.test(phone)){
        return true;
    }else {
        errorToastNotifier("Error", "Number Field should be a number. ");
        return false;
    }
}

export function validatePrices(minPrice, maxPrice){

    // Min price shouldn't be empty.
     if (!minPrice) {
        errorToastNotifier("Error", "Minimum price shouldn't be empty.");
        return false;
    }
    // Min price shouldn't be less than 1.
    if (minPrice <= 0) {
        errorToastNotifier("Error", "Minimum price should start from 1.");
        return false;
    }

    // Max price shouldn't be empty.
     if (!maxPrice) {
        errorToastNotifier("Error", "Maximum price shouldn't be empty.");
        return false;
    }
    // Max price shouldn't be less than zero.
    if (maxPrice <= 0) {
        errorToastNotifier("Error", "Maximum price should start from 1.");
        return false;
    }

    // Min price shouldn't be greater than max price. 
    if (minPrice > maxPrice) {
        errorToastNotifier("Error", "Minimum price shouldn't be greater than Maximum Price");
        return false
    }
    // All checks passed.
    return true;
}

export function validateBedNum(bedNum){

    // Bed num shouldn't be empty.
    if (!bedNum){
        errorToastNotifier("Error", "Number of beds shouldn't be empty.");
        return false;
    }
    // Bed num shouldn't be less than zero.
    if (bedNum <= 0){
        errorToastNotifier("Error", "Number of beds should start from 1.");
        return false;
    }
    // All checks passed. 
    return true;
}

export function validateDates(currDate1, date1, date2){
    // Validate dates.
    if (date2 < currDate1){
        errorToastNotifier("Error", "CheckOut date cannot be less than current date.");
        return true;
		} else if (date1 < currDate1){
        errorToastNotifier("Error", "CheckIn date cannot be less than current date.");
        return true;
		}else if (date2 < date1){
        errorToastNotifier("Error", "CheckIn date cannot be greater than checkout date.");
        return true;
        }
        else return false;
}

export function validateCreditCard(cardNo, expiryDate, CVC, cardName) {
    // Validate credit card details.
     if (!validateNumber(cardNo, 16)) {
            return true;
		} else if (!expiryDate) { 
            errorToastNotifier("Error", "Expiry date cannot be empty.");
            return true;
		} else if (!validateNumber(CVC, 3)) {
            return true;
		} else if(!validateText(cardName)) {
            return true;
        } else return false;
}

export function validateGender(gender){
    gender = gender.trim().toLowerCase();
    // Validate gender
    if (gender == "male"){
        return true;
    } else if (gender == "female"){
        return true;
    }
    else{
        errorToastNotifier("Error", "Invalid input for Gender");
     return false;
    }
}