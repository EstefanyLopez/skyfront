<template>
    <div>
        <SidebarPage/>
        <Modules/>
        <NavbarPage/>
        <RouterView />
        
    </div>
</template>
<script setup lang="ts">
import SidebarPage from '../../pages/SidebarPage.vue'
import NavbarPage from '../../pages/NavbarPage.vue';
import Modules from '../../pages/Modules.vue'
import {  RouterView } from 'vue-router'


</script>