<template>
<div class="absolute top-15  left-3 text-primary">
    VISITAS
</div>
<div
    class="flex m-4 justify-center"
    >
      <Button class="m-2" icon="pi pi-plus" label="Nueva Visita" severity="success" text raised @click="fnShowNew"/>
      
</div>
<div class="card">
        <DataView :value="visitas" paginator :rows="2">
            <template #list="slotProps">
                <div class="flex flex-col">
                    <div v-for="(item, index) in slotProps.items" :key="index">
                        <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                            <div class="md:w-40 relative">
                                <img class="block xl:block mx-auto rounded w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" />
                                <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" class="absolute dark:!bg-surface-900" style="left: 4px; top: 4px">No. #{{ item.visit_id }}</Tag>
                            </div>
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div>
                                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">Asunto{{ item.subject }}</span>
                                        <div class="text-lg font-medium mt-2">Direccion: {{ item.address }}</div>
                                    </div>
                                    <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                            <span class="text-surface-900 font-medium text-sm">Descripcion: {{ item.description }}</span>
                                            <i class="pi pi-star-fill text-yellow-500"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col md:items-end gap-8">
                                    <span class="text-xl font-semibold">Fecha de visita:{{ item.fecha }}</span>
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <Button icon="pi pi-map-marker" label="Ubicacion" :disabled="false" @click="toUbication(item.latitud, item.longitud)" class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                                        <Button icon="pi pi-calendar-clock" label="Finalizar" :disabled="userInfo.rol_id==3" class="flex-auto md:flex-initial whitespace-nowrap" @click="finVisit(item.customer_id, item.visit_id)"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>
    <Sidebar v-model:visible="showNew" header="Crear Visita" position="right">
        <form @submit.prevent="saveVisit" class="flex flex-col">
            
            <span class="relative ">
                <i class="pi pi-ellipsis-h absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                <InputText v-model="form.subject" placeholder="Asunto" class="pl-10" />
            </span>
            <span class="relative mt-2">
                <i class="pi pi-align-justify absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                <InputText v-model="form.description" placeholder="Descripcion" class="pl-10" />
            </span>
            <Calendar class="mt-2" v-model="form.fecha" showIcon iconDisplay="input" />

            <span class="relative mt-2">
                <i class="pi pi-map-marker absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                <InputText v-model="form.address" placeholder="Direccion" class="pl-10" />
            </span>
            <span class="relative mt-2">
                <i class="pi pi-map-marker absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                <InputText v-model="form.latitud" placeholder="latitud" class="pl-10" />
            </span>
            <span class="relative mt-2">
                <i class="pi pi-map-marker absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                <InputText v-model="form.longitud" placeholder="longitud" class="pl-10" />
            </span>
            <Select :unstyled="true" v-model="customerSelect" editable :options="customers" optionLabel="name" placeholder="Selecciona un cliente" class="w-full md:w-56 select mt-2 " />
            <Select  v-model="selectUser" editable :options="dataUser" optionLabel="name" placeholder="Selecciona un tecnico" class="w-full md:w-56 select mt-2" />
            <Button type="submit" label="Crear Visita" class="w-full mt-4"/>    
        </form>

    </Sidebar>
</template>
<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';


const showNew = ref(false)
function fnShowNew(){
    showNew.value=true
}
const form =ref({
    subject:"",
    description:"",
    address:"",
    latitud:"",
    longitud:"",
    usercreate:0,
    customer_id:0,
    userasigned:0,
    fecha:""
})
const customerSelect=ref()
const customers=ref([])

const visitas = ref();
const getSeverity = (row) => {
    switch (row.status) {
        case '1':
            return 'success';

        case '9':
            return 'warn';

        case '99':
            return 'danger';

        default:
            return null;
    }
};

const {access_token,userInfo}= storeToRefs(useAuthStore())


let config = {
  headers: {
    'Authorization': 'Bearer ' + access_token.value
  }
}
//get data 
let dataUser=ref()
let selectUser=ref()
const getData =async()=>{
  const res =await axios.get('http://54.162.183.155:8000/users',config)
dataUser.value=[]
  res.data.map((user:any)=>{
      if(user.rol_id==3){
          dataUser.value.push({
              name:user.name,
              code:user.user_id
              })
              }
              })
            
}
getData()

const getDataCustomers=async()=>{
  const res =await axios.get('http://54.162.183.155:8000/customers',config)
  
  customers.value=res.data.map((customer:any)=>{
    return{
        name:customer.name,
        code:customer.customer_id
    }
  })
    
}   
getDataCustomers()

//Save Data
async function saveVisit() {
    form.value.usercreate=userInfo.value.user_id
    form.value.customer_id=customerSelect.value.code
    form.value.userasigned=selectUser.value.code
    
    const data ={
    subject:    form.value.subject,
    description:form.value.description,
    address:    form.value.address,
    latitud:    form.value.latitud,
    longitud:   form.value.longitud,
    usercreate: form.value.usercreate,
    customer_id:form.value.customer_id,
    userasigned:form.value.userasigned,
    fecha:      form.value.fecha
    }
    const res =await axios.post('http://54.162.183.155:8000/visit',data ,config)
    selectUser.value=null
    customerSelect.value=null
    
    form.value.description=""
    form.value.address=""
    form.value.subject=""
    form.value.latitud=""
    form.value.longitud=""
    form.value.fecha=""

    showNew.value=false
    getVistis()
}
// Get Visits

async function getVistis(){
    visitas.value=[]
    const params={
        user_id:userInfo.value.user_id,
        rol_id: userInfo.value.rol_id
    }
    let conf={
        ...config,
        params:params
    }

    const res =await axios.get('http://54.162.183.155:8000/visits',conf)
    visitas.value= res.data
}

getVistis()

//events Buttons
function toUbication(latitud:string, longitud:string) {
    console.log(latitud,longitud)
    const googleMapsUrl = `https://www.google.com/maps?q=${latitud}, ${longitud}&z=18`;
    window.open(googleMapsUrl, '_blank');

}

async function finVisit(customer_id: Number, visit_id:Number ){
    const params={
        customer_id:customer_id,
        visit_id:visit_id
    }
    let conf={
        ...config,
        params:params
    }
    const res =await axios.get('http://54.162.183.155:8000/visitfinish',conf)

    getVistis()
}

</script>
<style >

.card {
    background: var(--card-bg);
    border: var(--card-border);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;

    }
    .select{
        display: flex !important;
        width: 100%;
    }
    ul{
        background-color: #fff ;

    }
</style>