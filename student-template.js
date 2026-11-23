"use strict";

// Практическая работа №8
// Тема: события, формы и клиентская валидация.
// Заполните участки TODO.
// Имена функций и объект window.eventsFormsLab не изменяйте.

// 1. Счётчик по click.
function setupCounter() {
  const button = document.querySelector("#counter-button");
  const valueElement = document.querySelector("#counter-value");

  button.addEventListener("click", () => {
    let currentValue = parseInt(valueElement.textContent, 10) || 0;
    valueElement.textContent = currentValue + 1;
  });

  return button;
}

// 2. Предпросмотр текста по input.
function setupLivePreview() {
  const input = document.querySelector("#name-input");
  const preview = document.querySelector("#name-preview");

  input.addEventListener("input", (event) => {
    const val = event.target.value;
    preview.textContent = val.trim() === "" ? "—" : val;
  });

  return input;
}

// 3. Делегированное удаление пунктов.
function setupListDelegation() {
  const list = document.querySelector("#task-list");

  list.addEventListener("click", (event) => {
    // Проверяем, что клик был именно по кнопке с классом remove-button
    if (event.target.classList.contains("remove-button")) {
      // Находим родительский li и удаляем его
      const li = event.target.closest("li");
      if (li) {
        li.remove();
      }
    }
  });

  return list;
}

// 4. Чтение формы.
function readRegistrationForm() {
  const form = document.querySelector("#registration-form");
  const elements = form.elements;

  return {
    name: elements.name.value.trim(),
    email: elements.email.value.trim(),
    age: Number(elements.age.value),
    course: elements.course.value,
    agree: elements.agree.checked
  };
}

// 5. Валидация.
function validateRegistration(data) {
  const errors = [];

  if (data.name.length < 2) {
    errors.push("Имя должно содержать минимум 2 символа.");
  }
  if (!data.email.includes("@")) {
    errors.push("Email должен содержать символ @.");
  }
  if (!Number.isFinite(data.age) || data.age < 16) {
    errors.push("Возраст должен быть числом и не меньше 16.");
  }
  if (!data.agree) {
    errors.push("Необходимо согласиться с условиями.");
  }

  return errors;
}

// 6. Обработка submit.
function setupRegistrationForm() {
  const form = document.querySelector("#registration-form");
  const errorsList = document.querySelector("#form-errors");
  const resultParagraph = document.querySelector("#form-result");

  form.addEventListener("submit", (event) => {
    // Отменяем перезагрузку страницы
    event.preventDefault();

    // Очищаем предыдущие результаты
    errorsList.innerHTML = "";
    resultParagraph.textContent = "";

    // Получаем данные и валидируем
    const data = readRegistrationForm();
    const errors = validateRegistration(data);

    if (errors.length > 0) {
      // Выводим ошибки списком
      errors.forEach((errorText) => {
        const li = document.createElement("li");
        li.textContent = errorText;
        errorsList.append(li);
      });
    } else {
      // Выводим успешный результат
      resultParagraph.textContent = `Регистрация принята: ${data.name}`;
    }
  });

  return form;
}

window.eventsFormsLab = {
  setupCounter,
  setupLivePreview,
  setupListDelegation,
  readRegistrationForm,
  validateRegistration,
  setupRegistrationForm,
};