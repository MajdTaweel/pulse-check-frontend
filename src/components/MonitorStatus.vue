<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ status: 'pending' | 'up' | 'down' }>()

const statusColor = computed(() => {
  switch (props.status) {
    case 'up':
      return 'bg-success'
    case 'down':
      return 'bg-error'
    default:
      return 'bg-warning'
  }
})

const statusAnimation = computed(() => {
  switch (props.status) {
    case 'up':
      return 'animate-ping'
    case 'down':
      return 'animate-bounce'
    default:
      return 'animate-pulse'
  }
})
</script>

<template>
  <div class="flex items-center gap-2">
    <div
      class="relative flex size-2.5 tooltip"
      :data-tip="status.charAt(0).toUpperCase() + status.slice(1)"
    >
      <span
        class="absolute h-full w-full rounded-full opacity-75"
        :class="`${statusColor} ${statusAnimation}`"
      />
      <span v-if="status === 'up'" class="size-2.5 rounded-full" :class="statusColor" />
    </div>
  </div>
</template>
