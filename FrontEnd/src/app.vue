<template>
    <div id="app">
      <Nav></Nav>
      <router-view></router-view>
    </div>
</template>

<script>
import Nav from "./composant/Nav";
export default {
    name: "App",
    components: {
      Nav
    }
}
</script>

<style>
  body {
    background: rgb(61,71,190);
    background: linear-gradient(90deg, rgba(61,71,190,1) 0%, rgba(10,81,166,1) 100%);
  }
</style>