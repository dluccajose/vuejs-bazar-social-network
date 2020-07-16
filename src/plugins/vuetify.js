import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import Chat from 'vue-beautiful-chat'

Vue.use(Chat);
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        // Aqui van los colores del tema modificado
        primary: '#4527A0',
        secondary: '#1976d2'
      }
    }
  }
});
