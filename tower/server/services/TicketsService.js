import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden, UnAuthorized } from "../utils/Errors"
import { towersService } from "./TowersService"

class TicketsService {
  async getTicketsByAccount(accountId) {
    return await dbContext.Tickets.find({ accountId: accountId }).populate('account').populate('event')
  }
  async getTicketsByTower(eventId) {
    return await dbContext.Tickets.find({ eventId: eventId }).populate('account').populate('event')
  }
  async createTicket(newTicket) {
    const ticket = await dbContext.Tickets.create(newTicket)
    const event = await dbContext.Towers.findById(ticket.eventId)
    if (event.capacity == 0) {
      throw new BadRequest("This event is sold out")
    }
    event.capacity -= 1
    event.save()
    await ticket.populate('account')
    await ticket.populate('event')
    return ticket
  }
  async deleteTicket(id, accountId) {
    const ticket = await dbContext.Tickets.findById(id)
    if (!ticket) {
      throw new BadRequest("We couldn't find that ticket")
    }
    if (ticket.accountId.toString() != accountId) {
      throw new Forbidden("We musn't touch what isn't ours")
    }
    const tower = await dbContext.Towers.findById(ticket.eventId)
    tower.capacity += 1
    tower.save()
    const delTicket = await ticket.remove()
    return delTicket
  }

}

export const ticketsService = new TicketsService()