<template>
  <div
    class="d-flex flex-column flex-shrink-1 sticky-top bg-light"
    style="width: 4.5rem; max-height: 50vh"
  >
    <a
      class="d-block p-3 link-dark text-decoration-none selectable"
      title=""
      data-bs-toggle="tooltip"
      data-bs-placement="right"
      data-bs-original-title="Icon-only"
    >
      <svg class="bi" width="32" height="32" fill="currentColor">
        <use
          xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#activity"
        />
      </svg>
      <span class="visually-hidden">Icon-only</span>
    </a>
    <!-- STYLE v-if router=home, refresh -->
    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
      <li class="nav-item">
        <router-link :to="{ name: 'Home' }"
          ><a
            class="nav-link active py-3 border-bottom selectable"
            aria-current="page"
            title="home"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Home"
          >
            <svg class="bi" width="32" height="32" fill="currentColor">
              <use
                xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#hospital-fill"
              />
            </svg> </a
        ></router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Account' }"
          ><a
            class="nav-link py-3 border-bottom selectable"
            title=""
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-original-title="Dashboard"
          >
            <svg class="bi" width="32" height="32" fill="currentColor">
              <use
                xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#fingerprint"
              />
            </svg> </a
        ></router-link>
      </li>
      <!-- NO AUTH  -->
      <!-- AUTH  -->
      <li>
        <a
          class="nav-link py-3 border-bottom selectable"
          title="add event"
          data-bs-toggle="modal"
          data-bs-target="#create-tower-modal"
          data-bs-placement="right"
          data-bs-original-title="Orders"
        >
          <svg class="bi" width="32" height="32" fill="currentColor">
            <use
              xlink:href="../../node_modules/bootstrap-icons/bootstrap-icons.svg#plus-lg"
            />
          </svg>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="nav-link py-3 border-bottom"
          title=""
          data-bs-placement="right"
          data-bs-original-title="Products"
        >
          <svg
            class="bi"
            width="24"
            height="24"
            role="img"
            aria-label="Products"
          >
            <use xlink:href="#grid"></use>
          </svg>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="nav-link py-3 border-bottom"
          title=""
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          data-bs-original-title="Customers"
        >
          <svg
            class="bi"
            width="24"
            height="24"
            role="img"
            aria-label="Customers"
          >
            <use xlink:href="#people-circle"></use>
          </svg>
        </a>
      </li>
    </ul>
    <!-- TODO no broken links -->
    <div class="dropdown border-top">
      <a
        href="#"
        class="
          d-flex
          align-items-center
          justify-content-center
          p-3
          link-dark
          text-decoration-none
          dropdown-toggle
        "
        id="dropdownUser3"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://github.com/mdo.png"
          alt="mdo"
          width="24"
          height="24"
          class="rounded-circle"
        />
      </a>
      <ul
        class="dropdown-menu text-small shadow"
        aria-labelledby="dropdownUser3"
        style=""
      >
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
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
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
svg {
  color: black;
}
</style>