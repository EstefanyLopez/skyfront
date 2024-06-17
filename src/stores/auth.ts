import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { useMenuStore } from './useMenu'
import axios from 'axios'
import Swal from 'sweetalert2';

export const useAuthStore = defineStore('auth', () => {

  const {selectModule} = useMenuStore();
  const userInfo= ref({
    name:"",
    user_id:0,
    rol_id:0
  })

  const activeMenu = ref(false)
  const activeModules= ref(false)
  const isAuthenticated= ref(false)
  const access_token= ref(null)
  function showMenu() {
    activeMenu.value=!activeMenu.value
  }
  function showModules(){
    activeModules.value = !activeModules.value
  }


   async function login(datos:Object){

    const res = await axios.post('http://54.162.183.155:8000/login',{
      email: datos.value.email,
      password: datos.value.password
    }).then(res=>{
      return res
    }).catch(err=>err
    )
    
    if (res.status==200) {
      access_token.value= res.data.access_token
      userInfo.value.name=res.data.name
      userInfo.value.rol_id=res.data.rol_id
      userInfo.value.user_id=res.data.user_id
      isAuthenticated.value=true
      selectModule(2)
      router.push({
        name:'visitas'
      })  
      
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
    function singup(){
      isAuthenticated.value=false
      router.push({
        name:'login'
      })  
    }

  return { activeMenu, showMenu, activeModules, showModules, login, isAuthenticated,access_token, userInfo, singup}
})
