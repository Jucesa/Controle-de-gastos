function onChangeEmail(){
  toggleButtonsDisable();
  toggleEmailErrors();
}

function onChangePassword(){
  toggleButtonsDisable();
  togglePasswordErrors();
}

function isEmailValid(){
  const email = form.email().value;
  if(!email){
    return false;
  }
  return validateEmail(email)
}

function isPasswordValid(){
  const password = form.password().value;
  if(!password){
    return false;
  }
  return true;
}

function login() {
  window.location.href = "./pages/home/home.html";
}

function register() {
  window.location.href = "./pages/register/register.html";
}

function toggleButtonsDisable(){
  const emailValid = isEmailValid();
  form.recoverPasswordButton().disabled = !emailValid;

  const passwordValid = isPasswordValid();
  form.loginButton().disabled = !emailValid || !passwordValid;
}

function toggleEmailErrors(){
  const email = form.email().value;
  form.emailRequiredError().style.display = email ? "none" : "block";
  form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors(){
  const password = form.password().value;
  form.passwordRequiredError().style.display = password ? "none" : "block"
}

const form = {
  email: () => document.getElementById('email'),
  password: () => document.getElementById('password'),
  loginButton: () => document.getElementById('login-button'),
  recoverPasswordButton: () => document.getElementById('recover-password-button'),
  registerButton: () => document.getElementById('register-button'),
  emailInvalidError: () => document.getElementById('email-invalid-error'),
  emailRequiredError: () => document.getElementById('email-required-error'),
  passwordRequiredError: () => document.getElementById('password-required-error')
}
