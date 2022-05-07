import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { ticketsService } from "../services/TicketsService"
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getTicketsByAccount)
  }
  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getTicketsByAccount(req, res, next) {
    try {
      req.params.id = req.userInfo.id
      const tickets = await ticketsService.getTicketsByAccount(req.userInfo.id)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
}
