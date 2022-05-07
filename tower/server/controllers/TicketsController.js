import { Auth0Provider } from "@bcwdev/auth0provider"
import { ticketsService } from "../services/TicketsService"
import BaseController from "../utils/BaseController"

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.deleteTicket)
  }
  async createTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.createTicket(req.body)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async deleteTicket(req, res, next) {
    try {
      req.body.id = req.params.ticketId
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.deleteTicket(req.body.id, req.userInfo.id)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
}
