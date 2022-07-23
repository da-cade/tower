<template>
  <div class="comment d-flex align-items-center">
    <div class="me-3">
      <img class="profile-img rounded" :src="comment.creator.picture" alt="" />
    </div>
    <div class="bg-dark w-100 rounded p-2">
      <div class="d-flex justify-content-between">
        <div class="d-flex w-25 pt-1">
          <span class="p-1 bg-light text-dark rounded-top">{{
            comment.creator.name
          }}</span>
          <span v-if="comment.isAttending">is attending this event</span>
        </div>
        <i
          class=""
          @click="deleteComment"
          v-if="comment.creator.id == account.id"
          ><svg
            class="bi selectable rounded-circle on-hover"
            width="16"
            height="16"
            fill="currentColor"
          >
            <use
              xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#x-circle"
            /></svg
        ></i>
      </div>
      <p>{{ comment.body }}</p>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { commentsService } from "../services/CommentsService"
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteComment() {
        try {
          if (await Pop.confirm()) {
            await commentsService.deleteComment(props.comment.id)
            Pop.toast('Comment deleted', 'success')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }

      }
    }
  }
}
</script>


<style lang="scss" scoped>
.comment {
  min-height: 5vh;
}
.comment p {
  padding: 0.5rem;
  background-color: rgb(253, 253, 253);
  color: black;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}

.profile-img {
  object-fit: cover;
  max-height: 5vh;
  max-width: auto;
}
</style>