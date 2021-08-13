<template>
    <div class="container row">
        <h4 class="center-align teal-text text-teal darken-4">Lista de Gastos</h4>
        <button class="btn teal teal darken-4 waves-effect waves-light" @click="minimizarBoton" >{{botonContenido}} <i class="material-icons left">{{icono}}</i></button>
        <div class="card hoverable" v-if="!minimizar">
             <div class="card-content">
                  <div class="row" id="formulario">
                        <div class="input-field col s6">
                            <input id="nombre" type="text" v-model="nombre">
                            <label for="nombre">Nombre del gasto</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="monto" type="number" v-model="monto">
                            <label for="monto">Monto del gasto</label>
                        </div>
                        <div class="input-field col s6">
                            <select class="browser-default" v-model="categoria">
                                <option disabled selected>Tipo del gasto</option>
                                <option >Hogar</option>
                                <option >Trabajo</option>
                                <option >Carro</option>
                            </select>
                        </div>
                    </div>
             </div>
              <div class="card-action right-align" id="botonera">
                    <button class="btn teal teal darken-4 waves-effect waves-light" @click="agregar">Agregar Gasto</button>
                </div>
        </div>
        <div class="row">
            <div class="col s12">
                <ul class="tabs ">
                    <li class="tab col s3"><a href="#">Hogar</a></li>
                    <li class="tab col s3"><a href="#">Trabajo</a></li>
                    <li class="tab col s3"><a href="#">Carro</a></li>
                    <li class="tab col s3"><a href="#" class="active">Todos</a></li>
                </ul>
            </div>
        </div>
        
      <table>
        <thead>
          <tr>
              <th>Nombre del Gasto</th>
              <th>Monto del Gasto</th>
              <th>Tipo del Gasto</th>
              <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
            <tr  v-for="(gasto, index) in gastos" :key="index" >
                <td>{{gasto.nombre}}</td>
                <td>{{gasto.monto}}</td>
                <td>{{gasto.categoria}}</td>
                <td class="row">
                    <div class="col s4">
                        <a class="waves-effect yellow accent-4 waves-light btn"><i class="material-icons">edit</i></a>
                    </div>
                    <div class="col s6">
                        <a class="waves-effect red darken-4 waves-light btn"><i class="material-icons">delete</i></a>
                    </div>  
                </td>
            </tr>
        </tbody>
      </table>
    </div>
</template>
<script>
import M from 'materialize-css';
import firebase from 'firebase'
import 'firebase/firestore'

    export default {
        name: 'Gastos', 
        data:function(){
            return {
                minimizar:false, 
                botonContenido:'Minimizar', 
                icono:'remove', 
                db:'',
                nombre:'',
                monto:'', 
                categoria:'',
                gastos:[]
            }
        }, 
        mounted:function(){
            M.AutoInit();
        },
         beforeMount: async function(){
            var firebaseConfig = {
                apiKey: "AIzaSyCYQSXAPB0hMspgH2HP4UnUlbY-cpbXLYw",
                authDomain: "lista-de-gastos-81896.firebaseapp.com",
                projectId: "lista-de-gastos-81896",
                storageBucket: "lista-de-gastos-81896.appspot.com",
                messagingSenderId: "1092787181785",
                appId: "1:1092787181785:web:aab1706aa90821420286c8"
            };
             // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            this.db = firebase.firestore();
            const settings = {timestampsInSnapshots: true};
            this.db.settings(settings);

            await this.cargarGastos();
            console.log(this.gastos)
        },
        methods:{
            minimizarBoton: function(){
                if(!this.minimizar){
                    this.minimizar = true;
                    this.BotonContenido = 'Maximizar'; 
                    this.icono = 'add'
                }else{
                    this.minimizar = false;
                    this.BotonContenido = 'minimizar'; 
                    this.icono = 'remove'
                }
            }, 
            agregar: async function(){
                this.db.collection('gastos').doc(this.nombre).set({
                    nombreGastos: this.nombre, 
                    montoGasto: this.monto, 
                    categoriaGasto: this.categoria, 
                    usuarioGasto: this.$route.params.id
                })
                .then(() => {
                    alert("Gasto agregado correctamente"); 
                    this.limpiarCampos();
                    this.cargarGastos();
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }, 
            limpiarCampos: function(){
                this.nombre ='';
                this.monto='';
                this.categoria = '';
            }, 
            cargarGastos: async function(){
                this.gastos = [];
                const docR = this.db.collection('gastos').where("usuarioGasto","==", this.$route.params.id);
                await docR.get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                let aux ={
                                    nombre: doc.data().nombreGastos,
                                    monto:doc.data().montoGasto,
                                    categoria:doc.data().categoriaGasto,
                                }
                                this.gastos.push(aux)
                                console.log(doc.data())
                            });
                            
                })
            }
        }
    }
</script>
<style scoped >
#formulario{
    padding: 5%;
}
.botonera{
    padding: 5%;
}


</style>
