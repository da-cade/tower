import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { towersService } from "./TowersService"

class TicketsService {
  async getTicketsByAccount(accountId) {
    return await dbContext.Tickets.find({ accountId: accountId }).populate('account', 'name picture').populate('event')
  }
  async getTicketsByTower(eventId) {
    return await dbContext.Tickets.find({ eventId: eventId }).populate('account', 'name picture').populate('event')
  }
  async createTicket(newTicket) {
    const event = await towersService.getTowerById(newTicket.eventId)
    if (event.capacity == 0) {
      throw new BadRequest("This event is sold out")
    }
    const alreadyTicket = await (await this.getTicketsByAccount(newTicket.accountId)).find(t => t.eventId == event.id)
    if (alreadyTicket) {
      throw new BadRequest("You may only reserve one ticket per event.")
    }
    // REVIEW this line worked for Postman but now causes server crash
    const ticket = await dbContext.Tickets.create(newTicket)
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