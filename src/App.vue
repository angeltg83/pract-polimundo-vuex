<template>
  <v-app>

    <v-app-bar app dense dark elevation="1" outlined>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        Publimundo
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app>
      <strong style="font-size: 11px">Prueba de frontEnd Polimundo - Desarrollado por: Angel Tigua Z - Año : {{ hoy }}
      </strong>
    </v-footer>
  </v-app>
</template>

<script>
import moment from 'moment'
export default {
  
  data() {
    return {
      hoy: moment().format('YYYY'),
      drawer: null,
    };
  },
};
</script>
