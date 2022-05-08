import { AppState } from "../AppState";
import { api } from "./AxiosService";

class CommentsService {
  async getCommentsByTower(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    console.log(res.data)
    AppState.comments = res.data
  }
  async addComment(newComment) {
    const res = await api.post('api/comments', newComment)
    console.log(res.data)
    AppState.comments.push(res.data)
  }
}

export const commentsService = new CommentsService();