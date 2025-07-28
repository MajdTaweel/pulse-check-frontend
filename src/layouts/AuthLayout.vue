<template>
  <main class="flex h-screen w-screen">
    <div class="flex flex-col items-center justify-center bg-base-100 flex-1">
      <img alt="Pulse Check logo" src="@/assets/logo-full.png" width="256" height="256" />
    </div>

    <div class="flex-1 flex items-center justify-center">
      <slot />
    </div>
  </main>
</template>
