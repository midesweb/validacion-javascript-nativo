import '@dile/dile-inline-feedback/dile-inline-feedback.js';

document.addEventListener("DOMContentLoaded", function() {
  const formulario = document.getElementById('formulario');
  
  formulario.addEventListener('submit', validar)

  document.querySelectorAll('.hideErrorOnFoucs').forEach( item => {
    item.addEventListener('focus', evento => clearError(evento.target.id));
  });

  document.querySelectorAll('.hideErrorOnkeydown').forEach( item => {
    item.addEventListener('keydown', evento => clearError(evento.target.id));
  });
});

function validar(evento) {
  evento.preventDefault();

  const mensajeError = document.getElementById('mensajeError');

  let nombre = document.getElementById('nombre').value;
  let email = document.getElementById('email').value;
  let categoria = document.getElementById('categoria').value;
  let terminos = document.getElementById('terminos').checked;

  let hasError = false;

  // Validación de los campos
  if(nombre.trim() === '') {
    showError('nombre', 'El campo nombre no puede estar vacío.');
    hasError = true;
  } else {
    clearError('nombre')
  }

  if(email.trim() === '') {
    showError('email', 'El campo email no puede estar vacío.');
    hasError = true;
  }  else {
    clearError('email')
  }

  if(!validarEmail(email)) {
    showError('email', 'El formato del email no es válido.');
    hasError = true;
  } else {
    clearError('email')
  }

  if(categoria === '') {
      showError('categoria', 'Debe seleccionar una categoría.');
      hasError = true;
  } else {
    clearError('categoria')
  }

  if(!terminos) {
      showError('terminos', 'Debe aceptar los términos y condiciones.');
      hasError = true;
  } else {
    clearError('terminos')
  }

  if(hasError) {
    mensajeError.negativeFeedback('Hay errores en el formulario')
  } else {
    mensajeError.clear();
    // evento.target.submit();
  }
}

function validarEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function showError(field, message) {
  document.getElementById(field + '-error').innerText = message;
  document.getElementById(field).classList.add('errored');
}
function clearError(field) {
  document.getElementById(field + '-error').innerText = '';
  document.getElementById(field).classList.remove('errored');
}
