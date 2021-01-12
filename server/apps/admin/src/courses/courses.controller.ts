import { Course } from '@lib/db/model/course.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model:Course
})
  @Controller('courses')
  @ApiTags('课程')
export class CoursesController {
  constructor(@InjectModel(Course) private readonly model: ReturnModelType<typeof Course>) { }
  @Get('option')
  option(){
    return {
      title: '课程管理',
      column: [
        { label: '课程名称', prop: 'name',sortable:true,search:true,regex:true ,row:true},
        { label: '课程封面', prop: 'cover',type:'upload',listType:'picture-img',row:true,action:'http://localhost:3000/upload' },
      ],
    }
  } 
}
