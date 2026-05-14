const freightCases = [
  {
    id: "CT-001",
    weight: "5",
    region: "sul",
    delivery: "normal",
    expectedTotal: "R$ 10,00",
    expectedBase: "R$ 10,00",
    expectedWeight: "R$ 0,00",
    expectedDelivery: "R$ 0,00"
  },
  {
    id: "CT-002",
    weight: "5",
    region: "sul",
    delivery: "expressa",
    expectedTotal: "R$ 15,00",
    expectedBase: "R$ 10,00",
    expectedWeight: "R$ 0,00",
    expectedDelivery: "R$ 5,00"
  },
  {
    id: "CT-003",
    weight: "5",
    region: "centro-oeste",
    delivery: "normal",
    expectedTotal: "R$ 15,00",
    expectedBase: "R$ 15,00",
    expectedWeight: "R$ 0,00",
    expectedDelivery: "R$ 0,00"
  }
];

const extremeFreightCases = [
  {
    id: "T06",
    weight: "2147483648",
    expectedTotal: "R$ 4.294.967.296,00",
    expectedBase: "R$ 10,00",
    expectedWeight: "R$ 4.294.967.286,00",
    expectedDelivery: "R$ 0,00"
  },
  {
    id: "T07",
    weight: "2147483649",
    expectedTotal: "R$ 4.294.967.298,00",
    expectedBase: "R$ 10,00",
    expectedWeight: "R$ 4.294.967.288,00",
    expectedDelivery: "R$ 0,00"
  },
  {
    id: "T08",
    weight: "4294967296",
    expectedTotal: "R$ 8.589.934.592,00",
    expectedBase: "R$ 10,00",
    expectedWeight: "R$ 8.589.934.582,00",
    expectedDelivery: "R$ 0,00"
  },
  {
    id: "T09",
    weight: "4294967297",
    expectedTotal: "R$ 8.589.934.594,00",
    expectedBase: "R$ 10,00",
    expectedWeight: "R$ 8.589.934.584,00",
    expectedDelivery: "R$ 0,00"
  }
];

function fillFreightForm({ weight, region = "sul", delivery = "normal" }) {
  cy.get("#weight").clear().type(weight);
  cy.get("#region").select(region);
  cy.get(`input[name="delivery"][value="${delivery}"]`).check();
  cy.contains("button", "Calcular frete").click();
}

function assertFreightResult({
  expectedTotal,
  expectedBase,
  expectedWeight,
  expectedDelivery
}) {
  cy.get("#total-price").should("have.text", expectedTotal);
  cy.get("#base-price").should("have.text", expectedBase);
  cy.get("#weight-price").should("have.text", expectedWeight);
  cy.get("#delivery-price").should("have.text", expectedDelivery);
}

function assertResultFitsPanel() {
  cy.get(".result-panel").then(($panel) => {
    const panelRect = $panel[0].getBoundingClientRect();

    cy.get("#total-price").then(($total) => {
      const totalRect = $total[0].getBoundingClientRect();

      expect(totalRect.left).to.be.at.least(panelRect.left);
      expect(totalRect.right).to.be.at.most(panelRect.right);
    });
  });
}

describe("Calculadora de frete", () => {
  freightCases.forEach((testCase) => {
    it(`${testCase.id} calcula ${testCase.expectedTotal}`, () => {
      cy.visit("/");

      fillFreightForm(testCase);

      assertFreightResult(testCase);
    });
  });

  extremeFreightCases.forEach((testCase) => {
    it(`${testCase.id} calcula pesos extremos sem erro de console ou overflow`, () => {
      cy.visit("/", {
        onBeforeLoad(win) {
          cy.stub(win.console, "error").as("consoleError");
        }
      });

      fillFreightForm(testCase);

      assertFreightResult(testCase);
      cy.get("@consoleError").should("not.have.been.called");
      assertResultFitsPanel();
    });
  });
});
