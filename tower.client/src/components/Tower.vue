<template>
  <div
    class="col-md-3 d-flex justify-content-center"
    v-if="new Date(tower.startDate) > new Date() && !tower.isPrivate"
  >
    <div class="tower my-2">
      <!-- TODO render cancel -->
      <!-- <div v-if="tower.isCanceled" class="strikeout"></div> -->
      <div
        class="coverImg rounded-top"
        :style="{ 'background-image': `url(${tower.coverImg})` }"
      >
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
        <div v-if="tower.isCanceled" class="canceller">Canceled!</div>
      </div>
      <div
        @click.stop="goToTower"
        class="
          selectable
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
          <div
            v-if="tower.isCanceled"
            class="w-100"
            style="background-color; rgba(139, 0, 0, 0.559); height: 3vh"
          ></div>
          <div class="d-flex" v-if="capacity > 0">
            <span>{{ capacity }}</span>
            <p v-if="capacity == 1" class="m-0 ms-1">spot left</p>
            <p v-else class="m-0 ms-1">spots left</p>
          </div>
          <div class="d-flex" v-else>
            <p class="m-0">Sold Out!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { useRoute, useRouter } from "vue-router"
import { towersService } from "../services/TowersService"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { watchEffect } from "@vue/runtime-core"
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
    const capacity = ref()
    watchEffect(() => {
      let ticketHolders = AppState.tickets.filter(t => t.eventId == props.tower.id)
      capacity.value = props.tower.capacity - ticketHolders.length
    })
    return {
      route,
      capacity,
      account: computed(() => AppState.account),
      // towerStyle: style,
      goToTower() {
        router.push({ name: 'TowerPage', params: { id: props.tower.id } })
      },
      async cancelTower() {
        try {
          if (await Pop.confirm("Are you sure?", "This event will be canceled or deleted permanently.")) {
            await towersService.handleCancel(this.account.id, props.tower.id)
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
.tower {
  height: 40vh;
  width: 100%;
  position: relative;
}
.towerBody {
  height: 40%;
  width: 100%;
}
.coverImg {
  background-position: center;
  background-size: cover;
  min-height: 60%;
  min-width: auto;
  position: relative;
}
// .strikeout {
//   height: 100%;
//   width: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   opacity: 0.7;
//   z-index: 10;
//   background-color: rgba(139, 0, 0, 0.559);
//   pointer-events: none;
// }
.canceller {
  position: absolute;
  z-index: 12;
  height: 2rem;
  width: 2rem;
  background-color: rgba(139, 0, 0, 0.559);
  right: 3px;
  top: 3px;
}
</style>