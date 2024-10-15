<script setup lang="ts">
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'

import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <div class="">
    <Drawer v-model:visible="visible" header="Drawer" class="bg-white  p-1 py-20">
      <p class="text-center text-red-500">Lorlat.</p>
    </Drawer>
    <div>
      <Button @click="visible = true" class="bg-green-500 p-4 rounded m-4"> Show Sidebar </Button>
    </div>
  </div>
</template>
