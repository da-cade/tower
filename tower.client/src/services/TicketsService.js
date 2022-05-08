import { AppState } from "../AppState";
import { api } from "./AxiosService";

class TicketsService {
  async getTicketsByTower(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    console.log(res.data)
    AppState.tickets = res.data
  }
  async createTicket(newTicket) {
    const res = await api.post('api/tickets', newTicket)
    console.log(res.data)
    AppState.tickets.push(res.data)
  }
}

export const ticketsService = new TicketsService();