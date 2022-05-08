<template>
  <div class="comment d-flex align-items-center">
    <div class="me-3">
      <img class="profile-img rounded" :src="comment.creator.picture" alt="" />
    </div>
    <div class="bg-dark text-light w-100 rounded p-2">
      <div class="d-flex w-25 bg-light text-dark px-1 pt-1">
        <h6>{{ comment.creator.name }}</h6>
        <span v-if="comment.isAttending">is attending this event</span>
      </div>
      <p>{{ comment.body }}</p>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    comment: {
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
.comment {
  min-height: 5vh;
}
.profile-img {
  object-fit: cover;
  max-height: 5vh;
  max-width: auto;
}
</style>