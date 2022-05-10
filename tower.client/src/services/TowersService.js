import { AppState } from "../AppState";
import { api } from "./AxiosService";
import { ticketsService } from "./ticketsService";

class TowersService {
  async getAllTowers() {
    const res = await api.get('api/events')
    AppState.towers = res.data
  }
  async getTowerById(id) {
    const res = await api.get('api/events/' + id)
    AppState.activeTower = res.data
    return res.data
  }
  async createTower(newTower) {
    const res = await api.post('api/events', newTower)
    AppState.towers.push(res.data)
    return res.data
  }
  async handleCancel(accountId, eventId) {
    const original = await this.getTowerById(eventId)
    const tickets = await ticketsService.getTicketsByTower(eventId)
    if (original.isCanceled == true) {
      throw new Error("You cannot edit a cancelled event")
    }
    if (!original) {
      throw new Error("We couldn't find that event")
    }
    if (accountId != original.creatorId) {
      throw new Error("You cannot modify this event")
    }
    //potentially just comment out lines 33-36, and go to back service.
    // if (tickets.length == 0) {
    //   AppState.towers = AppState.towers.filter(t => t.id != eventId)
    //   return 'deleted'
    // }
    await api.delete(`api/events/` + eventId)
    AppState.towers = AppState.towers
    return 'canceled'
  }
}

export const towersService = new TowersService();