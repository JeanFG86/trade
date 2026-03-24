import { validateEmail } from "../src/validateEmail";

describe("validateEmail", () => {
  it("Não deve validar email sem @", () => {
    expect(validateEmail("johndoe.com")).toBe(false);
  });

  it("Não deve validar email sem domínio", () => {
    expect(validateEmail("johndoe@")).toBe(false);
  });

  it("Não deve validar email sem terminação válida", () => {
    expect(validateEmail("johndoe@example")).toBe(false);
  });

  it("Deve validar email correto", () => {
    expect(validateEmail("john.doe@example.com")).toBe(true);
  });
});
