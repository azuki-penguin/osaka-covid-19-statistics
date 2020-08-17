<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app >
      <v-list>
        <v-list-item
          v-for="route in routes"
          :key="route.name"
          :to="route.path"
          exact
          router >
          <v-list-item-content>
            <v-list-item-title v-text="route.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      clipped-left
      app >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>大阪府新型コロナウイルス統計情報</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>
    <v-footer
      app
    >
      <v-spacer />
      <span>
        Copyright &copy; 2020 SAW All Rights Reserved.
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    ...mapState('routing', ['routes']),
  },
};
</script>

