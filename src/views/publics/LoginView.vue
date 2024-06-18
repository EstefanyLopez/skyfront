<template>
    <div
     v-motion-fade-visible
         class=" h-screen w-screen pl-6 pr-6 bg-red-100 sm:flex justify-items-center	content-center justify-center	 items-center bg-login sm:flex-none ">
         
         <MovieLogin>

      <div 
      v-motion-roll-visible-once-left 
      
      class="relative py-2 sm:max-w-xl sm:mx-auto">
        <div
          class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div class="relative px-4 py-30 bg-white shadow-lg sm:rounded-3xl sm:p-10">

          <form @submit.prevent="sendLogin">
          <div class="sm:mx-auto ">
            <div class="flex  justify-center">
              <img :src="Logo" alt="logo" width="100">
            </div>
            <div class="flex justify-center">
              <h1 class="text-2xl font-semibold mb-6">Login SKY-NET</h1>
            </div>
            <div
            class=" divide-gray-200 w-full">
              <div class="py-2 text-base  space-y-6  ">
                  <div class="relative " >
                    <InputText v-model="credentials.email" size="small" type="text"
                    class="w-full"
                    />
                    <label for="email" class="absolute left-0 -top-6 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                  </div>
                  <div class="relative w-full ">
                    <InputText type="password" v-model="credentials.password" :feedback="false" class=" w-full " size="small"/>
                    <label for="password" class="absolute left-0 -top-6 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                  </div>
                  
                </div>
              </div>
            </div>
            
            <div class="pb-5 sm:mx-auto ">
              <Button type="submit" size="small" class="w-full ">Ingresar</button>
              </div>
        </form>
        <Toast unstyled/>

    </div>
  </div>
         </MovieLogin>
        </div>
</template>
<script setup >
import {useToast} from 'primevue/usetoast'
import { useAuthStore } from '@/stores/auth';
import Toast from 'primevue/toast'
import { ref } from 'vue';
import MovieLogin from '../../components/moviesComponents/MovieLogin.vue'
import Logo from '../../assets/imgs/logolessbg.png'
import Swal from 'sweetalert2';
import password from '@/presets/lara/password';


const {login} = useAuthStore()
const toast = useToast()
const credentials = ref({
  email:"",
  password:""
})
async function sendLogin(){
  if (credentials.value.email.trim().length>2 && credentials.value.password.trim().length>2) {

    const cred ={
      email : credentials.value.email,
      password: credentials.value.password
    }
    login(cred)

  }else{
    const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
      Toast.fire({
     icon: "error",
      title: "Ingrese los campos"
      });
  }
}

</script>
<style>
.wavy-border{
  width: 300px;
  height: 500px;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
}
.inner-corner {
  background-color: black;
  position: relative;
  width: 800px;
  height: 800px;
  border: 2px solid #3498db;
  overflow: hidden;
}

.inner-corner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50px; /* Ajusta el ancho de la esquina hacia adentro */
  height: 50px; /* Ajusta la altura de la esquina hacia adentro */
  background-color: #3498db;
  border-radius: 50%;
}

.bg-login{
  /*
  background-image:  linear-gradient(339deg, rgba(131,58,180,0.487920133873862) 0%, rgba(29, 190, 253, 0.68) 20%, rgba(252,176,69,0.4545868005405288) 80%);
   url("../../assets/imgs/bg-login.svg");*/
  background-size: cover;
  background-position: center;
}
.card-pass {
    background: var(--card-bg);
    border: var(--card-border);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;

}
</style>