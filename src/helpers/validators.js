//переменная с ограничениями по символам, разрешенные символы буквы, цифры, дефис
const validCharacters = /^[A-Za-z0-9-]+$/;

// Валидация имени
export const validateName = (name) => name.length >= 3 && name.length <= 20 && validCharacters.test(name);

// Валидация email
export const validateEmail = (email) =>  email.trim() !== '' && email.includes('@');


// Валидация пароля
export const validatePassword = (password) => password.length >= 3 && password.length <= 20 && validCharacters.test(password);


// Валидация подтверждения пароля
export const validatePasswordConfirmation = (password, passwordConfirmation) => password === passwordConfirmation;
