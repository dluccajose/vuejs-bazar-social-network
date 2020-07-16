<template>
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          justify-center
          class="mt-3 mb-3 "
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12 ">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-spacer></v-spacer>
                <v-toolbar-title><h5>Restablecer Contraseña</h5></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                       href="./#/"
                      v-on="on"
                    >
                      <v-icon>mdi-reply</v-icon>
                    </v-btn>
                  </template>
                  <span>Volver</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                   <v-flex xs12 sm12 class="mt-5">
                      <v-text-field
                       v-model="password"
                       :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                       :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Nueva Contraseña"
                        hint="Debe tener mas de 8 caracteres"
                        counter
                        outlined
                        clearable
                       @click:append="show1 = !show1"
                      ></v-text-field>
                  </v-flex>
                 <v-flex xs12 sm12>
                       <v-text-field
                       v-model="password_2"
                      id="confirmarC"
                       :rules="[rules.required, rules.min]"
                       label="Confirmar Contraseña"
                        name="confirmarC"
                        type="password"
                         outlined
                         clearable
                       ></v-text-field>
                 </v-flex>
                </v-form>
              </v-card-text>
              <v-card-actions> 
                
                <v-spacer ></v-spacer> 
                <v-btn color="primary" class="mr-3 mb-3">Aceptar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
  export default {
    name: 'ReestablecerPass2',
    data () {
      return {
        menu: false,
        show1: false,
        show2: true,
        show3: false,
        show4: false,
        password: '',
        password_2: '',
        rules: {
          required: value => !!value || 'Requerido.',
          min: v => v.length >= 8 || 'Min 8 characters',
        },
      }
    },
  }
</script>