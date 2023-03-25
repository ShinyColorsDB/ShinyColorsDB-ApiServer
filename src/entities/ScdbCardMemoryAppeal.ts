import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList.entity';

@Index('CardIndex', ['enzaId'], {})
@Entity('SCDB_CardMemoryAppeal', { schema: 'shinycolors' })
export class ScdbCardMemoryAppeal {
  @PrimaryGeneratedColumn({ type: 'int', name: 'MemoryIndex' })
  memoryIndex: number;

  @Column('bigint', { name: 'EnzaID', select: false })
  enzaId: string;

  @Column('bigint', { name: 'MemoryID' })
  memoryId: string;

  @Column('text', { name: 'MemoryTitle' })
  memoryTitle: string;

  @Column('text', { name: 'MemoryDesc' })
  memoryDesc: string;

  @Column('json', { name: 'MemoryEffects' })
  memoryEffects: object;

  @Column('bigint', { name: 'MemoryLinkSkillID' })
  memoryLinkSkillId: string;

  @Column('text', { name: 'LinkSkillDesc', nullable: true })
  linkSkillDesc: string | null;

  @Column('text', { name: 'LinkWith', nullable: true })
  linkWith: string | null;

  @Column('json', { name: 'LinkEffects', nullable: true })
  linkEffects: object | null;

  @ManyToOne(
    () => ScdbCardList,
    (scdbCardList) => scdbCardList.cardMemoryAppeals,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
