<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-12">
        <div
          class="tower-details d-flex bg-light m-2 p-2"
          :style="'background-image: url(' + tower.coverImg + ')'"
        >
          <div v-if="tower.isCanceled" class="canceled-overlay"></div>
          <div class="tower-coverImg"></div>
          <i
            v-if="!tower.isCanceled && account.id == tower.creatorId"
            @click="cancelTower"
            :id="'canceller-' + tower.id"
            class="canceller rounded-circle selectable on-hover"
            ><svg class="bi" width="32" height="32" fill="currentColor">
              <use
                xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#x-circle"
              /></svg
          ></i>
          <div class="tower-info w-100 p-3 d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex flex-column align-items-start">
                <h3>{{ tower.name }}</h3>

                <h5>{{ tower.location }}</h5>
              </div>
              <div class="d-flex flex-column align-items-end">
                <h6>-- {{ tower.type }} --</h6>
                <h5>
                  {{ date[0] }}
                </h5>
                <h6>Doors at {{ date[1] }}</h6>
              </div>
            </div>
            <hr class="my-1" />
            <div class="description">
              <p class="m-0">{{ tower.description }}</p>
            </div>

            <div class="d-flex justify-content-between mt-auto align-items-end">
              <div
                class="numbers-info"
                v-if="tower.capacity != 0 && !tower.isCanceled"
              >
                <span class="me-2" v-if="tower.capacity == 1">
                  {{ tower.capacity }} spot left
                </span>
                <span class="me-2" v-else>
                  {{ tower.capacity }} spots left
                </span>
                <i
                  ><svg class="bi" width="18" height="18" fill="currentColor">
                    <use
                      xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#hourglass-split"
                    /></svg
                ></i>
              </div>
              <!-- TODO style this -->
              <h6 v-if="tower.capacity == 0 && !tower.isCanceled">Sold Out!</h6>
              <button
                class=""
                v-if="
                  account.id &&
                  tower.capacity !== 0 &&
                  !isAttending &&
                  !tower.isCanceled &&
                  tower.creatorId != account.id
                "
                @click="createTicket()"
              >
                Attend
                <svg class="bi" width="32" height="32" fill="currentColor">
                  <use
                    xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#bookmark"
                  />
                </svg>
              </button>
              <div v-if="tower.isCanceled"><strong>Canceled!</strong></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="d-flex flex-wrap attendees bg-light m-2 p-1">
          <!-- TODO check wrap -->
          <img
            v-for="a in attendees"
            :key="a.accountId"
            :src="a.account.picture"
            class="attendeesImg rounded-circle me-1"
            alt="user-img"
            :title="a.account.name"
          />
        </div>
      </div>
      <div class="col-10">
        <div v-if="account.id" class="comments-section bg-light p-2">
          <div class="">
            <div>
              <p></p>
            </div>
            <div class="mb-3">
              <label for="new-comment" class="ms-2 form-label"
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
                  class="btn btn-warning mt-2"
                  type="submit"
                  for="comment-textarea"
                  @click="addComment()"
                >
                  Post Comment
                </button>
              </div>
            </div>
            <Comment v-for="c in comments" :key="c.id" :comment="c" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div style="height: 5vh"></div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { useRoute, useRouter } from "vue-router"
import { AppState } from "../AppState"
import { towersService } from "../services/TowersService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { commentsService } from "../services/CommentsService"
import { ticketsService } from "../services/TicketsService"
import { watchEffect } from "@vue/runtime-core"

export default {
  setup() {
    const submission = ref({})
    const route = useRoute()
    const router = useRouter()
    const bought = ref('')
    const canceled = ref(null)
    watchEffect(async () => {
      if (bought.value || canceled.value) {
        await towersService.getTowerById(AppState.activeTower.id)
        bought.value = ''
        canceled.value = null
      }

    })
    return {
      canceled,
      submission,
      attendees: computed(() => AppState.tickets.filter(t => t.eventId == route.params.id)),
      date: computed(() => new Date(AppState.activeTower.startDate).toLocaleString().split(",")),
      tower: computed(() => AppState.activeTower),
      tickets: computed(() => AppState.tickets),
      isAttending: computed(() => AppState.tickets.find(t =>
        (t.eventId == AppState.activeTower.id && t.accountId == AppState.account.id))),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      async createTicket() {
        try {
          const newTicket = {
            eventId: this.tower.id,
            accountId: this.account.id
          }
          if (!this.isAttending) {
            await ticketsService.createTicket(newTicket)
            Pop.toast('Spot confirmed', 'success')
            bought.value = 'bought'
          } else {
            throw new Error('You cannot reserve more than one ticket for an event')
          }
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
      },
      async cancelTower() {
        try {
          if (await Pop.confirm("Are you sure?", "This event will be canceled or deleted permanently.")) {
            const res = await towersService.handleCancel(this.account.id, this.tower.id)
            if (res == 'deleted') {
              router.push({ name: 'Home' })
            } else {
              Pop.toast("Your event has been canceled")
              canceled.value = true
            }
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
@import "./public/assets/scss/main.scss";

.canceller {
  position: absolute;
  height: 2rem;
  width: 2rem;
  background-color: rgba(139, 0, 0, 0.8);
  right: -2px;
  top: -2px;
}

.tower-details {
  min-width: 100%;
  height: 60vh;
  background-size: cover;
  position: relative;
}

.tower-coverImg {
  height: 100%;
  width: 100%;
}

.tower-info {
  border-radius: 3px;
  min-width: 66%;
  height: 100%;
  background-color: rgba(240, 240, 240, 0.9);
}

.description {
  overflow-y: auto;
  scrollbar-width: 2px;
  scrollbar-base-color: #111927;
  padding: 1rem;
  margin-bottom: 1rem;
}

.numbers-info {
  display: flex;
  align-content: end;
  border-radius: 3px;
  background-color: maroon;
  color: white;
  padding: 0.25rem;
  font-family: "Momcake";
}

.numbers-info i {
  margin-bottom: 0.25rem;
}

.attendees {
  min-height: 5vh;
  width: 100%;
}
.attendeesImg {
  height: 3rem;
  width: auto;
}
#comment-textarea {
  height: 8vh;
}
.canceled-overlay {
  display: block;
  // align-items: flex-end;
  position: absolute;
  z-index: 9;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(139, 0, 0, 0.559);
  pointer-events: none;
}
</style>