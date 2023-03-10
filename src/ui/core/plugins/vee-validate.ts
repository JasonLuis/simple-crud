import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'Campo Obrigatório'
});

extend('email', {
  ...email,
  message: 'Digite um e-mail valido'
});
