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
@Entity('SCDB_CardSupportEvent', { schema: 'shinycolors' })
export class ScdbCardSupportEvent {
  @PrimaryGeneratedColumn({ type: 'int', name: 'EventIndex' })
  eventIndex: number;

  @Column('bigint', { name: 'EnzaID', comment: 'EnzaID' })
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

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.cardSupportEvents, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
