<template>
  <v-card>
    <template>
      <v-form @submit="submit" method="post" ref="form">
        <v-container class="lighten-5 mb-6">
          <h3>Listado de libros</h3>
          <v-row dense>
            <v-col class="d-flex" cols="12" sm="3">
              <v-select
                :items="category"
                v-model="categorySelect"
                item-text="name"
                item-value="category_id"
                label="Categorias"
                outlined
              ></v-select>
            </v-col>
          </v-row>

          <!-- datatable -->
          <v-row>
            <v-col>
              <v-data-table
                :loading="loadGrid"
                :headers="headers"
                :items="books"
                :items-per-page="5"
                class="elevation-1"
              ></v-data-table>
            </v-col>
          </v-row>

          <!-- <v-row>
            <v-col outlined cols="12" sm="6" md="4"> </v-col>
            <v-col outlined cols="12" sm="6" md="4">
              <v-btn
                type="submit"
                color="success"
                class="mr-4"
                @click="submit"
                width="100%"
              >
                Buscar tickets
                <v-icon right dark> mdi-cloud-upload </v-icon>
              </v-btn>
            </v-col>
            <v-col outlined cols="12" sm="6" md="4"> </v-col>
          </v-row> -->
        </v-container>
      </v-form>
      <!-- <button class="action-button" @click="showToast">Show toast</button> -->
    </template>
  </v-card>
</template>

<script>
import { createToastInterface } from "vue-toastification";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "FormTicketView",
  computed: {
    ...mapState(["filtros"]),
    getCiudades() {
      return this.$store.getters.getCiudades;
    },
  },

  created() {
    this.getCategory();
  },

  data: () => ({
    // fechaSalida: null,
    // activePickerFechaSalida: null,
    // activePickerFechaRetorno: null,
    // fechaRetorno: null,
    // menuFechaSalida: false,
    // menuFechaRetorno: false,

    // items: [],
    // ciudad_destino: null,
    // -----------------
    category: [],
    categorySelect: null,
    books: [],
    loadGrid: false,
    headers: [
      {
        text: "Id",
        value: "ID",
      },
      { text: "Title", value: "title" },
      { text: "Author", value: "author" },
    ],
  }),

  methods: {
    async getCategory() {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/get/getAll"
        );
        console.log(data);
        this.category = data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getBooksByCategoryID(id) {
      try {
        this.loadGrid = true;
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/get/getLibros/${id}`
        );
        console.log(data);
        this.books = data.data;
        this.loadGrid = false;
      } catch (error) {
        console.log(error);
      }
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
    categorySelect(newValue, oldValue) {
      if (newValue != oldValue) {
        console.log(newValue);
        this.getBooksByCategoryID(newValue);
      }
    },
  },

  async mounted() {},
};
</script>
