<template>
  <!-- <header>
    <Navbar />
  </header> -->
  <main>
    <!-- <Navbar /> -->
    <div class="container-fluid full-page">
      <div class="row full-page">
        <div class="col-11">
          <router-view />
        </div>
        <div class="col-1 d-flex justify-content-end g-0">
          <Sidebar />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import { towersService } from './services/TowersService'
export default {
  name: 'App',
  setup() {
    onMounted(async () => {
      await towersService.getAllTowers()
    })
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
@font-face {
  font-family: "Emerald Grey";
  src: url("./src/assets/fonts/EmeraldGrey-DxXW.ttf");
}
@font-face {
  font-family: "Ineptic";
  src: url("./src/assets/fonts/Ineptic-vPY7.ttf");
}
@font-face {
  font-family: "Rockout";
  src: url("./src/assets/fonts/Rockout-vVaM.ttf");
}
h1 {
  font-family: "Rockout";
  font-size: 72pt;
}
.full-page {
  min-height: 100vh;
}
</style>
