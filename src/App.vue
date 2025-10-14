<script setup lang="ts">
import { ref, watch } from 'vue'
import { configService } from '@/services/ConfigService.ts'
import { useRoute } from 'vue-router'

const route = useRoute()

const leftDrawerOpen = ref(false)

const activeMenu = ref(configService.getActiveMenu())

type MenuListItem = {
  icon: string
  label: string
  separator: boolean
  link: string
  iconColor?: string
  isDisabled?: boolean
}

const menuList: MenuListItem[] = [
  {
    icon: 'inbox',
    label: 'Account - coming soon',
    separator: true,
    link: '/account',
    isDisabled: true,
  },
  {
    icon: 'send',
    label: 'Dashboard',
    separator: false,
    link: '/',
  },
  {
    icon: 'send',
    label: 'My agent - coming soon',
    separator: false,
    link: '/',
    isDisabled: true,
  },
  {
    icon: 'send',
    label: 'Contracts',
    separator: true,
    link: '/contracts',
  },
  {
    icon: 'send',
    label: 'Agents',
    separator: false,
    link: '/agents',
  },
  {
    icon: 'send',
    label: 'Factions',
    separator: true,
    link: '/factions',
  },
  {
    icon: 'settings',
    label: 'Settings - coming soon',
    separator: false,
    link: '/',
    isDisabled: true,
  },
  {
    icon: 'logout',
    label: 'Logout',
    separator: false,
    link: '/logout',
  },
]

watch(
  () => route.name,
  (newRouteName) => {
    if (newRouteName) {
      const menuItem = menuList.find((item) => {
        return item.link === route.path
      })
      if (menuItem) {
        configService.setActiveMenu(menuItem.label)
        activeMenu.value = menuItem.label
      }
    }
  },
  { immediate: true },
)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Space-Traders
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              :to="menuItem.link"
              clickable
              :disable="menuItem.isDisabled"
              :active="menuItem.label === activeMenu"
              v-ripple
              @click="configService.setActiveMenu(menuItem.label)"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
