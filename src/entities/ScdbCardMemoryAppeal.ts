import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList';
import { ScdbExtraSkillEffect } from './ScdbExtraSkillEffect';

@Index('idx_16450_cardindex', ['enzaId'], {})
@Index('idx_16450_extraskilleffectindex', ['extraSkillIndex'], {})
@Index('idx_16450_primary', ['memoryIndex'], { unique: true })
@Entity('scdb_cardmemoryappeal', { schema: 'shinycolors' })
export class ScdbCardMemoryAppeal {
  @Column('integer', { primary: true, name: 'memoryindex' })
  memoryIndex: number;

  @Column('bigint', { name: 'enzaid' })
  enzaId: string;

  @Column('bigint', { name: 'memoryid' })
  memoryId: string;

  @Column('text', { name: 'memorytitle' })
  memoryTitle: string;

  @Column('text', { name: 'memorydesc' })
  memoryDesc: string;

  @Column('json', { name: 'memoryeffects' })
  memoryEffects: object;

  @Column('int', { name: 'extraskillindex', nullable: true })
  extraSkillIndex: number | null;

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.cardMemoryAppeals, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'enzaid', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;

  @OneToOne(
    () => ScdbExtraSkillEffect,
    (extraSkillEffect) => extraSkillEffect.cardMemoryAppeals,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'extraskillindex', referencedColumnName: 'extraSkillIndex' },
  ])
  extraEffect: ScdbExtraSkillEffect;
}
