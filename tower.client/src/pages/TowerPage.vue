<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-12">
        <div class="tower-details d-flex bg-light m-2 p-2">
          <img class="" :src="tower.coverImg" alt="" />
          <div class="tower-info p-3 d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center p-2">
              <div class="d-flex flex-column align-items-start">
                <h3>{{ tower.name }}</h3>
                <h5>{{ tower.location }}</h5>
              </div>
              <div class="d-flex flex-column align-items-end">
                <h5>
                  {{ date[0] }}
                </h5>
                <h6>Doors at {{ date[1] }}</h6>
              </div>
            </div>
            <div>
              <p class="m-0">{{ tower.description }}</p>
            </div>

            <div class="d-flex justify-content-between mt-auto">
              <h6>
                {{ tower.capacity }} spots left
                <svg class="bi" width="32" height="32" fill="currentColor">
                  <use
                    xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#hourglass-split"
                  />
                </svg>
              </h6>
              <button @click="createTicket()">
                Attend
                <svg class="bi" width="32" height="32" fill="currentColor">
                  <use
                    xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#bookmark"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="attendees bg-light m-2"></div>
      </div>
      <div class="col-10">
        <div class="comments-section bg-light p-2">
          <div class="">
            <div>
              <p></p>
            </div>
            <div class="mb-3">
              <label for="new-comment" class="form-label"
                >Join the conversation</label
              >
              <textarea
                type="text"
                class="form-control"
                name="new-comment"
                id="comment-textarea"
                aria-label="New Comment"
                placeholder="Type your comment here"
                v-model="submission.body"
              />
              <div class="w-100 d-flex justify-content-end">
                <button
                  class=""
                  type="submit"
                  for="comment-textarea"
                  @click="addComment()"
                >
                  post comment
                </button>
              </div>
            </div>
            <Comment v-for="c in comments" :key="c.id" :comment="c" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { watchEffect } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { towersService } from "../services/TowersService"
import { ticketsService } from "../services/TicketsService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { commentsService } from "../services/CommentsService"
export default {
  setup() {
    const submission = ref({})
    const route = useRoute()
    watchEffect(async () => {
      route.params
      try {
        if (route.params.id) {
          console.log(route.params.id)
          await towersService.getTowerById(route.params.id)
          await commentsService.getCommentsByTower(route.params.id)
          // REVIEW service name
          await ticketsService.getTicketsByTower(route.params.id)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }

    })
    return {
      date: computed(() => new Date(AppState.activeTower.startDate).toLocaleString().split(",")),
      tower: computed(() => AppState.activeTower),
      tickets: computed(() => AppState.tickets),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      submission,
      async createTicket() {
        try {
          const newTicket = {
            eventId: this.tower.id,
            accountId: this.account.id
          }
          await frontTicketsService.createTicket(newTicket)
          Pop.toast(`A lucky venue to be getting you`, 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async addComment() {
        try {
          submission.value.creatorId = this.account.id
          // submission.value.isAttending = REVIEW need to find a ticket that has both this account and this event
          submission.value.eventId = route.params.id
          await commentsService.addComment(submission.value)
          submission.value = {}
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
img {
  max-width: 33%;
}
.comments-section {
}
.tower-details {
  object-fit: cover;
  min-width: 100%;
  height: 33vh;
}
.tower-info {
  min-width: 66%;
  height: 100%;
}
.attendees {
  min-height: 5vh;
  width: 100%;
}
#comment-textarea {
  height: 8vh;
}
</style>