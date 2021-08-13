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
                    <li class="tab col s3"><a href="#" id="hogar" @click="filtro($event)">Hogar</a></li>
                    <li class="tab col s3"><a href="#" id="trabajo" @click="filtro($event)">Trabajo</a></li>
                    <li class="tab col s3"><a href="#" id="carro"  @click="filtro($event)">Carro</a></li>
                    <li class="tab col s3"><a href="#" class="active"  @click="filtro($event)">Todos</a></li>
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
                        <a class="waves-effect yellow accent-4 waves-light btn modal-trigger" href="#modal1" @click="cargarEdit(gasto, index)"><i class="material-icons">edit</i></a>
                    </div>
                    <div class="col s6">
                        <a class="waves-effect red darken-4 waves-light btn" @click="eliminarGastos(gasto.nombre)"><i class="material-icons">delete</i></a>
                    </div>  
                </td>
            </tr>
        </tbody>
      </table>
      <div id="modal1" class="modal">
        <div class="modal-content">
             <h6>Modificar Gasto</h6>
            <div class="input-field col s6">
                <input id="nombre" type="text" v-model="nombreModificado">
                <label >Nombre del gasto</label>
            </div>
            <div class="input-field col s6">
                <input id="monto" type="number" v-model="montoModificado">
                <label for="monto">Monto del gasto</label>
            </div>
            <div class="input-field col s6">
                <select class="browser-default" v-model="categoriaModificado">
                    <option disabled selected>Tipo del gasto</option>
                    <option >Hogar</option>
                    <option >Trabajo</option>
                    <option >Carro</option>
                </select>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#" class="modal-close waves-effect waves-green btn-flat" @click="edit">Editar gastos</a>
            <a href="#" class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
        </div>
    </div>
    </div>
    
</template>
<script>
import M from 'materialize-css';
import 'firebase/firestore'
import db from '../firestore'
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
                gastos:[], 
                nombreModificado:'', 
                montoModificado:'', 
                categoriaModificado:'', 
                gasto:''
            }
        }, 
        mounted:function(){
            M.AutoInit();
        },
         beforeMount: async function(){
           this.db = db;
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
                this.db.collection('gastos').doc(this.gastos.length.toString()).set({
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
            }, 
            eliminarGastos: function(nombre){
                this.db.collection('gastos').doc(nombre).delete().then(() => {
                    console.log("Document successfully deleted!");
                    alert("Documento elimminado satisfactoriamente"); 
                    this.cargarGastos();
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });

            }, 
            cargarEdit: function(gasto, index){
                this.nombreModificado =  gasto.nombre; 
                this.montoModificado = gasto.monto; 
                this.categoriaModificado = gasto.categoria;
                this.gasto = index.toString();
            },
            edit: async function(){
                this.db.collection('gastos').doc(this.gasto).set({
                     nombreGastos: this.nombreModificado, 
                    montoGasto: this.montoModificado, 
                    categoriaGasto: this.categoriaModificado, 
                     usuarioGasto: this.$route.params.id
                })
                .then(() => {
                    alert("Modificacion completa")
                    console.log("Document successfully written!");
                     this.cargarGastos();
                })  
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }, 
            filtro: async function($event){
                if($event.target.id == 'hogar'){
                    this.gastos = [];
                const docR = this.db.collection('gastos').where("usuarioGasto","==", this.$route.params.id).where("categoriaGasto", "==", "Hogar");
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
                }else if ($event.target.id == 'trabajo'){
                      this.gastos = [];
                const docR = this.db.collection('gastos').where("usuarioGasto","==", this.$route.params.id).where("categoriaGasto", "==", "Trabajo");
                await docR.get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                let aux ={
                                    nombre: doc.data().nombreGastos,
                                    monto:doc.data().montoGasto,
                                    categoria:doc.data().categoriaGasto,
                                }
                                this.gastos.push(aux)
                                console.log(doc.data())
                            })
                     });
                }else if ($event.target.id == 'carro'){
                     this.gastos = [];
                const docR = this.db.collection('gastos').where("usuarioGasto","==", this.$route.params.id).where("categoriaGasto", "==", "Carro");
                await docR.get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                let aux ={
                                    nombre: doc.data().nombreGastos,
                                    monto:doc.data().montoGasto,
                                    categoria:doc.data().categoriaGasto,
                                }
                                this.gastos.push(aux)
                                console.log(doc.data())
                            })
                     });
                }else{
                    this.cargarGastos()
                }
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
