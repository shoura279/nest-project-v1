/* eslint-disable prettier/prettier */

import { MongooseModule} from '@nestjs/mongoose';
import { User, UserSchema } from './Schemas/user.schema';


export const  DBModels = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema }])