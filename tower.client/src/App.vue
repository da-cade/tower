<template>
  <!-- <header>
    <Navbar />
  </header> -->
  <main>
    <router-view />
  </main>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue'
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
.full-page {
  min-height: 100vh;
  min-width: 100vw;
}
</style>
