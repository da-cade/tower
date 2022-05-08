<template>
  <div class="container-fluid">
    <div class="row">
      <div class=""></div>
    </div>
    <div class="row">
      <Tower v-for="t in towers" :key="t.id" :tower="t" />
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
