<template>
  <div class="container-fluid">
    <div class="row d-flex">
      <span class="text-light mt-4 mb-2"> My Tickets </span>
      <div class="col-md-6" v-for="t in tickets" :key="t.id">
        <!-- <div class="row" >
          <div class="col-12"> -->
        <div class="d-flex ticket bg-light p-2 my-1">
          <img class="coverImg" :src="t.event.coverImg" :alt="t.event.name" />
          <div class="d-flex flex-column justify-content-between">
            <div class="p-2">
              <h6>{{ t.account.name }}</h6>
              <h5>{{ t.event.name }}</h5>
              <hr />
              <div class="text-dark">
                <p class="m-0">{{ t.event.location }}</p>
                <p class="m-0">
                  {{ new Date(t.event.startDate).toLocaleString() }}
                </p>
              </div>
            </div>
          </div>
          <button
            class="mt-auto ms-auto"
            @click="deleteTicket(t.id)"
            aria-label="Delete Ticket"
          >
            Not going
          </button>
        </div>
        <!-- </div>
        </div> -->
      </div>
    </div>
    <div class="row">
      <span class="text-light my-3">My Events</span>
      <Tower v-for="t in towers" :key="t.id" :tower="t" />
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { ticketsService } from "../services/TicketsService"
import { towersService } from "../services/TowersService"
export default {
  name: 'Account',
  setup() {
    const sold = ref('')
    watchEffect(async () => {
      if (sold.value) {
        await towersService.getTowerById(AppState.activeTower.id)
        sold.value = ''
      }
    })
    return {
      tickets: computed(() => AppState.tickets),
      account: computed(() => AppState.account),
      towers: computed(() => AppState.towers.filter(t => t.creatorId == AppState.account.id)),
      async deleteTicket(ticketId) {
        try {
          if (await Pop.confirm("Are you sure?",
            'If you proceed, someone else can claim this ticket. If you change your mind, get a new ticket before spots run out!')) {
            await ticketsService.deleteTicket(ticketId)
            Pop.toast("We've given up your spot for you")
            sold.value = 'sold'
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
    }
  }
}
</script>

<style scoped>
.coverImg {
  height: auto;
  width: 10vw;
  object-fit: cover;
}
</style>
