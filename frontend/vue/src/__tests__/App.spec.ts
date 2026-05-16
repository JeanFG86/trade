import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('App', () => {
  it('Deve renderizar o componente principal', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Trading System')
  });

  it('Deve criar uma conta', async () => {
    const wrapper = mount(App);
    const input = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      document: "02131041055",
      password: "passworD123"
    }
    await wrapper.get(".input-name").setValue(input.name);
    await wrapper.get(".input-email").setValue(input.email);
    await wrapper.get(".input-document").setValue(input.document);
    await wrapper.get(".input-password").setValue(input.password);
    await wrapper.get(".button-signup").trigger("click");
    await sleep(200);
    expect(wrapper.get(".span-message").text()).toContain("success");
  })

  it("Deve validar nome", async () => {
    const wrapper = mount(App);
    await wrapper.get(".input-name").setValue("invalid-name");
    await wrapper.get(".button-signup").trigger("click");
    await sleep(200);
    expect(wrapper.get(".span-message").text()).toContain("Invalid name");
  })
})
