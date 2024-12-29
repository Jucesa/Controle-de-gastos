

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
  return !(!password);
}

function register() {
  window.location.href = "./pages/register/register.html";
}

function login() {
  showLoading();
  firebase.auth().signInWithEmailAndPassword(
    form.email().value, form.password().value).then(response => {
    window.location.href = "./pages/home/home.html";
  }).catch(error => {
    hideLoading();
    alert(getErrorMessage(error))
  });
}

function recoverPassword(){
  showLoading()
  firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
    hideLoading()
    alert('Email enviado com sucesso!')
  }).catch(error => {
    hideLoading()
    alert(getErrorMessage(error))
  })
}

function getErrorMessage(error){
  if(error.code === "auth/invalid-credential"){
    return "Credenciais incorretas"
  }
  if(error.code === "auth/user-not-found"){
    return "Usuário não encontrado"
  }
  return error.message;
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
