const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateFreight } = require("../public/freight");

const decisionTable = [
  {
    name: "frete 10, ate 5 kg, sem entrega expressa",
    input: { weight: 3, region: "sul", deliveryType: "normal" },
    expected: { basePrice: 10, weightPrice: 0, deliveryPrice: 0, totalPrice: 10 }
  },
  {
    name: "frete 10, ate 5 kg, com entrega expressa",
    input: { weight: 3, region: "sul", deliveryType: "expressa" },
    expected: { basePrice: 10, weightPrice: 0, deliveryPrice: 5, totalPrice: 15 }
  },
  {
    name: "frete 10, acima de 5 kg, sem entrega expressa",
    input: { weight: 8, region: "sul", deliveryType: "normal" },
    expected: { basePrice: 10, weightPrice: 6, deliveryPrice: 0, totalPrice: 16 }
  },
  {
    name: "frete 10, acima de 5 kg, com entrega expressa",
    input: { weight: 8, region: "sul", deliveryType: "expressa" },
    expected: { basePrice: 10, weightPrice: 6, deliveryPrice: 8, totalPrice: 24 }
  },
  {
    name: "frete 15, ate 5 kg, sem entrega expressa",
    input: { weight: 3, region: "centro-oeste", deliveryType: "normal" },
    expected: { basePrice: 15, weightPrice: 0, deliveryPrice: 0, totalPrice: 15 }
  },
  {
    name: "frete 15, ate 5 kg, com entrega expressa",
    input: { weight: 3, region: "centro-oeste", deliveryType: "expressa" },
    expected: { basePrice: 15, weightPrice: 0, deliveryPrice: 7.5, totalPrice: 22.5 }
  },
  {
    name: "frete 15, acima de 5 kg, sem entrega expressa",
    input: { weight: 8, region: "centro-oeste", deliveryType: "normal" },
    expected: { basePrice: 15, weightPrice: 6, deliveryPrice: 0, totalPrice: 21 }
  },
  {
    name: "frete 15, acima de 5 kg, com entrega expressa",
    input: { weight: 8, region: "centro-oeste", deliveryType: "expressa" },
    expected: { basePrice: 15, weightPrice: 6, deliveryPrice: 10.5, totalPrice: 31.5 }
  },
  {
    name: "frete 20, ate 5 kg, sem entrega expressa",
    input: { weight: 3, region: "norte", deliveryType: "normal" },
    expected: { basePrice: 20, weightPrice: 0, deliveryPrice: 0, totalPrice: 20 }
  },
  {
    name: "frete 20, ate 5 kg, com entrega expressa",
    input: { weight: 3, region: "norte", deliveryType: "expressa" },
    expected: { basePrice: 20, weightPrice: 0, deliveryPrice: 10, totalPrice: 30 }
  },
  {
    name: "frete 20, acima de 5 kg, sem entrega expressa",
    input: { weight: 8, region: "norte", deliveryType: "normal" },
    expected: { basePrice: 20, weightPrice: 6, deliveryPrice: 0, totalPrice: 26 }
  },
  {
    name: "frete 20, acima de 5 kg, com entrega expressa",
    input: { weight: 8, region: "norte", deliveryType: "expressa" },
    expected: { basePrice: 20, weightPrice: 6, deliveryPrice: 13, totalPrice: 39 }
  }
];

test("calcula frete conforme tabela de decisao", async (t) => {
  for (const { name, input, expected } of decisionTable) {
    await t.test(name, () => {
      assert.deepEqual(calculateFreight(input), expected);
    });
  }
});
