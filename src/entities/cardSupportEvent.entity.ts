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
@Entity('SCDB_CardSupportEvent', { schema: 'shinycolors_dev2' })
export class CardSupportEvent {
  @PrimaryGeneratedColumn({ type: 'int', name: 'EventIndex' })
  eventIndex: number;

  @Column('bigint', { name: 'EnzaID', comment: 'EnzaID', select: false })
  enzaId: string;

  @Column('int', { name: 'EventID' })
  eventId: number;

  @Column('text', { name: 'EventName' })
  eventName: string;

  @Column('int', { name: 'EventAddVo' })
  eventAddVo: number;

  @Column('int', { name: 'EventAddDa' })
  eventAddDa: number;

  @Column('int', { name: 'EventAddVi' })
  eventAddVi: number;

  @Column('int', { name: 'EventAddMe' })
  eventAddMe: number;

  @Column('int', { name: 'EventAddSp' })
  eventAddSp: number;

  @ManyToOne(() => CardList, (cardList) => cardList.cardSupportEvents, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: CardList;
}
