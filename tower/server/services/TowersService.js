import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TowersService {
  async getAllTowers(query = {}) {
    return await dbContext.Towers.find(query).populate('creator', 'name picture')

  }
  async getTowerById(towerId) {
    return await dbContext.Towers.findById(towerId).populate('creator', 'name picture')
  }
  async createTower(body) {
    return await dbContext.Towers.create(body)
  }
  async editTower(update, accountId) {
    const original = await this.getTowerById(update.id)
    if (original.creatorId.toString() != accountId) {
      throw new BadRequest("We musn't touch what isn't ours")
    }
    if (original.isCanceled) {
      throw new BadRequest("You can't make edits to a canceled event")
    }
    original.name = update.name || original.name
    original.description = update.description || original.description
    original.coverImg = update.coverImg || original.coverImg
    original.location = update.location || original.location
    original.capacity = update.capacity || original.capacity
    original.startDate = update.startDate || original.startDate
    original.isPrivate = update.isPrivate || original.isPrivate
    await original.save()
    return original
  }
  async cancelTower(towerId, accountId) {
    const tower = await this.getTowerById(towerId)
    if (!tower) {
      throw new BadRequest("We couldn't find that event")
    }
    if (tower.creatorId.toString() != accountId) {
      throw new Forbidden("We musn't touch what isn't ours")
    }
    if (tower.isCanceled) {
      throw new BadRequest("You can't make edits to a canceled event")
    }
    tower.isCanceled = true
    await tower.save()
    return tower
  }

}

export const towersService = new TowersService()