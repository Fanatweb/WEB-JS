const calcButton = document.getElementById("calc-btn");
const sumInput = document.getElementById("sum-input");
const vipCheckbox = document.getElementById("vip-checkbox");
const currencySelect = document.getElementById("currency-select");
const resultText = document.getElementById("result-text");

// Функция расчета скидки
function applyDiscount(total, isGold) {
  if (total > 4000 || isGold) {
    return total * 0.9; // Скидка 10%
  } else {
    return total; // Без изменений
  }
}

calcButton.addEventListener("click", function() {
  let userSum = Number(sumInput.value);
  
  if (userSum <= 0) {
    resultText.textContent = "Пожалуйста, введите корректную сумму заказа!";
    resultText.style.color = "red";
    return;
  }
  
  let isUserVip = vipCheckbox.checked;
  
  // 1. Считаем цену со скидкой в рублях
  let finalPriceInRub = applyDiscount(userSum, isUserVip);
  
  // 2. Готовим переменные для конвертации
  let selectedCurrency = currencySelect.value;
  let convertedPrice = finalPriceInRub; // Проверь букву c в слове Price!
  let currencySign = "руб.";
  
  const USD_RATE = 90;
  const EUR_RATE = 98;
  
  // 3. Конвертируем, если выбрана иностранная валюта
  if (selectedCurrency === "USD") {
    convertedPrice = finalPriceInRub / USD_RATE;
    currencySign = "$";
  } else if (selectedCurrency === "EUR") {
    convertedPrice = finalPriceInRub / EUR_RATE;
    currencySign = "€";
  }
  
  // 4. Округляем и выводим результат
  let roundedPrice = convertedPrice.toFixed(2);
  
  resultText.textContent = `Итого к оплате: ${roundedPrice} ${currencySign}`;
  resultText.style.color = "limegreen";
});