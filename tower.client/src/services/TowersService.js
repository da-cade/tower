import { AppState } from "../AppState";
import { api } from "./AxiosService";

class TowersService {
  async getAllTowers() {
    const res = await api.get('api/events')
    console.log(res.data)
    AppState.towers = res.data
  }
}

export const towersService = new TowersService();