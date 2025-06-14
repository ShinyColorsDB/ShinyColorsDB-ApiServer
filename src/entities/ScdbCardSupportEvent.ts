import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ScdbCardList } from './ScdbCardList';

@Index('idx_16468_cardindex', ['enzaId'], {})
@Index('idx_16468_primary', ['eventIndex'], { unique: true })
@Entity('scdb_cardsupportevent', { schema: 'shinycolors' })
export class ScdbCardSupportEvent {
  @Column('integer', { primary: true, name: 'eventindex' })
  eventIndex: number;

  @Column('bigint', { name: 'enzaid', comment: 'EnzaID' })
  enzaId: string;

  @Column('int', { name: 'eventid' })
  eventId: number;

  @Column('text', { name: 'eventname' })
  eventName: string;

  @Column('int', { name: 'eventaddvo' })
  eventAddVo: number;

  @Column('int', { name: 'eventaddda' })
  eventAddDa: number;

  @Column('int', { name: 'eventaddvi' })
  eventAddVi: number;

  @Column('int', { name: 'eventaddme' })
  eventAddMe: number;

  @Column('int', { name: 'eventaddsp' })
  eventAddSp: number;

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.cardSupportEvents, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'enzaid', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
