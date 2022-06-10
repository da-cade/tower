<template>
  <main>
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
@import "./public/assets/scss/main.scss";

h1 {
  font-family: "Rockout";
  font-size: 72pt;
}
h3 {
  font-family: "Momcake";
}
h5 {
  font-family: "Anek";
}
p {
  font-family: "Anek";
}
span {
  font-family: "Anek";
}
.full-page {
  min-height: 100vh;
}
</style>
