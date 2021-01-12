import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { arrayProp, modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Episode } from './episode.model'


@modelOptions({
  schemaOptions: {
    timestamps:true
  }
})
export class Course {
  @ApiProperty({
    description: '课程名称',
    example:'course1'
  })
  @prop()
  name: string


  @ApiProperty({ description:'封面图'})
  @prop()
  cover: string


  @ApiProperty({
    description: '课时列表',
  })
  @prop({ref:'Episode'})
  episodes: Ref<Episode>[]
}