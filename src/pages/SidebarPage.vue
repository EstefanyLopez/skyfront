
<template>
        <Sidebar  v-model:visible="activeMenu">
            <template #container="{ closeCallback }">
                <div class="flex flex-col h-full" v-motion-roll-visible-once-left>
                    <div class="flex items-center justify-between px-4 pt-4 shrink-0">
                        <span class="inline-flex items-center gap-2">
                            <img :src="logolessbg" alt="logo" width="40">
                            <span class="font-semibold text-2xl text-primary-500 dark:text-primary-400">Skynet S.A</span>
                        </span>
                        <span>
                            <Button type="button" @click="closeCallback" icon="pi pi-times" rounded outlined class="h-8 w-8"></Button>
                        </span>
                    </div>
                    <div class="overflow-y-auto mt-4" v-motion-roll-visible-once-left>
                        <ul class="list-none px-4 m-0">
                            <li>
                                <span class="relative">
                                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                                    <InputText  placeholder="Search" class="pl-10 w-full mt-2" size="small"/>
                                </span>
                            </li>
                            <li>
                               
                                <ul class="list-none p-0 m-0 overflow-hidden">
                                    <li v-for="(menu,index) in (menuSelected.menus || [])" :key="index" :value="menu"
                                    @click="showMenu"

                                    >
                                    <router-link :to="menu.path">

                                        <a v-ripple class="flex items-center cursor-pointer p-3 rounded-md text-surface-700 dark:text-surface-0/80 hover:bg-surface-100 dark:hover:bg-surface-700 duration-200 transition-colors">
                                            <i :class="menu.icon" class="pi mr-2"></i>
                                            <span class="font-medium">{{ menu.menu }}</span>
                                        </a>
                                    </router-link>
                                    </li>
                                    
                                </ul>
                            </li>
                        </ul>
                        
                    </div>
                    <div class="mt-auto" @click="singup">
                        <hr class="mb-3 mx-3 border-t-1 border-none border-surface-200 dark:border-surface-700" />
                        <a 
                        
                        v-ripple class="m-3 flex items-center cursor-pointer p-3 gap-2 rounded-md text-surface-700 dark:text-surface-0/80 hover:bg-surface-100 dark:hover:bg-surface-700 duration-200 transition-colors">
                            <span class="font-bold">Cerrar Sesion</span>
                        </a>
                    </div>
                </div>
            </template>
        </Sidebar>
    
</template>

<script setup lang="ts">
import logolessbg from '../assets/imgs/logolessbg.png'
import{
    RouterLink
} from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import {useMenuStore} from '@/stores/useMenu'
import { storeToRefs } from 'pinia';
const {activeMenu} = storeToRefs(useAuthStore())
const {showMenu, singup} = useAuthStore();
const {menuSelected} = storeToRefs(useMenuStore())

</script>
