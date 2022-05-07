<template>
  <div class="col-3 d-flex justify-content-center">
    <div class="tower">
      <div
        class="coverImg"
        :style="{ 'background-image': `url(${tower.coverImg})` }"
      ></div>
      <div class="towerBody">
        <h5>{{ tower.name }}</h5>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    tower: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.tower {
  height: 30vh;
  width: auto;
}
.towerBody {
  min-height: 60%;
}
.coverImg {
  background-position: center;
  background-size: cover;
  min-height: 40%;
  min-width: auto;
}
</style>