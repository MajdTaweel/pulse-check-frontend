<script setup lang="ts">
import { listMonitors, type Monitor } from '@/api/monitors'
import MonitorStatus from '@/components/MonitorStatus.vue'
import { EyeIcon, PlusIcon } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

const monitors = ref<Monitor[]>([])

onMounted(async () => {
  monitors.value = await listMonitors()
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <ul class="list bg-base-200 rounded-box shadow-md sm:min-w-lg">
      <li class="p-4 pb-2 text-xs tracking-wide">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-1 opacity-60">
            <div class="font-medium">Monitors</div>
            <div class="text-xs text-base-content/60">({{ monitors.length }})</div>
          </div>

          <div class="tooltip" data-tip="Add Monitor">
            <button class="btn btn-square btn-ghost">
              <PlusIcon class="size-[1.2em]" />
            </button>
          </div>
        </div>
      </li>

      <li v-for="monitor in monitors" :key="monitor.id" class="list-row">
        <div class="flex items-center">
          <MonitorStatus :status="monitor.last_status" />
        </div>
        <div>
          <div class="font-medium">{{ monitor.name }}</div>
          <div class="text-xs text-base-content/60">{{ monitor.url }}</div>
        </div>

        <div class="tooltip" data-tip="View">
          <button class="btn btn-square btn-ghost">
            <EyeIcon class="size-[1.2em]" />
          </button>
        </div>
      </li>

      <li v-if="monitors.length === 0" class="list-row flex flex-col items-center gap-8">
        <div class="font-medium">No monitors yet</div>

        <button class="btn btn-sm btn-primary">
          <PlusIcon class="size-[1.2em]" />
          Add a monitor to get started
        </button>
      </li>
    </ul>
  </div>
</template>
