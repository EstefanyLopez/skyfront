import { reactive, ref } from "vue";
import { defineStore } from 'pinia';
import menu from './dataMenu'

export const useMenuStore = defineStore('useMenuStore',()=>{
        const dataMenu  =ref(menu)
        const menuSelected=ref({})
        const moduleSelectedId=ref(0)
        

        function selectModule(option:number){
            moduleSelectedId.value=option
            menuSelected.value = dataMenu.value.find(mod=>mod.module_id==option) || {}
        }

        return{ menuSelected, selectModule}
})