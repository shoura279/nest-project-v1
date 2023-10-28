/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory  ,MongooseModule} from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    enum: ['female', 'male'],
    default: 'female',
  })
  gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);


export const  userModel = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])