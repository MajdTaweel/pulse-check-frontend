<script setup lang="ts">
import { getMonitor, type Monitor } from '@/api/monitors'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const monitorId = route.params.id
const router = useRouter()

const monitor = ref<Monitor | null>(null)

onMounted(async () => {
  monitor.value = await getMonitor(Number(monitorId))

  if (!monitor.value) {
    router.push('/')
  }
})
</script>

<template>
  <div>
    <h1>Monitor Details {{ monitor?.name }}</h1>
  </div>
</template>
