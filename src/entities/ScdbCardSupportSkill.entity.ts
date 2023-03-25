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
@Entity('SCDB_CardSupportSkill', { schema: 'shinycolors' })
export class ScdbCardSupportSkill {
  @PrimaryGeneratedColumn({ type: 'int', name: 'SkillIndex' })
  skillIndex: number;

  @Column('bigint', { name: 'EnzaID', select: false })
  enzaId: string;

  @Column('text', { name: 'SkillID' })
  skillId: string;

  @Column('text', { name: 'SkillName' })
  skillName: string;

  @Column('text', { name: 'SkillDesc' })
  skillDesc: string;

  @Column('text', { name: 'SkillAttribute' })
  skillAttribute: string;

  @Column('text', { name: 'SkillType' })
  skillType: string;

  @Column('int', { name: 'GainedAt' })
  gainedAt: number;

  @Column('int', { name: 'SkillLevel' })
  skillLevel: number;

  @ManyToOne(
    () => ScdbCardList,
    (scdbCardList) => scdbCardList.cardSupportSkills,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
