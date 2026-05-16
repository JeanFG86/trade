<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  name: "",
  email: "",
  document: "",
  password: "",
  accountId: "",
  message: ""
});

async function signup() {
  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form.value)
  });
  const output = await response.json();
  if(output.accountId) {
    form.value.accountId = output.accountId;
    form.value.message = "success";
  }  
  else {
    form.value.message = output.message;
  }
} 
</script>

<template>
  <div>
    <h1>Trading System</h1>
    <div>
      <input type="text" class="input-name" v-model="form.name" placeholder="Name"/>
      <input type="email" class="input-email" v-model="form.email" placeholder="Email"/>
      <input type="text" class="input-document" v-model="form.document" placeholder="Document"/>
      <input type="password" class="input-password" v-model="form.password" placeholder="Password"/>
      <button class="button-signup" @click="signup">Sign Up</button>
    </div>
    <div class="signup-message">
      <span class="span-message">{{ form.message }}</span>
    </div>
  </div>
</template>

<style scoped></style>
