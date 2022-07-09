import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filtros: {
      fecha_salida: null,
      fecha_retorno: null,
      ciudades: [
        {
          id: 144,
          name: "Afganistán",
        },
        {
          id: 114,
          name: "Albania",
        },
        {
          id: 18,
          name: "Alemania",
        },
        {
          id: 98,
          name: "Algeria",
        },
        {
          id: 145,
          name: "Andorra",
        },
        {
          id: 119,
          name: "Angola",
        },
        {
          id: 4,
          name: "Anguilla",
        },
        {
          id: 147,
          name: "Antigua y Barbuda",
        },
        {
          id: 207,
          name: "Antillas Holandesas",
        },
        {
          id: 91,
          name: "Arabia Saudita",
        },
        {
          id: 5,
          name: "Argentina",
        },
      ],
    },

    tickets: [
      {
        id: 10,
        precio: 135,
        aereolinea: "Avianca",
        numeroEscalas: 3,
        duracionVuelo: 8,
      },
      {
        id: 11,
        precio: 254,
        aereolinea: "American Airlines",
        numeroEscalas: 6,
        duracionVuelo: 6,
      },
      {
        id: 12,
        precio: 138,
        aereolinea: "AirFrance",
        numeroEscalas: 2,
        duracionVuelo: 7.6,
      },
      {
        id: 13,
        precio: 264,
        aereolinea: "Biter Canarias",
        numeroEscalas: 2,
        duracionVuelo: 7,
      },
      {
        id: 14,
        precio: 168,
        aereolinea: "Lufthansa",
        numeroEscalas: 3,
        duracionVuelo: 7.5,
      },
      {
        id: 15,
        precio: 215,
        aereolinea: "Areolíneas Argentinas",
        numeroEscalas: 4.6,
      },
    ],
  },
  mutations: {
    SET_FECHA_SALIDA: function (state, data) {
      state.filtros.fecha_salida = data;
    },
    SET_FECHA_RETORNO: function (state, data) {
      state.filtros.fecha_retorno = data;
    },
  },
  getters: {
    getCiudades(state) {
      return state.filtros.ciudades;
    },
  },
});
