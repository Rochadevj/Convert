
function updateClock() {
  const clockElement = document.getElementById("clock");
  const now = new Date();
  const time = now.toLocaleTimeString("pt-BR", { hour12: false });
  clockElement.textContent = `Horário atual: ${time}`;
}

setInterval(updateClock, 1000);
updateClock();



const apiKey = "5bcf632a1d3270bbaf4f6a9e";
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/BRL`;

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

let exchangeRates = {};

async function fetchExchangeRates() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Falha ao obter as cotações");
        const data = await response.json();
        exchangeRates = data.conversion_rates; 
    } catch (error) {
        console.error("Erro ao buscar as taxas de câmbio:", error);
        alert("Não foi possível obter as cotações. Tente novamente mais tarde.");
    }
}


function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g;
    amount.value = amount.value.replace(hasCharactersRegex, "");
});


form.onsubmit = (event) => {
    event.preventDefault();
    const selectedCurrency = currency.value;

    if (!exchangeRates[selectedCurrency]) {
        alert("Moeda selecionada não está disponível.");
        return;
    }

    const rate = exchangeRates[selectedCurrency];
    const symbol = selectedCurrency === "USD" ? "US$" : selectedCurrency === "EUR" ? "€" : "£";
    convertCurrency(amount.value, rate, symbol);
};


function convertCurrency(amount, rate, symbol) {
    try {
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(1 / rate)}`;
        const total = amount / rate; // Divide pelo rate para conversão correta
        result.textContent = `${formatCurrencyBRL(total)} Reais`;
        footer.classList.add("show-result");
    } catch (error) {
        footer.classList.remove("show-result");
        console.error("Erro ao converter moeda:", error);
        alert("Não foi possível converter. Tente novamente mais tarde.");
    }
}

fetchExchangeRates();
