import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
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

@Index('idx_16444_index', ['cardIndex'], { unique: true })
@Index('idx_16444_primary', ['cardIndex'], { unique: true })
@Index('idx_16444_enzaid', ['enzaId'], {})
@Index('idx_16444_idolid', ['idolId'], {})
@Entity('scdb_cardlist', { schema: 'shinycolors' })
export class ScdbCardList {
  @Column('integer', { primary: true, name: 'cardindex' })
  cardIndex: number;

  @Column('bigint', { name: 'enzaid', comment: 'enza ID' })
  enzaId: string;

  @Column('int', { name: 'idolid' })
  idolId: number;

  @Column('text', { name: 'cardname' })
  cardName: string;

  @Column('text', { name: 'carduuid' })
  cardUuid: string;

  @Column('text', { name: 'bigpic1', nullable: true })
  bigPic1: string | null;

  @Column('text', { name: 'bigpic2', nullable: true })
  bigPic2: string | null;

  @Column('text', { name: 'smlpic', nullable: true })
  smlPic: string | null;

  @Column('text', { name: 'cardtype' })
  cardType: string;

  @Column('text', { name: 'getmethod', nullable: true })
  getMethod: string | null;

  @Column('text', { name: 'ideamark', nullable: true })
  ideaMark: string | null;

  @Column('integer', { name: 'panelspoffset', default: () => '0' })
  panelSPOffset: number;

  @Column('text', { name: 'cardhash', nullable: true })
  cardHash: string | null;

  @Column('date', { name: 'releasedate', nullable: true })
  releaseDate: string | null;

  @Column('date', { name: 'lastmodified', nullable: true })
  lastModified: string | null;

  @OneToMany(() => ScdbCardIdolEvent, (cardIdolEvent) => cardIdolEvent.enza)
  cardIdolEvents: ScdbCardIdolEvent[];

  @ManyToOne(() => ScdbIdols, (idols) => idols.cardLists, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'idolid', referencedColumnName: 'idolId' }])
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
