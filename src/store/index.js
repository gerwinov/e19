import Vue from 'vue';
import Vuex from 'vuex';

import {
  Auth, createConnection, subscribeEntities, callService, subscribeServices,
} from 'home-assistant-js-websocket';


// conn is the connection from earlier.


Vue.use(Vuex);

const createStore = () => new Vuex.Store({
  state: {
    addresss: null,
    port: null,
    password: null,
    entities: null,
    connection: null,
    sidebar: false,
  },

  mutations: {
    saveConnection(state, payload) {
      if (payload.connection) {
        state.address = payload.address;
        state.port = payload.port;
        state.password = payload.password;
        state.connection = payload.connection;
        state.entities = payload.entities;
      }
    },

    callService(state, payload) {
      if (payload.id && payload.action && payload.name) {
        callService(state.connection, payload.name, payload.action, {
          entity_id: payload.id,
          ...(payload.command && { command: payload.command }),
        });
      }
    },

    toggleThermostat(state, payload) {
      if (payload.id && payload.action && payload.operationMode) {
        callService(state.connection, 'climate', payload.action, {
          entity_id: payload.id,
          operation_mode: payload.operationMode,
        });
      }
    },

    setLightOptions(state, payload) {
      if (payload.id && payload.action && payload.options) {
        callService(state.connection, 'light', payload.action, {
          entity_id: payload.id,
          ...payload.options,
        });
      }
    },
  },

  actions: {
    async login({ commit }, payload) {
      if (payload.address && payload.port && payload.password) {
        const auth = new Auth({
          access_token: payload.password,
          // Set expires to very far in the future
          expires: new Date(new Date().getTime() + 1e11),
          hassUrl: `https://${payload.address}:${payload.port}`,
        });

        const connection = await createConnection({ auth });
        subscribeEntities(connection, (entities) => {
          // console.log('Entities', entities);
          commit('saveConnection', {
            address: payload.address,
            port: payload.port,
            password: payload.password,
            connection,
            entities,
          });
        });

        subscribeServices(connection, services => console.log('New services!', services));
      }
    },

    flipSwitch({ commit }, payload) {
      commit('callService', {
        ...payload,
        name: 'switch',
      });
    },

    toggleLight({ commit }, payload) {
      commit('callService', {
        ...payload,
        name: 'light',
      });
    },

    mediaAction({ commit }, payload) {
      commit('callService', {
        ...payload,
        name: 'media_player',
      });
    },

    receiverAction({ commit }, payload) {
      commit('callService', {
        ...payload,
        name: 'denonavr',
      });
    },
  },

  getters: {
    isLoggedIn: state => state.address !== null && state.port !== null && state.password !== null,

    getGroupedEntities: state => (name) => {
      const entitiesArr = Object.entries(state.entities);
      const entities = entitiesArr.filter(entity => entity[0].startsWith(name));
      return entities.map(entity => entity[1]);
    },

    getSwitches: (state, getters) => getters.getGroupedEntities('switch'),

    getLivingroomLights: (state, getters) => {
      const lights = getters.getGroupedEntities('light');
      const livingRoomEntities = ['light.keuken', 'light.tafellamp'];

      return lights.filter(light => livingRoomEntities.includes(light.entity_id));
    },

    getTrackers: (state, getters) => getters.getGroupedEntities('device'),

    getClimate: (state) => {
      if (state.entities) {
        return state.entities['climate.toon'];
      }
      return undefined;
    },

    getMediaplayer: (state) => {
      if (state.entities) {
        return state.entities['media_player.woonkamer'];
      }
      return undefined;
    },

    getReceiver: (state) => {
      if (state.entities) {
        return state.entities['media_player.denon_avr_x2000'];
      }
      return undefined;
    },

    getTemperature: (state) => {
      if (state.entities) {
        return state.entities['sensor.schiphol_temperature'].state;
      }
      return undefined;
    },

    getWeatherDescription: (state) => {
      if (state.entities) {
        return state.entities['sensor.schiphol_symbol'].state;
      }
      return undefined;
    },
  },
});

export default createStore;
