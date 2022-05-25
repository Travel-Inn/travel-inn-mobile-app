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