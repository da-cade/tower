<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <div class="text-light d-flex align-items-center">
          <h1 class="me-1" style="font-size: 6.5rem">T</h1>
          <h1 style="font-size: 9.5rem">O</h1>
          <h1 style="font-size: 11rem">W</h1>
          <h1 class="ms-1" style="font-size: 9rem">E</h1>
          <h1 class="ms-2" style="font-size: 6.5rem">R</h1>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="">
        <!-- TODO stretch rotating banner thing -->
      </div>
    </div>
    <div class="row">
      <div class="d-flex">
        <button @click="filter = 'concert'">Concert</button>
        <button @click="filter = 'sport'">Sport</button>
        <button @click="filter = 'convention'">Convention</button>
        <button @click="filter = 'digital'">Digital</button>
        <button v-if="filter" @click="filter = ''">Clear Filters</button>
      </div>
      <Tower v-for="t in filteredTowers" :key="t.id" :tower="t" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { watchEffect } from "@vue/runtime-core"
export default {
  name: 'Home',
  setup() {
    const filter = ref('')
    const filteredTowers = ref([])
    watchEffect(() => {
      let list = AppState.towers
      if (filter.value) {
        list = list.filter(t => t.type == filter.value)
      }
      filteredTowers.value = list
    })
    return {
      filter,
      filteredTowers,
      account: computed(() => AppState.account),
      towers: computed(() => AppState.towers)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
