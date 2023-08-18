import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList';
import { ScdbExtraSkillEffect } from './ScdbExtraSkillEffect';

@Index('CardIndex', ['enzaId'], {})
@Index('ExtraSkillEffectIndex', ['extraSkillIndex'], {})
@Entity('SCDB_CardMemoryAppeal', { schema: 'dev_shinycolors' })
export class ScdbCardMemoryAppeal {
  @PrimaryGeneratedColumn({ type: 'int', name: 'MemoryIndex' })
  memoryIndex: number;

  @Column('bigint', { name: 'EnzaID' })
  enzaId: string;

  @Column('bigint', { name: 'MemoryID' })
  memoryId: string;

  @Column('text', { name: 'MemoryTitle' })
  memoryTitle: string;

  @Column('text', { name: 'MemoryDesc' })
  memoryDesc: string;

  @Column('json', { name: 'MemoryEffects' })
  memoryEffects: object;

  @Column('int', { name: 'ExtraSkillIndex', nullable: true })
  extraSkillIndex: number | null;

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.cardMemoryAppeals, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;

  @OneToOne(
    () => ScdbExtraSkillEffect,
    (extraSkillEffect) => extraSkillEffect.cardMemoryAppeals,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'ExtraSkillIndex', referencedColumnName: 'extraSkillIndex' },
  ])
  extraEffect: ScdbExtraSkillEffect;
}
