
<template>
    <div class="w-screen">
        <Menubar v-motion-roll-visible-left>
            <template #start>
                <div class="flex items-center gap-3 p-0">

                    <img :src="logolessbg" alt="logo" width="30">
                    <span class="hidden sm:block dark:text-primary-400">SkyNet</span>
                    <Button @click="showMenu" size="small" icon="pi pi-align-left" text raised rounded aria-label="Filter" />
                </div>
            </template>

                
            <template #end>
                <div class="flex items-center gap-3">
                    <InputText placeholder="Search" size="small" type="text" class="w-[10rem] sm:w-auto" />
                    <Button icon="pi pi-th-large" size="small" aria-label="Filter" @click="showModules" text raised rounded />
                    <Button  text raised rounded size="small" aria-label="Filter"
                        class="h-9 w-10 rounded-full inline-flex justify-center items-center bg-gray-100 dark:bg-surface-800 hover:bg-gray-200 dark:hover:bg-surface-700 text-surface-700 hover:text-surface-900 dark:text-surface-500 dark:hover:text-surface-300 transition-colors duration-200"
                        @click="toggleDarkMode">
                        <i class="pi toggle-icon" />
                    </Button>

                </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup lang="ts">
import logolessbg from '../assets/imgs/logolessbg.png'
import { useAuthStore } from '@/stores/auth';
const {showMenu, showModules}=useAuthStore()
const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
}


</script>
<style scoped>
.card{
    padding: 0;
    margin:0;
}
.toggle-icon:before {
    content: "\e9c8";
}

:root[class="dark"] .toggle-icon:before {
    content: "\e9c7";
}
</style>
