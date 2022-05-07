<template>
  <div class="container-fluid full-page g-0">
    <div class="row full-page g-0">
      <div class="col-11">
        <div class="row">
          <div class="col-12"></div>
        </div>
        <div class="row">
          <Tower v-for="t in towers" :key="t.id" :tower="t" />
        </div>
      </div>
      <div class="col-1 d-flex justify-content-end">
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  name: 'Home',
  setup() {
    return {
      towers: computed(() => AppState.towers)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
