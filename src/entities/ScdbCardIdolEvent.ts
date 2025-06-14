import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ScdbCardList } from './ScdbCardList';

@Index('idx_16439_cardindex', ['enzaId'], {})
@Index('idx_16439_primary', ['eventIndex'], { unique: true })
@Entity('scdb_cardidolevent', { schema: 'shinycolors' })
export class ScdbCardIdolEvent {
  @Column('integer', { primary: true, name: 'eventindex' })
  eventIndex: number;

  @Column('bigint', { name: 'enzaid', comment: 'EnzaID' })
  enzaId: string;

  @Column('text', { name: 'eventcategory' })
  eventCategory: string;

  @Column('int', { name: 'eventid' })
  eventId: number;

  @Column('text', { name: 'eventhash', nullable: true })
  eventHash: string | null;

  @Column('text', { name: 'eventtitle' })
  eventTitle: string;

  @Column('int', { name: 'eventop1', nullable: true })
  eventOp1: number | null;

  @Column('int', { name: 'eventop2', nullable: true })
  eventOp2: number | null;

  @Column('int', { name: 'eventop3', nullable: true })
  eventOp3: number | null;

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.cardIdolEvents, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'enzaid', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
