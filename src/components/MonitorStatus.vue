<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ status: 'pending' | 'up' | 'down' }>()

const statusText = computed(() => {
  switch (props.status) {
    case 'up':
      return 'Online'
    case 'down':
      return 'Offline'
    default:
      return 'Pending'
  }
})

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
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="tooltip" :data-tip="statusText">
      <div class="size-5 rounded-full" :class="statusColor" />
    </div>
  </div>
</template>
