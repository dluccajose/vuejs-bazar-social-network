<template>

<v-container>
    <p class="display-1 text-center" style="color:gray" >
        Crear Publicacion
    </p>
    
    <v-layout justify-center >
        <v-card color="#d78714" width="150px" height="150px" class="pt-10" :to="{name: 'PublicarPostInfo', params: { tipoP: 2} }">
            <center>
                <v-icon x-large color="white">mdi-cellphone-message</v-icon>
                <p style="color:white">SERVICIOS</p>
            </center>
        </v-card>
        <div style="width:30px"></div>
        <v-card color="#65b81b" width="150px" height="150px" class="pt-10" :to="{name: 'PublicarPostInfo', params: { tipoP: 1} }" >
            <center>
                <v-icon x-large color="white">mdi-basket</v-icon>
                <p style="color:white">PRODUCTOS</p>
            </center>
        </v-card >
    </v-layout>

    <v-layout justify-center mt-5>
        <v-card color="#6015ad" width="150px" height="150px" class="pt-10" :to="{name: 'PublicarPostInfo', params: { tipoP: 3} }">
            <center>
                <v-icon x-large color="white">mdi-account-group</v-icon>
                <p style="color:white">SOCIAL</p>
            </center>
        </v-card>
    </v-layout>
</v-container>
    
</template>

<script>
export default {
    name: 'PublicarPost',
    data() {
        return {

        }
    }    
}
</script>


<style>

</style>
