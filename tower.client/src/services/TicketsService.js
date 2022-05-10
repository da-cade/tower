import { AppState } from "../AppState";
import { api } from "./AxiosService";

class TicketsService {
  async getTicketsByTower(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.tickets = res.data
    return res.data
  }
  async createTicket(newTicket) {
    const res = await api.post('api/tickets', newTicket)
    AppState.tickets.push(res.data)
    return res.data
  }
  async deleteTicket(ticketId) {
    const res = await api.delete('api/tickets/' + ticketId)
    AppState.tickets = AppState.tickets.filter(t => t.id !== ticketId)
  }
  async getTicketsByAccount() {
    const res = await api.get('account/tickets')
    AppState.tickets = res.data
    return res.data
  }
}

export const ticketsService = new TicketsService();  