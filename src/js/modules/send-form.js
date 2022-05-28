const send = function(event, php) {
  const parent = event.target.closest('.form');
  parent.classList.add('form--sending');

  //console.log("Отправка запроса");
  event.preventDefault ? event.preventDefault() : event.returnValue = false;
  //event.preventDefault();
  const req = new XMLHttpRequest();
  req.open('POST', php, true);
  req.onload = function() {
    if (req.status >= 200 && req.status < 400) {
      const json = JSON.parse(this.response);
      console.log(json);


        // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
        if (json.result == "success") {
          // Если сообщение отправлено
          //alert("Сообщение отправлено");
          parent.classList.remove('form--sending');
          parent.classList.add('form--done');

          setTimeout(() => {
            parent.classList.remove('form--done');
          }, 2500);
        } else {
          // Если произошла ошибка
          //alert("Ошибка. Сообщение не отправлено");
          parent.classList.remove('form--sending');
          parent.classList.add('form--error');

          setTimeout(() => {
            parent.classList.remove('form--error');
          }, 2500);
        }
      // Если не удалось связаться с php файлом
  } else {
    alert("Ошибка сервера. Номер: "+req.status);}
  };

  // Если не удалось отправить запрос. Стоит блок на хостинге
  req.onerror = function() {alert("Ошибка отправки запроса");};
  req.send(new FormData(event.target));
};

const changeValidityState = (field, isValid) => {
  const parent = field.closest('.field');

  if (parent !== null) {
    parent.classList[isValid ? 'remove' : 'add']('field--invalid');
  }
};

const validateName = (field) => {
  const isValid = field.value !== '';
  console.log(isValid)

  if (isValid) {
    changeValidityState(field, isValid);
    return isValid;
  }

  changeValidityState(field, isValid);
  return isValid;
};

const validatePhone = (field) => {
  const value = field.value;
  const string = value.split('').filter((item) => parseInt(item, 10)).join('');
  const isValid = string.length >= 11;

  if (isValid) {
    changeValidityState(field, isValid);
    return isValid;
  }

  changeValidityState(field, isValid);
  return isValid;
};

const validateEmail = (field) => {
  const value = field.value;
  const isValid = Boolean(String(value).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ));

  if (isValid) {
    changeValidityState(field, isValid);
    return isValid;
  }

  changeValidityState(field, isValid);
  return isValid;
};

const validationMap = {
  name: validateName,
  phone: validatePhone,
  email: validateEmail
};

const formIsValid = (form) => {
  const fields = form.querySelectorAll('.field--req input');

  fields.forEach((field) => {
    validationMap[field.name](field);
  });

  return form.querySelector('.field--invalid') === null;
};

const sendForm = () => {
  const forms = document.querySelectorAll('form');

  if (forms.length) {
    forms.forEach((form) => {
      form.elements.email.oninput = () => {
        validateEmail(form.elements.email)
      };
      form.elements.name.oninput = () => {
        validateName(form.elements.name)
      };
      form.elements.phone.oninput = () => {
        validatePhone(form.elements.phone)
      };

      form.onsubmit = (e) => {
        e.preventDefault();

        if (formIsValid(form)) {
          send(e, 'send.php');
        }

      }
    });
  }
};

export {
  sendForm
}
