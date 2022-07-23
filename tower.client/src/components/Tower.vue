<template>
  <div
    class="col-md-6 d-flex justify-content-center"
    v-if="new Date(tower.startDate) > new Date()"
    @click="goToTower"
  >
    <div class="tower selectable d-flex flex-column my-2">
      <div v-if="tower.isCanceled" class="canceled-overlay"></div>

      <img class="coverImg" :src="tower.coverImg" :alt="tower.name" />

      <div class="towerContent d-flex flex-column justify-content-between p-2">
        <h3>{{ tower.name }}</h3>
        <div class="d-flex flex-column overflow-hidden towerContent">
          <h6 class="text-dark m-0 mb-1">
            {{ new Date(tower.startDate).toLocaleString() }}
          </h6>
          <div class="description line-clamp">
            <p class="line-clamp">{{ tower.description }}</p>
          </div>
        </div>
        <div class="d-flex justify-content-between mt-2">
          <span class="w-50">{{ tower.location }}</span>
          <div
            v-if="tower.isCanceled"
            class="w-50"
            style="background-color; rgba(139, 0, 0, 0.559); height: 3vh"
          ></div>
          <div class="d-flex" v-if="capacity > 0">
            <p v-if="!tower.isCanceled" class="m-0 ms-1">
              {{ tower.capacity }} spot{{ tower.capacity > 1 ? "s" : "" }}
              left
            </p>
            <p v-if="tower.isCanceled" class="m-0 ms-1">Canceled!</p>
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
import { computed, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { towersService } from "../services/TowersService";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { watchEffect } from "@vue/runtime-core";
export default {
  props: {
    tower: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const capacity = ref();
    watchEffect(() => {
      let ticketHolders = AppState.tickets.filter(
        (t) => t.eventId == props.tower.id
      );
      capacity.value = props.tower.capacity;
    });
    return {
      route,
      capacity,
      account: computed(() => AppState.account),
      goToTower() {
        router.push({ name: "TowerPage", params: { id: props.tower.id } });
      },
      async cancelTower() {
        try {
          if (
            await Pop.confirm(
              "Are you sure?",
              "This event will be canceled or deleted permanently."
            )
          ) {
            await towersService.handleCancel(this.account.id, props.tower.id);
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.description {
  overflow-y: auto;
}

.tower {
  height: 400px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.tower * {
  transition: 0.65s cubic-bezier(0.77, 0, 0.175, 1) all;
}

.tower .towerContent {
  display: block;
  z-index: inherit;
  width: 100%;
  background-color: rgb(246, 235, 235);
}

.tower .coverImg {
  object-fit: cover;
  min-height: 350px;
  min-width: auto;
  position: relative;
}

.tower:hover .coverImg {
  margin-top: -128px;
}

.canceller {
  position: absolute;
  z-index: 12;
  height: 2rem;
  width: 2rem;
  background-color: rgba(139, 0, 0, 0.559);
  right: 3px;
  top: 3px;
}
.canceled-overlay {
  display: flex;
  align-items: flex-end;
  position: absolute;
  z-index: 9;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(139, 0, 0, 0.559);
  pointer-events: none;
}

.line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
</style>