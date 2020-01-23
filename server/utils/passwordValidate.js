/*
At least one upper case English letter
At least one lower case English letter
At least one digit
At least one special character
Minimum eight in length
 */

function passwordValidate(password) {
  const re = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/;
  console.log(password);
  console.log(re.test(re));
  return re.test(re);
}

module.exports = passwordValidate;
