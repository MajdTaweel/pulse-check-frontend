<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import { UserIcon, LogOutIcon } from 'lucide-vue-next'

const sessionStore = useSessionStore()
</script>

<template>
  <header class="flex justify-center px-2">
    <nav class="flex justify-between w-full max-w-5xl items-center">
      <div class="flex h-14 items-center object-contain">
        <img alt="Pulse Check logo" src="@/assets/logo-full.png" width="100" height="100" />
      </div>

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
            class="btn btn-ghost btn-sm w-full justify-start text-error"
          >
            <LogOutIcon class="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  </header>

  <main class="flex-1 flex min-h-screen items-center justify-center">
    <slot />
  </main>
</template>
