<template>
    <div
    class="flex m-4 justify-center"
    >
      <Button class="m-2" icon="pi pi-plus" label="Nuevo" severity="success" text raised @click="fnShowNew"/>
      <Button class="m-2" icon="pi pi-pencil" label="Editar" severity="warning" text raised :disabled="btnActive" @click="fnShowEdit"/>
      <Button class="m-2" icon="pi pi-trash" label="Eliminar" severity="danger" text raised :disabled="btnActive" @click="delUser"/>
      <Button class="m-2" icon="pi pi-file-pdf" label="Generar" severity="danger" text raised :disabled="dataUser.length<1" />

    </div>

      <DataTable 
      class="flex flex-col m-4"
      paginator :rows="7"
      v-model:selection = "selectUser"
      :value="dataUser" dataKey="user_id" 
      :metaKeySelection="metaKey"
      selectionMode="single">
      <Column field="name" header="Nombre"></Column>
      <Column field="lastname" header="Apellido"></Column>
      <Column field="email" header="Correo"></Column>
      
  </DataTable>
  
<Sidebar v-model:visible="showEdit" header="Crear Cliente" position="right">
<form @submit.prevent="saveEdit" class="flex flex-col">
<span class="relative m-2">
  <i class="pi pi-chevron-circle-left absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
  <InputText v-model="selectUser.name" placeholder="Nombre" class="pl-10" />
</span>
<span class="relative m-2">
  <i class="pi pi-address-book absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
  <InputText v-model="selectUser.address" placeholder="Dirección" class="pl-10" />
</span>
<span class="relative m-2">
  <i class="pi pi-phone absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
  <InputText v-model="selectUser.number_phone" placeholder="Numero de Telefono" class="pl-10" />
</span> 
<Button class="w-full m-2" type="submit" label="Guardar cambios" raised  />
</form>

</Sidebar>
<Sidebar v-model:visible="showNew" header="Nuevo usuario" position="right">
<form @submit.prevent="saveData" class="flex flex-col">
<span class="relative m-2 w-full">
  <i class="pi pi-chevron-circle-left absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
  <InputText v-model="form.name" placeholder="Nombre" class="pl-10" />
</span>
<span class="relative m-2 w-full">
  <i class="pi pi-chevron-circle-left absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
  <InputText v-model="form.lastname" placeholder="Apellido" class="pl-10" />
</span>
<span class="relative m-2 w-full">
  <i class="pi pi-phone absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
  <InputText v-model="form.email" placeholder="Correo Electronico" class="pl-10" />
</span>
<span class="relative m-2 w-full">
  <i class="pi pi-eye absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
  <InputText v-model="form.password" placeholder="Contraseña de usuario" class="pl-10" />
</span>
<span class=" m-2 card flex justify-center ">
  <Select :unstyled="true" v-model="selectedRol" :options="roles" optionLabel="name" placeholder="Selecciona un rol" checkmark :highlightOnSelect="false" class="flex justify-center w-full md:w-56" />

</span> 


<Button class="w-full m-2" type="submit" label="Guardar" raised  />
</form>

</Sidebar>
</template>
<script setup lang="ts">
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { watch } from 'vue';
const {access_token}= storeToRefs(useAuthStore())

const metaKey=ref(false)
const showEdit= ref(false)
const showNew= ref(false)
const selectUser = ref()
const btnActive = ref(true)
const form = ref({
name:"",
lastname:"",
email:"",
password:""
})

const selectedRol = ref();
const roles = ref([
    { name: 'Administrador', code: 2 },
    { name: 'Supervisor', code: 2 },
    { name: 'Tecnico', code: 3}])

watch(selectUser, (newvalue, oldvalue)=>{
if (newvalue!=null) {
  btnActive.value=false
}else{
  btnActive.value=true
}
})
let config = {
  headers: {
    'Authorization': 'Bearer ' + access_token.value
  }
}

let dataUser=ref([])
const getData =async()=>{
  const res =await axios.get('http://54.162.183.155:8000/users',config)
  dataUser.value=res.data
}
getData()

async function delUser() {
const res =await axios.delete(`http://54.162.183.155:8000/user/${selectUser.value.user_id}`,config)
selectUser.value=null
getData()
}

function fnShowNew(){
showNew.value=true

}

async function saveEdit(){
const data ={
  name:selectUser.value.name,
  address: selectUser.value.address,
  number_phone: selectUser.value.number_phone
}
const res =await axios.put(`http://54.162.183.155:8000/customer/${selectUser.value.user_id}`,data,config)
selectUser.value=null
showEdit.value=false
getData()
}

function fnShowEdit(){
showEdit.value=true

}

async function saveData(){
const data ={
  name:form.value.name,
  lastname : form.value.lastname,
  email: form.value.email,
  password: form.value.password,
  rol_id: selectedRol.value.code
}
const res =await axios.post(`http://54.162.183.155:8000/user`,data,config)
selectUser.value=null
showNew.value=false
form.value.name=""
form.value.lastname=""
form.value.password=""
form.value.email=""

getData()
}
</script>
<style>
ul{
  background-color: white;
  padding: 8px;
}
</style>