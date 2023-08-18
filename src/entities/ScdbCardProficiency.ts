import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList';

@Index('CardIndex', ['enzaId'], {})
@Entity('SCDB_CardProficiency', { schema: 'dev_shinycolors' })
export class ScdbCardProficiency {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ProficiencyIndex' })
  proficiencyIndex: number;

  @Column('bigint', { name: 'EnzaID' })
  enzaId: string;

  @Column('text', { name: 'Proficiency' })
  proficiency: string;

  @Column('int', { name: 'Value' })
  value: number;

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.cardProficiencies, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
