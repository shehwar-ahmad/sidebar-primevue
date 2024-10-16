<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'
import { useWindowSize } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640)

const visible = ref(false)
const expanded = ref(false)
const isUserProfileActive = ref(false)

const menus = [
  {
    label: 'Home',
    icon: 'pi pi-home',
    to: 'home',
  },
  {
    label: 'Users',
    icon: 'pi pi-users',
    to: 'users',
  },
  {
    label: 'Global',
    icon: 'pi pi-globe',
    to: 'global',
  },
  {
    label: 'Charts',
    icon: 'pi pi-chart-bar',
    to: 'charts',
  },
]

const toggleVisibility = () => {
  visible.value = !visible.value
}

const routeHandler = (name: string) => {
  router.push({
    name,
  })
}

const isActiveRoute = (name: string) => {
  return route.name === name
}

watchEffect(() => {
  if (isMobile.value) {
    visible.value = false
    expanded.value = true
  } else {
    visible.value = true
    expanded.value = false
  }
})
</script>

<template>
  <!-- Sidebar Drawer -->
  <Drawer :visible="visible" :showCloseIcon="false"
    :class="`bg-white p-3 transition-all duration-300 ease-in-out ${expanded ? 'w-64' : 'w-20'}`">
    <div class="flex flex-col gap-3 h-full">
      <!-- Logos -->

      <div class="flex flex-row justify-center gap-3 h-[50px] w-full">
        <img src="https://placehold.co/70x50" width="70" height="50" alt="logo" class="rounded" />

        <img v-if="expanded" src="https://placehold.co/130x50" height="100%" alt="logo" class="rounded" />
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-row gap-2 px-2  items-center flex-wrap"
        :class="isMobile ? 'justify-center' : 'justify-between'">
        <Button v-if="expanded" class="bg-transparent p-2 text-2xl rounded" icon="pi pi-moon" />

        <Button v-if="expanded" class="bg-transparent p-2 text-2xl rounded" icon="pi pi-bell" />

        <Button class="bg-transparent p-2 text-2xl rounded" @click="expanded = !expanded"
          :icon="`pi ${expanded ? 'pi-chevron-left' : 'pi-chevron-right'}`" v-if="!isMobile" />
      </div>

      <!-- Menu Links -->

      <div class="flex flex-col gap-2 flex-1">
        <div v-for="menu in menus" :key="menu.to" class="flex flex-row gap-2 items-center p-2 hover:bg-gray-200"
          @click="routeHandler(menu.to)" :class="isActiveRoute(menu.to) ? 'bg-red-200' : ''">
          <i :class="menu.icon" class="text-xl"></i>

          <p v-if="expanded">{{ menu.label }}</p>
        </div>
      </div>
      <!-- Profile -->

      <div class="flex flex-col transition-all duration-300 ease-in-out">
        <Transition name="slide-up-down">
          <div class="transition-all duration-300 ease-in-out bg-gray-100 h-[200px]" v-if="isUserProfileActive">
            Billing
          </div>
        </Transition>

        <div class="flex flex-row items-center justify-center gap-2 bg-purple-200 p-2 cursor-pointer"
          @click="isUserProfileActive = !isUserProfileActive">
          <i class="pi pi-user"></i>
          <p v-if="expanded">Username</p>
        </div>
      </div>
    </div>
  </Drawer>

  <div v-if="isMobile"
    :class="`fixed transition-all duration-300 ease-in-out bottom-[50%] ${visible ? 'left-64' : 'left-0'} `"
    @click="toggleVisibility">
    <Button class="bg-gray-500 p-4 w-[70px] text-white"
      :icon="`pi ${visible ? 'pi-chevron-left' : 'pi-chevron-right'}`" />
  </div>

  <div class="absolute top-0 right-0 text-sm">
    <p>Visible: {{ visible }}</p>
    <p>Expanded: {{ expanded }}</p>
  </div>
</template>

<style scoped>
.slide-up-down-enter-active,
.slide-up-down-leave-active {
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
}

.slide-up-down-enter-from {
  transform: translateY(10%);
  opacity: 0;
}

.slide-up-down-leave-to {
  transform: translateY(10%);
  opacity: 0;
}
</style>
