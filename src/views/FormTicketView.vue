<template>
  <v-card >
    <template>


      <v-form @submit="submit" method="post" ref="form">
        <v-container class="lighten-5 mb-6">
          <h3>Tickets</h3>
          <v-row dense>
            <v-col class="d-flex" cols="12" sm="3">
              <v-select :items="getCiudades" v-model="ciudad_origen" item-text="name" item-value="id"
                label="Cuidad origen" outlined></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="3">
              <v-select :items="getCiudades" v-model="ciudad_destino" item-text="name" item-value="id"
                label="Cuidad destino" outlined>
              </v-select>
            </v-col>

            <v-col class="d-flex" cols="12" sm="3">
              <v-menu ref="menu" v-model="menuFechaSalida" :close-on-content-click="false" transition="scale-transition"
                offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="fechaSalida" label="Fecha salida" prepend-icon="mdi-calendar" readonly
                    v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="fechaSalida" :active-picker.sync="activePickerFechaSalida" min="1983-05-29"
                  max="2025-05-29" @change="saveFechaSalida"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col class="d-flex" cols="12" sm="3">
              <v-menu ref="menu" v-model="menuFechaRetorno" :close-on-content-click="false"
                transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="fechaRetorno" label="Fecha retorno" prepend-icon="mdi-calendar" readonly
                    v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="fechaRetorno" :active-picker.sync="activePickerFechaRetorno" min="1983-05-29"
                  max="2025-05-29" @change="saveFechaRetorno"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>


          <v-row>
            <v-col outlined cols="12" sm="6" md="4"> </v-col>
            <v-col outlined cols="12" sm="6" md="4">
              <v-btn type="submit" color="success" class="mr-4" @click="submit" width="100%">
                Buscar tickets
                <v-icon right dark>
                  mdi-cloud-upload
                </v-icon>
              </v-btn>
            </v-col>
            <v-col outlined cols="12" sm="6" md="4"> </v-col>
          </v-row>
        </v-container>
      </v-form>
      <!-- <button class="action-button" @click="showToast">Show toast</button> -->
    </template>
  </v-card>
</template>

<script>
import moment from 'moment'
import { createToastInterface } from "vue-toastification";
import { mapState } from "vuex";

export default {
  name: "FormTicketView",
  computed: {
    ...mapState(["filtros"]),
    getCiudades() {
      return this.$store.getters.getCiudades;
    }
  },

  data: () => ({

    fechaSalida: null,
    activePickerFechaSalida: null,
    activePickerFechaRetorno: null,
    fechaRetorno: null,
    menuFechaSalida: false,
    menuFechaRetorno: false,

    items: [],
    ciudad_origen: null,
    ciudad_destino: null,
  }),


  methods: {
    saveFechaSalida(date) {
      console.log(date)
    },
    saveFechaRetorno(date) {
      console.log(date)
    },
    submit: function (e) {
      e.preventDefault();
      if (!this.fechaSalida) {
        this.getToastWarning('Fecha de salida es requerida')
        return
      }
      this.$store.commit("SET_CIUDAD_ORIGEN", this.ciudad_origen);
      this.$store.commit("SET_CIUDAD_DESTINO", this.ciudad_destino);

      //Route
     this.$router.push('listado')
    },


    getToastSuccess(msg) {
      createToastInterface({
        timeout: 2000,
      }).success(msg);
    },
      getToastWarning(msg) {
      createToastInterface({
        timeout: 2000,
      }).warning(msg);
    },
  },
  watch: {
    fechaSalida(newValue, oldValue) {
      if (newValue != oldValue) {
        this.$store.commit("SET_FECHA_SALIDA", newValue);
      }
    },
    fechaRetorno(newValue, oldValue) {
      if (!moment(this.fechaSalida).isSameOrBefore(newValue)) {
        this.getToastWarning('Fecha salida debe ser menor')
        return
      }

      if (newValue != oldValue && moment(this.fechaSalida).isSameOrBefore(newValue)) {
        this.$store.commit("SET_FECHA_RETORNO", newValue);
      }
    }
  },

  async mounted() {

  },
};
</script>
