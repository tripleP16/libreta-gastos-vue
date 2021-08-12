<template>
    <div class="row valign-wrapper" id="login">
        <div class="container col l4 s12">
            <div class="card hoverable">
                <div class="card-content">
                    <span class="card-title center-align teal-text text-teal darken-4">Ingresa al Sistema</span>
                    <div class="row" id="formulario">
                        <div class="input-field col s12">
                            <input id="email" type="email" class="validate">
                            <label for="email">Email</label>
                        </div>
                        <div class="input-field col s12">
                            <input id="password" type="password" class="validate">
                            <label for="password">Contraseña</label>
                        </div>

                    </div>
                </div>
                <div class="card-action right-align">
                    <button class="btn teal teal darken-4 waves-effect waves-light">Inicia Sesion</button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:"Login"
    }
</script>
<style scoped >
#login{
    margin-top: 15%;
}
#formulario{
    padding: 5%;
}

</style>