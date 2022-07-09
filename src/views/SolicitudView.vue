<template>
  <div>
    <v-layout :wrap="true">
      <v-flex xs12>
        <v-card dense
          elevation="2"
          class="pa-2"
          style="margin-top: 3em"
          outlined
          tile
        >
          <template>
            <v-snackbar v-model="snackbar" :timeout="timeout">
              {{ message }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="blue"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>

            <v-form
              @submit="submit"
              method="post"
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-container class="lighten-5 mb-6">
                <v-row>
                  <v-col cols="12" sm="6" md="3"></v-col>
                  <v-col cols="12" sm="6" md="6">
                    <h4>Testing</h4>
                  </v-col>
                  <v-col cols="12" sm="6" md="3"> </v-col>
                </v-row>

                <v-row>
                  <v-col outlined cols="12" sm="6" md="4"> </v-col>
                  <v-col outlined cols="12" sm="6" md="4">
                    <v-btn
                      type="submit"
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      @click="submit"
                      width="100%"
                    >
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

const API_HOST = process.env.VUE_APP_BACKEND_SERVER_URL;
console.log(API_HOST);
//VUE_APP_BACKEND_SERVER_URL
/**
 * 
 * iNVOCAR AL COMMIT, desde el commit
 * this.$store.commit("ADD_PERSON");
 * this.$store.commit([nombreMutación])
 * 
 */
export default {
  name: "SolicitudView",

  computed: {
   ...mapState(["counter"]),
  },

  data: () => ({
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

    async sendData(data) {
      try {
        const resp = await fetch(
          `${API_HOST}/api/send/mail/sendmailSolicitud`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        // console.log(err)
        const result = await resp.json();
        if (!result.error) {
          this.getToastSuccess("Se ha enviado la información");

          //     this.message = result.message;
          //    this.color = "success";
          //   this.snackbar = true;
        } else {
          throw new Error("Error en servidor");
        }
      } catch (err) {
        console.log("errr", err);
        this.message = "Error en servidor";
        this.color = "error";
        this.snackbar = true;
      }
    },
    // consume api php catalogo.

    async getBancos() {
      try {
        const resp = await fetch(`${API_HOST}/api/bancos`, {
          method: "GET",
        });
        return await resp.json();
      } catch (err) {
        console.log(err);
      }
    },

    async getTiposPersonas() {
      try {
        const resp = await fetch(`${API_HOST}/api/persona/tiposPersonas`, {
          method: "GET",
        });
        return await resp.json();
      } catch (err) {
        console.log(err);
      }
    },

    async getPaises() {
      try {
        const resp = await fetch(`${API_HOST}/api/persona/paises`, {
          method: "GET",
        });
        return await resp.json();
      } catch (err) {
        console.log(err);
      }
    },

    async getTipoProducto() {
      try {
        const resp = await fetch(`${API_HOST}/api/producto/tiposProductos`, {
          method: "GET",
        });
        return await resp.json();
      } catch (err) {
        console.log(err);
      }
    },

    async getTiposSolicitudes() {
      try {
        const resp = await fetch(
          `${API_HOST}/api/solicitud/reclamos/tiposSolicitudes`,
          {
            method: "GET",
          }
        );
        return await resp.json();
      } catch (err) {
        console.log(err);
      }
    },
    //
    async getTiposMotivos() {
      try {
        const resp = await fetch(`${API_HOST}/api/solicitud/reclamos/motivos`, {
          method: "GET",
        });
        return await resp.json();
      } catch (err) {
        console.log(err);
      }
    },
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
