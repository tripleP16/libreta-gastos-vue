<template>

    <div class="row valign-wrapper" id="login">
        <div class="container col l4 s12">
            <div class="card-panel white-text red darken-4" v-if="errorvalid">{{errorContent}}</div>
            <div class="card hoverable">
                <div class="card-content">
                    <span class="card-title center-align teal-text text-teal darken-4">Ingresa al Sistema</span>
                    <div class="row" id="formulario">
                        <div class="input-field col s12">
                            <input id="email" type="email" class="validate" v-model="email">
                            <label for="email">Email</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="password" type="password" class="validate" v-model="password">
                            <label for="password">Contraseña</label>
                        </div>

                    </div>
                </div>
                <div class="card-action right-align">
                    <button class="btn teal teal darken-4 waves-effect waves-light" @click="iniciarSesion">Inicia Sesion</button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
// USUARIO: perez@mail.com CONTRASEÑA: 12345678
import firebase from 'firebase'
import 'firebase/firestore'
import db from '../firestore'
    export default {
        name:"Login", 
        data:function(){
            return {
                db:'', 
                email:'', 
                password:'', 
                errorContent:'', 
                errorvalid:false,
            }
        },
        beforeMount:function(){
            
            this.db = db;
        },
        methods:{
            iniciarSesion: function(){
                this.errorvalid = false;
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then((response) => {
                  console.log('Inicio de sesion correcto' + response.email)
                  alert("Inicio de Sesion exitoso"); 
                  this.$router.push({name:'Gastos', params:{id:this.email} })
                })
                .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  console.log('Error: '+errorCode + ' - '+errorMessage)
                  this.mostrarError(errorMessage)
                })
                console.log('Email: '+this.email)
            }, 
            mostrarError: function(error){
                this.errorContent =  error; 
                this.errorvalid = true;
            }
        }
    }
</script>
<style scoped >
#login{
    margin-top: 12%;
}
#formulario{
    padding: 5%;
}

</style>