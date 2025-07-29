<script setup lang="ts">
import { listMonitors, type Monitor } from '@/api/monitors'
import MonitorStatus from '@/components/MonitorStatus.vue'
import { ClockIcon, MoreHorizontalIcon, PlusIcon } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

      <li
        v-for="monitor in monitors"
        :key="monitor.id"
        class="list-row cursor-pointer transition-colors hover:bg-neutral-50/5"
        @click="router.push(`/monitors/${monitor.id}`)"
      >
        <div class="flex items-center">
          <MonitorStatus :status="monitor.last_status" />
        </div>
        <div>
          <div class="font-medium">{{ monitor.name }}</div>
          <div class="text-xs text-base-content/60">{{ monitor.url }}</div>
        </div>

        <div
          class="flex items-center tooltip"
          :data-tip="`Checked every ${monitor.check_interval} seconds`"
        >
          <div class="flex items-center gap-1 text-xs text-base-content/60">
            <ClockIcon class="size-[1.2em]" />
            {{ monitor.check_interval }}s
          </div>
        </div>

        <button class="btn btn-square btn-ghost">
          <MoreHorizontalIcon class="size-[1.2em]" />
        </button>
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
