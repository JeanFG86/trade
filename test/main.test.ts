import axios from "axios";

axios.defaults.validateStatus = () => true;


describe("", () => {
  it("Deve criar uma conta", async () => {
    //Given
    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      document: "02131041055",
      password: "password123",
    };

    //When
    const responseSignup = await axios.post("http://localhost:3000/signup", input);
    const outputSignup = responseSignup.data;

    //Then
    expect(outputSignup.accountId).toBeDefined();
    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
    const outputGetAccount = responseGetAccount.data;
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);
  });

  it("Não deve criar uma conta se o nome for inválido", async () => {
    const input = {
      name: "John",
      email: "john.doe@example.com",
      document: "02131041055",
      password: "password123",
    };

    const responseSignup = await axios.post("http://localhost:3000/signup", input);
    expect(responseSignup.status).toBe(422);
    const outputSignup = responseSignup.data;
    expect(outputSignup.message).toBe("Invalid name");
  });

  it("Não deve criar uma conta se o email for inválido", async () => {
    const input = {
      name: "John Doe",
      email: "john.doe",
      document: "02131041055",
      password: "password123",
    };

    const responseSignup = await axios.post("http://localhost:3000/signup", input);
    expect(responseSignup.status).toBe(422);
    const outputSignup = responseSignup.data;
    expect(outputSignup.message).toBe("Invalid email");
  });

  // it("Não deve criar uma conta se o documento for inválido", async () => {
  //   const input = {
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     document: "12345678900",
  //     password: "password123",
  //   };

  //   const responseSignup = await axios.post("http://localhost:3000/signup", input);
  //   expect(responseSignup.status).toBe(422);
  //   const outputSignup = responseSignup.data;
  //   expect(outputSignup.message).toBe("Invalid document");
  // });
});
