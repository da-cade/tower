<template>
  <div
    class="
      d-flex
      flex-column
      justify-content-between
      align-items-center
      flex-shrink-1
      sticky-top
      bg-light
    "
    style="width: 4.5rem; max-height: 50vh"
  >
    <div class="d-flex flex-column align-items-center flex-shrink-1">
      <router-link :to="{ name: 'Home' }"
        ><div
          class="d-block p-3 link-dark text-decoration-none selectable"
          title="Home"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          data-bs-original-title="Icon-only"
        >
          <svg class="bi" width="32" height="32" fill="currentColor">
            <use
              xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#hospital"
            />
          </svg>
          <span class="visually-hidden">Icon-only</span>
        </div></router-link
      >
      <!-- STYLE v-if router=home, refresh -->
      <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li class="nav-item">
          <router-link :to="{ name: 'Account' }"
            ><div
              class="nav-link active py-3 border-bottom selectable"
              aria-current="page"
              title="Activity"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-original-title="Home"
            >
              <svg class="bi" width="32" height="32" fill="currentColor">
                <use
                  xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#activity"
                />
              </svg></div
          ></router-link>
        </li>
        <li>
          <!-- TODO what are we putting here? -->
          <router-link :to="{ name: 'Account' }"
            ><div
              class="nav-link py-3 border-bottom selectable"
              title="Account"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-original-title="Dashboard"
            >
              <svg class="bi" width="32" height="32" fill="currentColor">
                <use
                  xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#fingerprint"
                />
              </svg></div
          ></router-link>
        </li>
      </ul>
    </div>
    <!-- NO AUTH  -->
    <!-- AUTH  -->
    <div class="d-flex flex-column align-items-center flex-shrink-1">
      <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li v-if="user.isAuthenticated">
          <label for="new-tower" class="visually-hidden">Add an Event</label>
          <div
            id="new-tower"
            class="nav-link py-3 border-bottom selectable"
            title="Add Event"
            data-bs-toggle="modal"
            data-bs-target="#create-tower-modal"
          >
            <svg class="bi" width="32" height="32" fill="currentColor">
              <use
                xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#plus-lg"
              />
            </svg>
          </div>
        </li>
      </ul>
      <!-- TODO no broken links -->
      <button
        class="btn selectable text-dark lighten-30 text-uppercase my-2 my-lg-0"
        aria-label="Login"
        title="Login"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>

      <img
        v-if="account.id"
        :src="account.picture"
        alt="profile pic"
        class="profileImg rounded-circle"
      />

      <div v-if="account.id" class="text-center">
        <div id="logout" class="d-flex py-2 selectable" @click="logout">
          <i class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
    </div>
  </div>
  <Modal id="create-tower-modal">
    <template #modal-header-slot>
      <div class="d-flex flex-column">
        <h4>Host an Event</h4>
        <h6 class="ms-1 mb-0">Tell us about it</h6>
      </div>
    </template>
    <template #modal-body-slot>
      <CreateTowerForm />
    </template>
  </Modal>
</template>


<script>
import { computed, watchEffect } from "@vue/runtime-core"
import { useRoute, useRouter } from "vue-router"
import { towersService } from "../services/TowersService"
import { commentsService } from "../services/CommentsService"

import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
import { ticketsService } from "../services/ticketsService"
import { AuthService } from "../services/AuthService"
export default {
  setup() {
    const route = useRoute()

    watchEffect(async () => {
      route.params
      // AppState
      try {
        AppState.activeTower = {}
        if (route.name == 'TowerPage') {
          console.log(route.params.id)
          await towersService.getTowerById(route.params.id)
          await commentsService.getCommentsByTower(route.params.id)
          await ticketsService.getTicketsByTower(route.params.id)
        }
        if (route.name == 'Account') {
          await ticketsService.getTicketsByAccount()
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }

    })
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    }
  }
}
</script>


<style lang="scss" scoped>
svg {
  color: black;
}
#logout {
  color: rgb(97, 0, 0);
}
.profileImg {
  height: 3rem;
  width: auto;
}
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s ease;
}
.dropdown-menu.show {
  transform: scale(1);
}
.list-group-item-action {
  max-width: 5rem;
  right: 1rem;
}
i {
  font-family: "Anek";
}
</style>