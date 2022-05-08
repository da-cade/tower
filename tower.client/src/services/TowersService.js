import { AppState } from "../AppState";
import { api } from "./AxiosService";

class TowersService {
  async getAllTowers() {
    const res = await api.get('api/events')
    AppState.towers = res.data
  }
  async getTowerById(id) {
    const res = await api.get('api/events/' + id)
    console.log(res.data)
    AppState.activeTower = res.data
  }
  async createTower(newTower) {
    const res = await api.post('api/events', newTower)
    console.log(res.data)
    AppState.towers.push(res.data)
  }
}

export const towersService = new TowersService();