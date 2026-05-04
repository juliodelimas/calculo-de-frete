(function freightModule(globalScope) {
  const basePricesByRegion = {
    sul: 10,
    sudeste: 10,
    "centro-oeste": 15,
    norte: 20,
    nordeste: 20
  };

  function calculateFreight({ weight, region, deliveryType }) {
    const basePrice = basePricesByRegion[region];

    if (basePrice === undefined) {
      throw new Error("Regiao invalida.");
    }

    if (!Number.isFinite(weight) || weight < 0) {
      throw new Error("Peso invalido.");
    }

    const extraWeight = Math.max(0, weight - 5);
    const weightPrice = extraWeight * 2;
    const subtotal = basePrice + weightPrice;
    const deliveryPrice = deliveryType === "expressa" ? subtotal * 0.5 : 0;
    const totalPrice = subtotal + deliveryPrice;

    return {
      basePrice,
      weightPrice,
      deliveryPrice,
      totalPrice
    };
  }

  const freight = {
    basePricesByRegion,
    calculateFreight
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = freight;
  }

  globalScope.freight = freight;
})(typeof window !== "undefined" ? window : globalThis);
