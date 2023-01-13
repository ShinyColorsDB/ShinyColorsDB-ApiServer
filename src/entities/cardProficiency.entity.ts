import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CardList } from './cardList.entity';

@Index('CardIndex', ['enzaId'], {})
@Entity('SCDB_CardProficiency', { schema: 'shinycolors_dev2' })
export class CardProficiency {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ProficiencyIndex' })
  proficiencyIndex: number;

  @Column('bigint', { name: 'EnzaID', select: false })
  enzaId: string;

  @Column('text', { name: 'Proficiency' })
  proficiency: string;

  @Column('int', { name: 'Value' })
  value: number;

  @ManyToOne(() => CardList, (cardList) => cardList.cardProficiencies, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: CardList;
}
