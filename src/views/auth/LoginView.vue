<script setup lang="ts">
import { ref } from 'vue'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()

const login = async () => {
  await sessionStore.login(form.value.email, form.value.password)
}

const form = ref({
  email: '',
  password: '',
})
</script>

<template>
  <router-view name="Layout">
    <div class="card bg-neutral w-96">
      <div class="card-body">
        <h1 class="card-title mb-4">Login</h1>

        <form class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <input
              type="email"
              class="input w-full"
              placeholder="Email"
              autocomplete="email"
              v-model="form.email"
            />
            <input
              type="password"
              class="input w-full"
              placeholder="Password"
              autocomplete="current-password"
              v-model="form.password"
            />
          </div>

          <button type="submit" @click.prevent="login" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </router-view>
</template>
