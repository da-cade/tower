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
      <div class="col-md-12">
        <div class="d-flex justify-content-around w-100 bg-light my-2">
          <div
            class="p-2 selectable text-center filter"
            @click="filter = 'concert'"
          >
            <h6 class="m-0">Concert</h6>
          </div>
          <div
            class="p-2 selectable text-center filter"
            @click="filter = 'sport'"
          >
            <h6 class="m-0">Sport</h6>
          </div>
          <div
            class="p-2 selectable text-center filter"
            @click="filter = 'convention'"
          >
            <h6 class="m-0">Convention</h6>
          </div>
          <div
            class="p-2 selectable text-center filter"
            @click="filter = 'digital'"
          >
            <h6 class="m-0">Digital</h6>
          </div>
          <div
            class="p-2 selectable text-center filter"
            v-show="filter"
            @click="filter = ''"
          >
            <h6 class="m-0">Clear Filters</h6>
          </div>
        </div>
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
.filter {
  min-width: 20%;
  font-family: "Momcake";
}
h6 {
  font-size: 1.25rem;
}
</style>
