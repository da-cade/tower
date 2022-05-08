<template>
  <div class="col-md-3 d-flex justify-content-center">
    <div class="tower p-2 m-2 selectable" @click.stop="goToTower">
      <div
        class="coverImg rounded-top"
        :style="{ 'background-image': `url(${tower.coverImg})` }"
      ></div>
      <div
        class="
          towerBody
          rounded-bottom
          bg-light
          d-flex
          flex-column
          justify-content-between
          p-2
        "
      >
        <h5>{{ tower.name }}</h5>
        <!-- STYLE fix overflow, add text fade out if possible, text-overflow class not useful -->
        <div style="max-height: 7vh" class="d-flex flex-column overflow-hidden">
          <h6 class="text-dark m-0">
            {{ new Date(tower.startDate).toLocaleString() }}
          </h6>
          <p style="" class="">{{ tower.description }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <span>{{ tower.location }}</span>
          <div class="d-flex">
            <span>{{ tower.capacity }}</span>
            <p class="ms-1">spots left</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { useRoute, useRouter } from "vue-router"
export default {
  props: {
    tower: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    return {
      goToTower() {
        router.push({ name: 'TowerPage', params: { id: props.tower.id } })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.tower {
  height: 40vh;
  width: 100%;
}
.towerBody {
  min-height: 40%;
  width: 100%;
}
.coverImg {
  background-position: center;
  background-size: cover;
  min-height: 60%;
  min-width: auto;
}
</style>