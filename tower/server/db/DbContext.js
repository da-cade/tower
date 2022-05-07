import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CommentSchema } from "../models/Comment";
import { TicketSchema } from "../models/Ticket";
import { TowerSchema } from "../models/Tower";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Towers = mongoose.model('Tower', TowerSchema);
  Tickets = mongoose.model('Tickets', TicketSchema);
  Comments = mongoose.model('Comments', CommentSchema);
}

export const dbContext = new DbContext()


