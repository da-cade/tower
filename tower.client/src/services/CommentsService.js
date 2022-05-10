import { AppState } from "../AppState";
import { api } from "./AxiosService";

class CommentsService {
  async getCommentsByTower(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.comments = res.data
  }
  async addComment(newComment) {
    const res = await api.post('api/comments', newComment)
    AppState.comments.push(res.data)
  }
  async deleteComment(id) {
    await api.delete(`api/comments/${id}`)
    AppState.comments = AppState.comments.filter(c => c.id !== id)
  }
}

export const commentsService = new CommentsService();