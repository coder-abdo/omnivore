import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ReportType } from '../../generated/graphql'

@Entity()
export class AbuseReport extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column('text')
  pageId!: string

  @Column('text')
  sharedBy!: string

  @Column('text')
  itemUrl!: string

  @Column('text')
  reportedBy!: string

  @Column('enum', { enum: ReportType, array: true })
  reportTypes!: ReportType[]

  @Column('text')
  reportComment!: string

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
