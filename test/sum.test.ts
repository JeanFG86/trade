import { sum } from "../src/sum";

test("Deve somar dois numeros", () => {
  const result = sum(5, 10);
  expect(result).toBe(15);
});
