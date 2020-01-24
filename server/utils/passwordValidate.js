/*
At least one upper case English letter
At least one lower case English letter
At least one digit
At least one special character
Minimum eight in length
 */

function passwordValidate(password) {
  const re = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

  return re.test(password);
}

module.exports = passwordValidate;
