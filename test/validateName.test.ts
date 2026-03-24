import { validateName } from "../src/validateName";

describe("validateName", () => {
  it("Não deve validar nome sem sobrenome", () => {
    expect(validateName("John")).toBe(false);
  });

  it("Não deve validar nome com números", () => {
    expect(validateName("John1 Doe")).toBe(false);
  });

  it("Não deve validar string vazia", () => {
    expect(validateName("")).toBe(false);
  });

  it("Deve validar nome completo válido", () => {
    expect(validateName("John Doe")).toBe(true);
  });
});
