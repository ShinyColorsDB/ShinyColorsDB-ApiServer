import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList';

@Index('EnzaID', ['enzaId'], {})
@Entity('SCDB_MemoryChargeSkill', { schema: 'shinycolors' })
export class ScdbMemoryChargeSkill {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ChargeSkillIndex' })
  chargeSkillIndex: number;

  @Column('bigint', { name: 'EnzaID' })
  enzaId: string;

  @Column('text', { name: 'SkillName' })
  skillName: string;

  @Column('text', { name: 'SkillDesc' })
  skillDesc: string;

  @Column('int', { name: 'ReleaseEvolution' })
  releaseEvolution: number;

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.memoryChargeSkills, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
