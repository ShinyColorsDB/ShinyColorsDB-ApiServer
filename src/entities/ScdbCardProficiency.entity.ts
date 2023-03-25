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
@Entity('SCDB_CardProficiency', { schema: 'shinycolors' })
export class ScdbCardProficiency {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ProficiencyIndex' })
  proficiencyIndex: number;

  @Column('bigint', { name: 'EnzaID', select: false })
  enzaId: string;

  @Column('text', { name: 'Proficiency' })
  proficiency: string;

  @Column('int', { name: 'Value' })
  value: number;

  @ManyToOne(
    () => ScdbCardList,
    (scdbCardList) => scdbCardList.cardProficiencies,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
