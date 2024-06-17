<template>
    <div class="video-container">
      <video autoplay muted loop id="background-video" >
        <source :src="srcVideo" type="video/mp4">
      </video>
        <slot></slot>
      </div>
  </template>
  
  <script>
  import srcVideo from '../../assets/movies/movielogin.mp4'
  export default {
    name: 'MovieLogin',
     data(){
      return{
        srcVideo
      }
     }
  }
  </script>
  
  <style scoped>
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  
  .video-container {
  
  }
  
  #background-video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);
    z-index: -1;
    pointer-events: none;
  }
  
  .content {
    
  }
  </style>
  