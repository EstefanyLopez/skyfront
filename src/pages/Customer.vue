<template>
      <div
      class="flex m-4 justify-center"
      >
        <Button class="m-2" icon="pi pi-plus" label="Nuevo" severity="success" text raised @click="fnShowNew"/>
        
        <Button class="m-2" icon="pi pi-pencil" label="Editar" severity="warning" text raised :disabled="btnActive" @click="fnShowEdit"/>
        <Button class="m-2" icon="pi pi-trash" label="Eliminar" severity="danger" text raised :disabled="btnActive" @click="delCustomer"/>
        <Button class="m-2" icon="pi pi-file-pdf" label="Generar" severity="danger" text raised :disabled="dataCustomer.length<1"/>
      </div>

        <DataTable 
        class="flex flex-col m-4"
        paginator :rows="7"
        v-model:selection = "selectCustomer"
        :value="dataCustomer" dataKey="customer_id" 
        :metaKeySelection="metaKey"
        selectionMode="single">
        <Column field="name" header="Nombre"></Column>
        <Column field="address" header="Email"></Column>
        <Column field="number_phone" header="Telefono"></Column>
        
    </DataTable>
    
<Sidebar v-model:visible="showEdit" header="Editar Cliente" position="right">
<form @submit.prevent="saveEdit" class="flex flex-col">
  <span class="relative m-2">
    <i class="pi pi-chevron-circle-left absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
    <InputText v-model="selectCustomer.name" placeholder="Nombre" class="pl-10" />
</span>
<span class="relative m-2">
    <i class="pi pi-address-book absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
    <InputText v-model="selectCustomer.address" placeholder="Email" class="pl-10" />
</span>
<span class="relative m-2">
    <i class="pi pi-phone absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
    <InputText v-model="selectCustomer.number_phone" placeholder="Numero de Telefono" class="pl-10" />
</span> 
<Button class="w-full m-2" type="submit" label="Guardar cambios" raised  />
</form>

</Sidebar>
<Sidebar v-model:visible="showNew" header="Nuevo Cliente" position="right">
<form @submit.prevent="saveData" class="flex flex-col">
  <span class="relative m-2 w-full">
    <i class="pi pi-chevron-circle-left absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
    <InputText v-model="form.name" placeholder="Nombre" class="pl-10" />
</span>
<span class="relative m-2 w-full">
    <i class="pi pi-address-book absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
    <InputText v-model="form.address" placeholder="Email" class="pl-10" />
</span>
<span class="relative m-2 w-full">
    <i class="pi pi-phone absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
    <InputText v-model="form.number_phone" placeholder="Numero de Telefono" class="pl-10" />
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
const selectCustomer = ref()
const btnActive = ref(true)
const form = ref({
  name:"",
  address:"",
  number_phone:""
})

watch(selectCustomer, (newvalue, oldvalue)=>{
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

  let dataCustomer=ref([])
  const getData =async()=>{
    const res =await axios.get('http://54.162.183.155:8000/customers',config)
    dataCustomer.value=res.data
  }
  getData()

async function delCustomer() {
  const res =await axios.delete(`http://54.162.183.155:8000/customer/${selectCustomer.value.customer_id}`,config)
  selectCustomer.value=null
  getData()
}

function fnShowNew(){
  showNew.value=true

}

async function saveEdit(){
  const data ={
    name:selectCustomer.value.name,
    address: selectCustomer.value.address,
    number_phone: selectCustomer.value.number_phone
  }
  const res =await axios.put(`http://54.162.183.155:8000/customer/${selectCustomer.value.customer_id}`,data,config)
  selectCustomer.value=null
  showEdit.value=false
  getData()
}

function fnShowEdit(){
  showEdit.value=true

}

async function saveData(){
  const data ={
    name:form.value.name,
    address: form.value.address,
    number_phone: form.value.number_phone
  }
  const res =await axios.post(`http://54.162.183.155:8000/customer`,data,config)
  selectCustomer.value=null
  showNew.value=false
  getData()
}
</script>