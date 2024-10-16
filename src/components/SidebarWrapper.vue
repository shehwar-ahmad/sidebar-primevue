<script setup lang="ts">
import Drawer from 'primevue/drawer'

defineProps({
  expanded: Boolean,
  isMobile: Boolean,
})

const visible = defineModel('visible')
</script>

<template>
  <div v-if="isMobile">
    <Drawer
      v-model:visible="visible"
      :showCloseIcon="false"
      :class="`bg-gray-50 transition-all duration-300 ease-in-out ${expanded && visible ? 'w-64' : 'w-20'}`"
    >
      <slot />
    </Drawer>
  </div>

  <div
    v-if="!isMobile"
    :class="`absolute top-0 bg-gray-50 transition-all duration-300 ease-in-out flex flex-col min-h-screen ${visible && expanded ? 'w-64' : 'w-20'}`"
  >
    <slot />
  </div>
</template>
