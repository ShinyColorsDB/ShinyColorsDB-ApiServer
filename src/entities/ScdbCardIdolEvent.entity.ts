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
@Entity('SCDB_CardIdolEvent', { schema: 'shinycolors' })
export class ScdbCardIdolEvent {
  @PrimaryGeneratedColumn({ type: 'int', name: 'EventIndex' })
  eventIndex: number;

  @Column('bigint', { name: 'EnzaID', comment: 'EnzaID', select: false })
  enzaId: string;

  @Column('text', { name: 'EventCategory' })
  eventCategory: string;

  @Column('int', { name: 'EventID' })
  eventId: number;

  @Column('text', { name: 'EventHash', nullable: true, select: false })
  eventHash: string | null;

  @Column('text', { name: 'EventTitle' })
  eventTitle: string;

  @Column('int', { name: 'EventOp1', nullable: true })
  eventOp1: number | null;

  @Column('int', { name: 'EventOp2', nullable: true })
  eventOp2: number | null;

  @Column('int', { name: 'EventOp3', nullable: true })
  eventOp3: number | null;

  @ManyToOne(
    () => ScdbCardList,
    (scdbCardList) => scdbCardList.cardIdolEvents,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
