import { Auth0Provider } from "@bcwdev/auth0provider"
import { commentsService } from "../services/CommentsService"
import BaseController from "../utils/BaseController"

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .get('/:commentId', this.getSingleComment)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.deleteComment)
  }
  async getSingleComment(req, res, next) {
    try {
      const comment = await commentsService.getSingleComment(req.params.commentId)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newComment = await commentsService.createComment(req.body)
      res.send(newComment)
    } catch (error) {
      next(error)
    }
  }
  async deleteComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.commentId, req.userInfo.id)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

}