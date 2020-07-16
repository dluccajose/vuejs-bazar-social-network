<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center class="mt-3 mb-3">
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-spacer></v-spacer>
              <v-toolbar-title>
                <h5>Nueva Categoria</h5>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn icon large href="./#/" v-on="on">
                    <v-icon>mdi-reply</v-icon>
                  </v-btn>
                </template>
                <span>Volver</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Nombre de la Categoria"
                  name="nombre_cat"
                  prepend-icon="mdi-animation"
                  type="text"
                  outlined
                  class="mt-4"
                ></v-text-field>
                <v-flex xs12 sm12>
                  <v-select :items="items" label="Clase padre de la categoria" outlined></v-select>
                </v-flex>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" class="mr-3 mb-3">
                <v-icon class="mr-2">mdi-content-save</v-icon>Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>


<script>
export default {
  name: 'CrearCategoria',
  data() {
    return {
      select: "Electronica",
      items: ["Jardineria", "Cocina", "Video Juegos", "Repuestos"]
    };
  }
};
</script>
        
<style>
</style>
        