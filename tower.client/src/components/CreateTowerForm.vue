<template>
  <form id="create-tower-form" @submit.prevent="createTower">
    <div class="row d-flex align-items-center">
      <div class="col mb-3">
        <label for="tower-name" class="form-label">Name:</label>
        <input
          type="text"
          class="form-control"
          name="tower-name"
          id="tower-name"
          v-model="formData.name"
          required
        />
      </div>
      <div class="col mb-3 dropdown">
        <label for="tower-type" class="form-label">Type:</label>
        <select
          id="tower-type"
          class="form-select"
          aria-label="Choose the type of event"
          required
        >
          <option selected disabled>Event Type</option>
          <option value="concert">Concert</option>
          <option value="convention">Convention</option>
          <option value="sport">Sport</option>
          <option value="digital">Digital</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col mb-3">
        <label for="tower-startDate" class="form-label">Start Date:</label>
        <input
          type="date"
          class="form-control"
          name="tower-date"
          id="tower-date"
          v-model="date.date"
          required
        />
      </div>
      <div class="col mb-3">
        <label for="tower-startTime" class="form-label">Start Time:</label>
        <input
          type="time"
          class="form-control"
          name="tower-time"
          id="tower-time"
          v-model="date.time"
          required
        />
      </div>
    </div>
    <div class="row">
      <div class="col mb-3">
        <label for="tower-location" class="form-label">Location:</label>
        <input
          type="text"
          class="form-control"
          name="tower-location"
          id="tower-location"
          min="2"
          v-model="formData.location"
          required
        />
      </div>
      <div class="col mb-3">
        <label for="tower-capacity" class="form-label">Maximum Capacity:</label>
        <input
          type="number"
          class="form-control"
          name="tower-capacity"
          id="tower-capacity"
          placeholder="Enter a number"
          v-model="formData.capacity"
          required
        />
      </div>
    </div>
    <div class="row d-flex align-items-end justify-content-between">
      <div class="col-8 mb-3">
        <label for="tower-coverImg" class="form-label">Add an image:</label>
        <input
          type="text"
          class="form-control"
          name="tower-coverImg"
          id="tower-coverImg"
          placeholder="enter a url here"
          v-model="formData.coverImg"
          required
        />
      </div>
      <div class="col-4 mb-2 d-flex align-items-center justify-content-end">
        <label for="tower-isPrivate" class="text-right form-label m-0">
          <input
            type="checkbox"
            class="form-check-input mt-1"
            name="tower-isPrivate"
            id="tower-isPrivate"
            v-model="formData.isPrivate"
          />
          Is this a private event?</label
        >
      </div>
    </div>
    <div class="row">
      <div class="col mb-3">
        <label for="tower-description" class="form-label"
          >Add a Description:</label
        >
        <textarea
          type="text"
          class="form-control"
          name="tower-description"
          id="tower-description"
          placeholder="Maximum of 1000 characters"
          max="1000"
          v-model="formData.description"
          required
        />
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Close
      </button>
      <button type="submit" class="btn btn-primary">Save</button>
    </div>
  </form>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { towersService } from "../services/TowersService"
import { AppState } from "../AppState"
import { Modal } from "bootstrap"
import { useRouter } from "vue-router"
export default {
  setup() {
    const date = ref({})
    const formData = ref({})
    const router = useRouter()
    return {
      account: computed(() => AppState.account),
      formData,
      date,
      async createTower() {
        try {
          formData.value.creatorId = this.account.id
          formData.value.startDate = new Date((date.value.date).toString() + ', ' + (date.value.time).toString())
          formData.value.isCanceled = false
          formData.value.type = document.getElementById('tower-type').value.toLowerCase()
          const newTower = await towersService.createTower(formData.value)
          Modal.getOrCreateInstance(document.getElementById('create-tower-modal')).toggle()
          router.push({ name: 'TowerPage', params: { id: newTower._id } })
          date.value = {}
          formData.value = {}
        } catch (error) {
          logger.error(error)
          if (formData.value.type == "event type") {
            Pop.toast('You need to supply an event type')
          } else {
            Pop.toast(error.message, 'error')
          }
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>