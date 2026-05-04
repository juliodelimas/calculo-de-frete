const form = document.querySelector("#freight-form");
const totalPriceElement = document.querySelector("#total-price");
const basePriceElement = document.querySelector("#base-price");
const weightPriceElement = document.querySelector("#weight-price");
const deliveryPriceElement = document.querySelector("#delivery-price");

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function renderResult(result) {
  totalPriceElement.textContent = formatCurrency(result.totalPrice);
  basePriceElement.textContent = formatCurrency(result.basePrice);
  weightPriceElement.textContent = formatCurrency(result.weightPrice);
  deliveryPriceElement.textContent = formatCurrency(result.deliveryPrice);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const weight = Number(formData.get("weight"));
  const region = formData.get("region");
  const deliveryType = formData.get("delivery");

  if (!Number.isFinite(weight) || weight < 0) {
    form.reportValidity();
    return;
  }

  const result = window.freight.calculateFreight({ weight, region, deliveryType });
  renderResult(result);
});
