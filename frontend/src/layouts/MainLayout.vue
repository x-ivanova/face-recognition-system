<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Face recognition system
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink';

export default {
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Camera',
          caption: 'look at the video source',
          icon: 'videocam',
          route: { name: 'camera' },
        },
        {
          title: 'Add person',
          caption: 'add person info to database',
          icon: 'person_add',
          route: { name: 'add-person' },
        },
        {
          title: 'Remove person',
          caption: 'remove person info from database',
          icon: 'person_add_disabled',
          route: { name: 'remove-person' },
        },
        {
          title: 'Find person',
          caption: 'find person info in database',
          icon: 'image_search',
          route: { name: 'find-person' },
        },
      ],
    };
  },
};
</script>
