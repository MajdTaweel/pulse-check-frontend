<script setup lang="ts">
import { getMonitor, type Monitor } from '@/api/monitors'
import { onMounted, ref, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MonitorStatus from '@/components/MonitorStatus.vue'

const route = useRoute()
const monitorId = route.params.id
const router = useRouter()

const monitor = ref<Monitor | null>(null)
let pollingInterval: number | null = null
let timeUpdateInterval: number | null = null
const currentTime = ref(new Date())

const formatRelativeTime = (dateString: string | undefined) => {
  if (!dateString) return 'Never'

  const date = new Date(dateString)
  const diffInSeconds = Math.floor((currentTime.value.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 5) {
    return 'Just now'
  } else if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
}

const lastCheckedRelative = computed(() => {
  return formatRelativeTime(monitor.value?.last_checked_at)
})

const fetchMonitor = async () => {
  try {
    const monitorData = await getMonitor(Number(monitorId))
    if (monitorData) {
      monitor.value = monitorData
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error('Failed to fetch monitor:', error)
  }
}

const startPolling = () => {
  // Fetch every 15 seconds for more frequent updates on details page
  pollingInterval = setInterval(fetchMonitor, 15000)
}

const stopPolling = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval)
    pollingInterval = null
  }
}

const startTimeUpdates = () => {
  // Update current time every second
  timeUpdateInterval = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
}

const stopTimeUpdates = () => {
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval)
    timeUpdateInterval = null
  }
}

onMounted(async () => {
  await fetchMonitor()
  startPolling()
  startTimeUpdates()
})

onUnmounted(() => {
  stopPolling()
  stopTimeUpdates()
})
</script>

<template>
  <div class="min-h-full bg-base-200 p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <button @click="router.push('/')" class="btn btn-ghost btn-sm mb-4">
          ← Back to Monitors
        </button>
        <div class="flex items-center gap-4 mb-4">
          <h1 class="text-3xl font-bold text-base-content">{{ monitor?.name }}</h1>
          <MonitorStatus v-if="monitor" :status="monitor.last_status" />
        </div>
        <p class="text-base-content/70">{{ monitor?.url }}</p>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Status Card -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Current Status
            </h2>
            <div class="flex items-center gap-3 mb-4">
              <MonitorStatus v-if="monitor" :status="monitor.last_status" />
              <span class="text-lg font-semibold capitalize">{{ monitor?.last_status }}</span>
            </div>
            <div class="text-sm text-base-content/70">
              <p>
                Last checked:
                <span class="font-mono min-w-[120px] inline-block">{{ lastCheckedRelative }}</span>
              </p>
              <p>
                Check interval:
                <span class="font-mono min-w-[120px] inline-block"
                  >{{ monitor?.check_interval }} seconds</span
                >
              </p>
            </div>
          </div>
        </div>

        <!-- Uptime Card -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              Uptime Statistics
            </h2>

            <!-- Last 24h -->
            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium">Last 24 hours</span>
                <span class="text-lg font-bold">{{ monitor?.uptime.last_24h }}%</span>
              </div>
              <progress
                class="progress progress-primary w-full"
                :value="monitor?.uptime.last_24h"
                max="100"
              ></progress>
            </div>

            <!-- Last 7 days -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium">Last 7 days</span>
                <span class="text-lg font-bold">{{ monitor?.uptime.last_7d }}%</span>
              </div>
              <progress
                class="progress progress-secondary w-full"
                :value="monitor?.uptime.last_7d"
                max="100"
              ></progress>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Info Card -->
      <div class="card bg-base-100 shadow-xl mt-6">
        <div class="card-body">
          <h2 class="card-title">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Monitor Information
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label">
                <span class="label-text font-medium">Monitor ID</span>
              </label>
              <p class="text-base-content/70">{{ monitor?.id }}</p>
            </div>
            <div>
              <label class="label">
                <span class="label-text font-medium">Created</span>
              </label>
              <p class="text-base-content/70">
                {{
                  monitor?.created_at
                    ? new Date(monitor.created_at).toLocaleDateString()
                    : 'Unknown'
                }}
              </p>
            </div>
            <div>
              <label class="label">
                <span class="label-text font-medium">Last Updated</span>
              </label>
              <p class="text-base-content/70">
                {{
                  monitor?.updated_at
                    ? new Date(monitor.updated_at).toLocaleDateString()
                    : 'Unknown'
                }}
              </p>
            </div>
            <div>
              <label class="label">
                <span class="label-text font-medium">Check Interval</span>
              </label>
              <p class="text-base-content/70">{{ monitor?.check_interval }} seconds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
