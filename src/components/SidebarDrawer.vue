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

const routeHandler = (name: string) => {
  router.push({
    name,
  })
}

const isActiveRoute = (name: string) => {
  return route.name === name
}

const visibilityToggle = () => {
  visible.value = !visible.value
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
  <Drawer
    :visible="visible"
    :showCloseIcon="false"
    :class="`bg-white p-3 transition-all duration-300 ease-in-out ${expanded ? 'w-64' : 'w-20'}`"
  >
    <div class="flex flex-col gap-3 h-full overflow-x-hidden">
      <!-- Logos -->

      <div class="flex flex-row justify-center gap-3 min-h-[60px] w-full">
        <img src="https://placehold.co/70x50" alt="logo" class="rounded" />

        <img
          v-if="expanded"
          src="https://placehold.co/130x50"
          alt="logo"
          class="rounded"
        />
      </div>

      <!-- Action Buttons -->
      <div
        :class="`flex flex-row gap-2 px-2 items-center flex-wrap w-full min-h-[55px] ${isMobile ? 'justify-center' : 'justify-between'}`"
      >
        <Button
          v-show="expanded"
          class="bg-transparent p-2 text-2xl rounded"
          icon="pi pi-moon"
        />

        <Button
          v-show="expanded"
          class="bg-transparent p-2 text-2xl rounded"
          icon="pi pi-bell"
        />

        <Button
          class="bg-transparent p-2 text-2xl rounded"
          @click="expanded = !expanded"
          :icon="`pi ${expanded ? 'pi-chevron-left' : 'pi-chevron-right'}`"
          v-if="!isMobile"
        />
      </div>

      <!-- Menu Links -->

      <div class="flex flex-col gap-3 flex-1">
        <div
          v-for="menu in menus"
          :key="menu.to"
          class="flex flex-row gap-5 items-center p-4 transition-all min-h-[50px] rounded hover:bg-gray-200"
          @click="routeHandler(menu.to)"
          :class="isActiveRoute(menu.to) ? 'bg-red-200' : ''"
        >
          <i :class="menu.icon" class="text-xl"></i>

          <p v-if="expanded">{{ menu.label }}</p>
        </div>
      </div>
      <!-- Profile -->

      <div class="flex flex-col max-w-[100%]">
        <Transition name="slide-up-down">
          <div class="bg-gray-100 h-[200px] p-2" v-if="isUserProfileActive">
            <div
              class="flex flex-row justify-center items-center flex-wrap gap-2"
            >
              <i
                class="pi pi-dollar text-lg text-orange-500"
                title="Pricing"
              ></i>

              <p v-if="expanded" class="w-fit text-lg">Pricing</p>
            </div>
          </div>
        </Transition>

        <div
          class="flex flex-row items-center justify-center gap-2 bg-purple-200 p-2 cursor-pointer"
          @click="isUserProfileActive = !isUserProfileActive"
        >
          <i class="pi pi-user"></i>
          <p v-if="expanded">Username</p>
        </div>
      </div>
    </div>
  </Drawer>

  <div
    @click="visibilityToggle"
    v-if="isMobile"
    :class="`fixed transition-all duration-300 z-[10000] ease-in-out bottom-[50%] ${visible ? 'left-64' : 'left-0'} `"
  >
    <Button
      class="bg-gray-500 p-4 w-fit text-white"
      :icon="`pi ${visible ? 'pi-chevron-left' : 'pi-chevron-right'}`"
    />
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
