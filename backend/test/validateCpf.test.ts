import { validateCpf } from "../src/validateCpf";

describe("validateCpf", () => {
  it("Deve retornar true para um CPF válido", () => {
    expect(validateCpf("12345678909")).toBe(true);
  });

  it("Deve retornar false para um CPF com todos os dígitos iguais", () => {
    expect(validateCpf("11111111111")).toBe(false);
  });

  it("Deve retornar false para um CPF com dígito verificador inválido", () => {
    expect(validateCpf("12345678900")).toBe(false);
  });

  it("Deve retornar false para um CPF vazio ou incompleto", () => {
    expect(validateCpf("")).toBe(false);
    expect(validateCpf("12345")).toBe(false);
  });
});
