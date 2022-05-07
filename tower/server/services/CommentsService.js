import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class CommentsService {
  async getCommentsByTower(eventId) {
    return await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name picture').populate('event')
  }
  async getSingleComment(commentId) {
    return await dbContext.Comments.findById(commentId).populate('creator', 'name picture').populate('event')
  }
  async createComment(newComment) {
    const comment = await dbContext.Comments.create(newComment)
    await comment.populate('creator')
    return comment
  }
  async deleteComment(commentId, accountId) {
    const comment = await this.getSingleComment(commentId)
    if (!comment) {
      throw new BadRequest("We couldn't find that comment.")
    }
    if (comment.creatorId.toString() != accountId) {
      throw new Forbidden("No touchy")
    }
    comment.remove()
  }
}

export const commentsService = new CommentsService()