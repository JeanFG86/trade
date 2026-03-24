import { validatePassword } from "../src/validatePassword";

describe("validatePassword", () => {
  it("Não deve validar senha com menos de 8 caracteres", () => {
    expect(validatePassword("Pass123")).toBe(false);
  });

  it("Não deve validar senha sem letra minúscula", () => {
    expect(validatePassword("PASSWORD123")).toBe(false);
  });

  it("Não deve validar senha sem letra maiúscula", () => {
    expect(validatePassword("password123")).toBe(false);
  });

  it("Não deve validar senha sem número", () => {
    expect(validatePassword("Password")).toBe(false);
  });

  it("Deve validar senha correta", () => {
    expect(validatePassword("PassworD123")).toBe(true);
  });
});
