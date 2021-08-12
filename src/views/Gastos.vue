<template>
    <div class="container row">
        <h4 class="center-align teal-text text-teal darken-4">Lista de Gastos</h4>
        <button class="btn teal teal darken-4 waves-effect waves-light" @click="minimizarBoton" >{{botonContenido}} <i class="material-icons left">{{icono}}</i></button>
        <div class="card hoverable" v-if="!minimizar">
             <div class="card-content">
                  <div class="row" id="formulario">
                        <div class="input-field col s6">
                            <input id="nombre" type="text">
                            <label for="nombre">Nombre del gasto</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="monto" type="number">
                            <label for="monto">Monto del gasto</label>
                        </div>
                        <div class="input-field col s6">
                            <select class="browser-default">
                                <option disabled selected>Tipo del gasto</option>
                                <option >Hogar</option>
                                <option >Trabajo</option>
                                <option >Carro</option>
                            </select>
                        </div>
                    </div>
             </div>
              <div class="card-action right-align" id="botonera">
                    <button class="btn teal teal darken-4 waves-effect waves-light" >Agregar Gasto</button>
                </div>
        </div>
        <div class="row">
            <div class="col s12">
                <ul class="tabs ">
                    <li class="tab col s3"><a href="#test1" class="teal-text text-teal darken-4">Hogar</a></li>
                    <li class="tab col s3"><a class="active" href="#test2">Trabajo</a></li>
                    <li class="tab col s3"><a href="#test4">Carro</a></li>
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
          
        </tbody>
      </table>
    </div>
</template>
<script>
import M from 'materialize-css'

    export default {
        name: 'Gastos', 
        data:function(){
            return {
                minimizar:false, 
                botonContenido:'Minimizar', 
                icono:'remove'
            }
        }, 
        mounted:function(){
            M.AutoInit();
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
            }
        }
    }
</script>
<style scoped >
#formulario{
    padding: 5%;
}


</style>
