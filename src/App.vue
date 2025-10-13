<script setup lang="ts">
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

const activeMenu = ref('Dashboard')
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

type MenuListItem = {
  icon: string,
  label: string,
  separator: boolean,
  link: string,
  iconColor?: string,
  isDisabled?: boolean,
}

const menuList: MenuListItem[] = [
  {
    icon: 'inbox',
    label: 'Account - coming soon',
    separator: true,
    link: '/account',
    isDisabled: true
  },
  {
    icon: 'send',
    label: 'Dashboard',
    separator: false,
    link: '/'
  },
  {
    icon: 'send',
    label: 'My agent',
    separator: true,
    link: '/my/agent'
  },
  {
    icon: 'send',
    label: 'Agents',
    separator: false,
    link: '/factions'
  },
  {
    icon: 'send',
    label: 'Factions',
    separator: true,
    link: '/factions'
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
    link: '/settings'
  }
]

</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Space-Traders
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item :to="menuItem.link" clickable :disable="menuItem.isDisabled" :active="menuItem.label === activeMenu" v-ripple @click="activeMenu = menuItem.label">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
