import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardIdolEvent } from './ScdbCardIdolEvent';
import { ScdbIdols } from './ScdbIdols';
import { ScdbCardMemoryAppeal } from './ScdbCardMemoryAppeal';
import { ScdbCardPanel } from './ScdbCardPanel';
import { ScdbCardProficiency } from './ScdbCardProficiency';
import { ScdbCardSupportEvent } from './ScdbCardSupportEvent';
import { ScdbCardSupportSkill } from './ScdbCardSupportSkill';
import { ScdbCardle } from './ScdbCardle';
import { ScdbProduceAptitude } from './ScdbProduceAptitude';
import { ScdbSupportFightSkill } from './ScdbSupportFightSkill';
import { ScdbCardStatus } from './ScdbCardStatus';
import { ScdbMemoryChargeSkill } from './ScdbMemoryChargeSkill';

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

  @Column('text', { name: 'CardHash', nullable: true })
  cardHash: string | null;

  @Column('date', { name: 'ReleaseDate', nullable: true })
  releaseDate: string | null;

  @Column('date', { name: 'LastModified', nullable: true })
  lastModified: string | null;

  @OneToMany(() => ScdbCardIdolEvent, (cardIdolEvent) => cardIdolEvent.enza)
  cardIdolEvents: ScdbCardIdolEvent[];

  @ManyToOne(() => ScdbIdols, (idols) => idols.cardLists, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'IdolID', referencedColumnName: 'idolId' }])
  idol: ScdbIdols;

  @OneToMany(
    () => ScdbCardMemoryAppeal,
    (cardMemoryAppeal) => cardMemoryAppeal.enza,
  )
  cardMemoryAppeals: ScdbCardMemoryAppeal[];

  @OneToMany(() => ScdbCardPanel, (cardPanel) => cardPanel.enza)
  cardPanels: ScdbCardPanel[];

  @OneToMany(
    () => ScdbCardProficiency,
    (cardProficiency) => cardProficiency.enza,
  )
  cardProficiencies: ScdbCardProficiency[];

  @OneToMany(
    () => ScdbCardSupportEvent,
    (cardSupportEvent) => cardSupportEvent.enza,
  )
  cardSupportEvents: ScdbCardSupportEvent[];

  @OneToMany(
    () => ScdbCardSupportSkill,
    (cardSupportSkill) => cardSupportSkill.enza,
  )
  cardSupportSkills: ScdbCardSupportSkill[];

  @OneToMany(() => ScdbCardle, (cardle) => cardle.enza)
  cardles: ScdbCardle[];

  @OneToMany(
    () => ScdbProduceAptitude,
    (cardProduceAptitude) => cardProduceAptitude.enza,
  )
  cardProduceAptitude: ScdbProduceAptitude[];

  @OneToOne(
    () => ScdbSupportFightSkill,
    (supportFightSkill) => supportFightSkill.enza,
  )
  supportFightSkills: ScdbSupportFightSkill[];

  @OneToOne(() => ScdbCardStatus, (cardStatus) => cardStatus.enza)
  cardStatus: ScdbCardStatus;

  @OneToMany(
    () => ScdbMemoryChargeSkill,
    (cardMemoryChargeSkill) => cardMemoryChargeSkill.enza,
  )
  memoryChargeSkills: ScdbMemoryChargeSkill[];
}
