const USD = 6.09;
const EUR = 6.25;
const GBP = 7.45;

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");


function updateClock() {
  const clockElement = document.getElementById("clock");
  const now = new Date();
  const time = now.toLocaleTimeString("pt-BR", { hour12: false });
  clockElement.textContent = `Horário atual: ${time}`;
}

setInterval(updateClock, 1000);
updateClock();


form.onsubmit = (event) => {
  event.preventDefault();
  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
};

function convertCurrency(amount, price, symbol) {
  try {
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;
    let total = amount * price;
    total = formatCurrencyBRL(total).replace("R$", "");
    result.textContent = `${total} Reais`;
    footer.classList.add("show-result");
  } catch (error) {
    footer.classList.remove("show-result");
    console.log(error);
    alert("Não foi possível converter. Tente novamente mais tarde.");
  }
}

function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
