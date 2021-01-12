import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from './model/user.model';
import { Episode } from './model/episode.model';
import { Course } from './model/course.model';

const models = TypegooseModule.forFeature([User,Course,Episode])

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/website', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify:false
    }),
    models
  ],
  providers: [DbService],
  exports: [DbService,models],
})
export class DbModule {}
