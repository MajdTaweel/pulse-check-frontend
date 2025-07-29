<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import { LogOutIcon, UserIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const sessionStore = useSessionStore()
</script>

<template>
  <header class="flex justify-center px-2">
    <nav class="flex justify-between w-full max-w-5xl items-center">
      <button
        class="flex h-14 items-center object-contain cursor-pointer hover:opacity-80 transition-opacity"
        @click="router.push('/')"
      >
        <img alt="Pulse Check logo" src="@/assets/logo-full.png" width="100" height="100" />
      </button>

      <button
        class="btn btn-ghost"
        popovertarget="profile-menu"
        style="anchor-name: --profile-menu"
      >
        <UserIcon class="w-4 h-4" />
      </button>
      <ul
        class="dropdown dropdown-end menu w-max rounded-box bg-base-200 shadow-sm"
        popover
        id="profile-menu"
        style="position-anchor: --profile-menu"
      >
        <li>
          <button
            @click="sessionStore.logout"
            class="btn btn-ghost btn-sm w-full justify-start text-error group"
          >
            <LogOutIcon class="w-4 h-4" />
            <span class="ml-1">Logout</span>
            <span class="hidden group-hover:inline text-base"> 🥺</span>
          </button>
        </li>
      </ul>
    </nav>
  </header>

  <main class="flex-1 flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
    <slot />
  </main>
</template>
