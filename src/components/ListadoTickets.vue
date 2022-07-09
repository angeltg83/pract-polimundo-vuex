<template>
  <v-container fluid>

    <v-row dense>
      <v-col v-for="card in getTickets" :key="card.aereolinea" :cols="card.flex">
        <v-card>
          <v-img :src="card.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px">
            <v-card-title v-text="card.aereolinea"></v-card-title>
            <v-card-text>

              <v-row dense>
                <v-col col="12" sm="4">
                  <label for="">Precio</label>
                  <v-chip color="success">{{ card.precio }}</v-chip>
                </v-col>

                <v-col col="12" sm="4">
                  <label for="">Escalas</label>
                  <v-chip>{{ card.numeroEscalas }}</v-chip>
                </v-col>

                <v-col col="12" sm="4">
                  <label for="">Duración</label>
                  <v-chip color="info">{{ card.duracionVuelo }}</v-chip> Horas
                </v-col>

              </v-row>

            </v-card-text>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
    getTickets() {
      return this.$store.getters.getTickets;
    }
  },

  data: () => ({

  }),
}
</script>
