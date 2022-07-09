<template>
  <div>
    <v-layout :wrap="true">
      <v-flex xs12>
        <v-card dense elevation="2" class="pa-2" style="margin-top: 3em" outlined tile>
          <template>
            <v-snackbar v-model="snackbar" :timeout="timeout">
              {{ message }}

              <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                  Close
                </v-btn>
              </template>
            </v-snackbar>

            <v-form @submit="submit" method="post" ref="form" v-model="valid" lazy-validation>
              <v-container class="lighten-5 mb-6">

                <v-row dense>
                  <v-col class="d-flex" cols="12" sm="3">
                    <v-select :items="items" label="Cuidad origen" outlined></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="3">
                    <v-select :items="items" label="Cuidad destino" outlined></v-select>
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="3">
                    <v-menu ref="menu" v-model="menuFechaSalida" :close-on-content-click="false"
                      transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="fechaSalida" label="Fecha salida" prepend-icon="mdi-calendar" readonly
                          v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="fechaSalida" :active-picker.sync="activePickerFechaSalida"
                        min="1983-05-29" max="2025-05-29" @change="save"></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="3">
                    <v-menu ref="menu" v-model="menuFechaRetorno" :close-on-content-click="false"
                      transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="fechaRetorno" label="Fecha retorno" prepend-icon="mdi-calendar" readonly
                          v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="fechaRetorno" :active-picker.sync="activePickerFechaRetorno"
                        min="1983-05-29" max="2025-05-29" @change="save"></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>





                <v-row>
                  <v-col outlined cols="12" sm="6" md="4"> </v-col>
                  <v-col outlined cols="12" sm="6" md="4">
                    <v-btn type="submit" :disabled="!valid" color="success" class="mr-4" @click="submit" width="100%">
                      Submit
                    </v-btn>
                  </v-col>
                  <v-col outlined cols="12" sm="6" md="4"> </v-col>
                </v-row>
              </v-container>
            </v-form>
            <!-- <button class="action-button" @click="showToast">Show toast</button> -->
          </template>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
//import { config } from "../config/config";
// eslint-disable-next-line
import { createToastInterface } from "vue-toastification";
//const { API_HOST } = config;
import { mapState } from "vuex";

//VUE_APP_BACKEND_SERVER_URL
/**
 * 
 * iNVOCAR AL COMMIT, desde el commit
 * this.$store.commit("ADD_PERSON");
 * this.$store.commit([nombreMutación])
 * 
 */
export default {
  name: "BuscadorView",
  computed: {
    ...mapState(["counter"]),
  },

  data: () => ({

    fechaSalida: null,
    activePickerFechaSalida: null,
    activePickerFechaRetorno: null,
    fechaRetorno: null,
    menuFechaSalida: false,
    menuFechaRetorno: false,





    snackbar: false,
    message: "Exito",
    timeout: 2000,
    color: "success",

    valid: true,
    nombres: "",
    nombresRules: [
      (v) => !!v || "Nombres es requerido",
      // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

    identificacion: "",
    identificacionRules: (v) => {
      if (!v.trim()) return true;
      if (v.length > 13) return "Solo debe tener al menos 10 o 13 números";
      if (!isNaN(parseFloat(v))) return true;
      return "Debe ingresar números";
    },
    apellidoPaterno: "",
    apellidoPaternoRules: [(v) => !!v || "Apellido es requerido"],

    apellidoMaterno: "",
    apellidoMaternoRules: [(v) => !!v || "Apellido es requerido"],

    telefono: "",
    telefonoRules: (v) => {
      if (!v.trim()) return true;
      if (v.length > 10) return "Solo debe tener 10 números";
      if (!isNaN(parseFloat(v))) return true;
      return "Debe ingresar números";
    },
    rucRules: (v) => {
      if (!v.trim()) return true;
      if (v.length > 13) return "Solo debe tener 13 números";
      if (!isNaN(parseFloat(v))) return true;
      return "Debe ingresar números";
    },
    ciudad: "",
    email: "",
    observacion: "",
    emailRules: [
      (v) => !!v || "Correo es requerido",
      (v) => /.+@.+\..+/.test(v) || "Correo no válido",
    ],
    representanteLegal: "",
    razonSocial: "",
    representanteLegalRules: [(v) => !!v || "Nombre representante requerido"],
    tipoPersona: null,
    tiposPersona: [],

    tipoSolicitud: null,
    tiposSolicitud: [],

    motivo: null,
    tiposMotivos: [],
    entidadBancaria: null,
    entidadesBancarias: [],

    tipoServicio: null,
    tiposServicios: [],
    paises: [],
    pais: null,
  }),

  methods: {
    showToast() {
      console.log("toast", this.$toast);
    },
    submit: function (e) {
      e.preventDefault();
      const formData = {
        email: this.email,
        telefono: this.telefono,
        identificacion: this.identificacion,
        tipo_persona_id: this.tipoPersona,
        nombres: this.nombres,
        apellido_paterno: this.apellidoPaterno,
        apellido_materno: this.apellidoMaterno,
        razon_social: this.razonSocial,
        representante_legal: this.representanteLegal,
        tipo_motivo_id: this.motivo,
        tipo_productos_id: this.tipoServicio,
        entidad_bancaria_id: this.entidadBancaria,
        pais_id: this.pais,
        observacion: this.observacion,
        tipo_solicitud_id: this.tipoSolicitud,
        ciudad: this.ciudad,
      };

      this.sendData(formData);
    },


    // consume api php catalogo.


    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    getToastSuccess(msg) {
      createToastInterface({
        timeout: 2000,
      }).success(msg);
    },
  },
  async mounted() {
    this.entidadesBancarias = await this.getBancos();
    this.tiposPersona = await this.getTiposPersonas();
    this.paises = await this.getPaises();
    this.tiposServicios = await this.getTipoProducto();
    this.tiposSolicitud = await this.getTiposSolicitudes();
    this.tiposMotivos = await this.getTiposMotivos();
  },
};
</script>
