import { toastNotifier } from "../widgets/toastNotification";

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
        toastNotifier();
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

export function validateNumber(phone, length)
{
    // Phone shouldn't be empty.
    if (!(phone.trim())){
        console.log("Number Field should not be empty.");
        return false;
    }
    // Phone should be 10 digits.
    if (phone.trim().length != length){
        console.log("Number Field should be " + {length} +" characters.");
        return false;
    }
    // Regex for matching phone. Phone should be a number.
    var validRegex = /^[0-9]+$/;
    if (validRegex.test(phone)){
        return true;
    }else {
        console.log("Number Field should be a number. ");
        return false;
    }
}

export function validatePrices(minPrice, maxPrice){

    // Min price shouldn't be empty.
     if (!minPrice) {
        console.log("Minimum price shouldn't be empty.");
        return false;
    }
    // Min price shouldn't be less than 1.
    if (minPrice <= 0) {
        console.log("Minimum price should start from 1.");
        return false;
    }

    // Max price shouldn't be empty.
     if (!maxPrice) {
        console.log("Maximum price shouldn't be empty.");
        return false;
    }
    // Max price shouldn't be less than zero.
    if (maxPrice <= 0) {
        console.log("Maximum price should start from 1.");
        return false;
    }

    // Min price shouldn't be greater than max price. 
    if (minPrice > maxPrice) {
        console.log("Minimum price shouldn't be greater than Maximum Price.");
        return false
    }
    // All checks passed.
    return true;
}

export function validateBedNum(bedNum){

    // Bed num shouldn't be empty.
    if (!bedNum){
        console.log("Number of beds shouldn't be empty.");
        return false;
    }
    // Bed num shouldn't be less than zero.
    if (bedNum <= 0){
        console.log("Number of beds should start from 1.");
        return false;
    }
    // All checks passed. 
    return true;
}

export function validateDates(currDate1, date1, date2){
    // Validate dates.
    if (date2 < currDate1){
		console.log("CheckOut date cannot be less than current date.");
        return true;
		} else if (date1 < currDate1){
		console.log("CheckIn date cannot be less than current date.")
        return true;
		}else if (date2 < date1){
		console.log("CheckIn date cannot be greater than checkOut date.");
        return true;
        }
        else return false;
}

export function validateCreditCard(cardNo, expiryDate, CVC, cardName) {
    // Validate credit card details.
     if (!validateNumber(cardNo, 16)) {
            return true;
		} else if (!expiryDate) { 
			console.log("Expiry date shouldn't be empty.");
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
        console.log("Invalid input for Gender");
     return false;
    }
}