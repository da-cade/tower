import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { ticketsService } from "../services/TicketsService";
import { towersService } from "../services/TowersService";
import BaseController from "../utils/BaseController";

export class TowersController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllTowers)
      .get('/:eventId', this.getTowerById)
      .get('/:eventId/tickets', this.getTicketsByTower)
      .get('/:eventId/comments', this.getCommentsByTower)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTower)
      .put('/:eventId', this.editTower)
      .delete('/:eventId', this.cancelTower)
  }
  async getCommentsByTower(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByTower(req.params.eventId)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async getTicketsByTower(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketsByTower(req.params.eventId)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getAllTowers(req, res, next) {
    try {
      const towers = await towersService.getAllTowers(req.params)
      res.send(towers)
    } catch (error) {
      next(error)
    }
  }
  async getTowerById(req, res, next) {
    try {
      const tower = await towersService.getTowerById(req.params.eventId)
      res.send(tower)
    } catch (error) {
      next(error)
    }
  }

  async createTower(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newTower = await towersService.createTower(req.body)
      res.send(newTower)
    } catch (error) {
      next(error)
    }
  }

  async editTower(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.eventId
      const updatedTower = await towersService.editTower(req.body, req.userInfo.id)
      res.send(updatedTower)
    } catch (error) {
      next(error)
    }
  }

  async cancelTower(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.eventId
      const cancelledTower = await towersService.cancelTower(req.params.eventId, req.userInfo.id)
      res.send(cancelledTower)
    } catch (error) {
      next(error)
    }
  }
}
