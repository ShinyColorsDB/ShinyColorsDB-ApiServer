import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardIdolEvent } from './ScdbCardIdolEvent.entity';
import { ScdbIdols } from './ScdbIdols.entity';
import { ScdbCardMemoryAppeal } from './ScdbCardMemoryAppeal';
import { ScdbCardPanel } from './ScdbCardPanel.entity';
import { ScdbCardProficiency } from './ScdbCardProficiency.entity';
import { ScdbCardSupportEvent } from './ScdbCardSupportEvent.entity';
import { ScdbCardSupportSkill } from './ScdbCardSupportSkill.entity';
import { ScdbProduceAptitude } from './ScdbProduceAptitude.entity';
import { ScdbSupportFightSkill } from './ScdbSupportFightSkill.entity';

@Index('Index', ['cardIndex'], { unique: true })
@Index('IdolID', ['idolId'], {})
@Index('EnzaID', ['enzaId'], {})
@Entity('SCDB_CardList', { schema: 'shinycolors' })
export class ScdbCardList {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'CardIndex',
    comment: 'self defined index',
  })
  cardIndex: number;

  @Column('bigint', { name: 'EnzaID', comment: 'enza ID' })
  enzaId: string;

  @Column('int', { name: 'IdolID' })
  idolId: number;

  @Column('text', { name: 'CardName' })
  cardName: string;

  @Column('text', { name: 'CardUUID' })
  cardUuid: string;

  @Column('text', { name: 'BigPic1', nullable: true })
  bigPic1: string | null;

  @Column('text', { name: 'BigPic2', nullable: true })
  bigPic2: string | null;

  @Column('text', { name: 'SmlPic', nullable: true })
  smlPic: string | null;

  @Column('text', { name: 'CardType' })
  cardType: string;

  @Column('text', { name: 'GetMethod', nullable: true })
  getMethod: string | null;

  @Column('text', { name: 'IdeaMark', nullable: true })
  ideaMark: string | null;

  @Column('text', { name: 'CardHash', nullable: true, select: false })
  cardHash: string | null;

  @Column('date', { name: 'ReleaseDate', nullable: true })
  releaseDate: string | null;

  @Column('date', { name: 'LastModified', nullable: true })
  lastModified: string | null;

  @OneToMany(
    () => ScdbCardIdolEvent,
    (scdbCardIdolEvent) => scdbCardIdolEvent.enza,
  )
  cardIdolEvents: ScdbCardIdolEvent[];

  @ManyToOne(() => ScdbIdols, (scdbIdols) => scdbIdols.cardLists, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'IdolID', referencedColumnName: 'idolId' }])
  idol: ScdbIdols;

  @OneToMany(
    () => ScdbCardMemoryAppeal,
    (scdbCardMemoryAppeal) => scdbCardMemoryAppeal.enza,
  )
  cardMemoryAppeals: ScdbCardMemoryAppeal[];

  @OneToMany(() => ScdbCardPanel, (scdbCardPanel) => scdbCardPanel.enza)
  cardPanels: ScdbCardPanel[];

  @OneToMany(
    () => ScdbCardProficiency,
    (scdbCardProficiency) => scdbCardProficiency.enza,
  )
  cardProficiencies: ScdbCardProficiency[];

  @OneToMany(
    () => ScdbCardSupportEvent,
    (scdbCardSupportEvent) => scdbCardSupportEvent.enza,
  )
  cardSupportEvents: ScdbCardSupportEvent[];

  @OneToMany(
    () => ScdbCardSupportSkill,
    (scdbCardSupportSkill) => scdbCardSupportSkill.enza,
  )
  cardSupportSkills: ScdbCardSupportSkill[];

  @OneToMany(
    () => ScdbProduceAptitude,
    (scdbProduceAptitude) => scdbProduceAptitude.enza,
  )
  cardProduceAptitudes: ScdbProduceAptitude[];

  @OneToMany(
    () => ScdbSupportFightSkill,
    (scdbSupportFightSkill) => scdbSupportFightSkill.enza,
  )
  cardSupportFightSkills: ScdbSupportFightSkill[];
}
