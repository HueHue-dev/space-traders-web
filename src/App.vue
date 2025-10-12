<script setup lang="ts">
import { ref } from 'vue'
import { useAccountStore } from '@/stores/account.ts'

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

type MenuListItem = {
  icon: string,
  label: string,
  separator: boolean,
  link: string,
  iconColor?: string,
}

const menuList: MenuListItem[] = [
  {
    icon: 'inbox',
    label: 'Dashboard',
    separator: true,
    link: '/'
  },
  {
    icon: 'send',
    label: 'Outbox',
    separator: false,
    link: '/'
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false,
    link: '/'
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true,
    link: '/'
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
    link: '/'
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false,
    link: '/'
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false,
    link: '/'
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
            <q-item :to="menuItem.link" clickable :active="menuItem.label === 'Outbox'" v-ripple>
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
