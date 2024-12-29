const form = {
  email: () => document.getElementById('email'),
  password: () => document.getElementById('password'),
  confirmedPassword: () => document.getElementById('confirmedPassword'),
  loginButton: () => document.getElementById('login-button'),
  recoverPasswordButton: () => document.getElementById('recover-password-button'),
  registerButton: () => document.getElementById('register-button'),
  emailInvalidError: () => document.getElementById('email-invalid-error'),
  emailRequiredError: () => document.getElementById('email-required-error'),
  passwordRequiredError: () => document.getElementById('password-required-error'),
  passwordMinLenghtError: () => document.getElementById('password-min-length-error'),
  passwordDoesntMatchError: () => document.getElementById('password-doesnt-match-error')
}

function onChangeEmail(){
  const email = form.email().value;
  form.emailRequiredError().style.display = email ? "none" : "block";

  form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
  toggleRegisterButtonDisable();
}

function onChangePassword() {
  const password = form.password().value;

  form.passwordRequiredError().style.display = password ? "none" : "block";
  form.passwordMinLenghtError().style.display = password.length >= 6 ? "none" : "block";

  validatePasswordsMatch();
  toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
  validatePasswordsMatch();
  toggleRegisterButtonDisable();
}

function validatePasswordsMatch(){
  const confirmedPassword = form.confirmedPassword().value;
  const password = form.password().value;

  form.passwordDoesntMatchError().style.display =
    confirmedPassword === password ? "none" : "block";
}

function toggleRegisterButtonDisable(){
  form.registerButton().disabled = !isFormValid();
}

function isFormValid(){

  const email = form.email().value;
  if(!email || !validateEmail(email)){
    return false;
  }

  const password = form.password().value;
  if(!password  || password.length < 6){
    return false;
  }

  const confirmedPassword = form.confirmedPassword().value;
  if(password !== confirmedPassword){
    return false;
  }

  return true;
}

function registerUser(){
  showLoading();
  const email = form.email().value;
  const password = form.password().value;

  firebase.auth().createUserWithEmailAndPassword(email, password).
  then(() => {
    hideLoading();
    window.location.href = "../../pages/home/home.html"
  }).catch(error => {
    hideLoading();
    alert(getErrorMessage(error))
  })
}

function getErrorMessage(error){
  if(error.code === "auth/email-already-in-use"){
    return "Email já está em uso"
  }
  return error.message;
}
