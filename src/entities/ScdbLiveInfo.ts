import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ScdbLiveSetList } from './ScdbLiveSetList';

@Index('idx_16522_liveid', ['liveId'], { unique: true })
@Index('idx_16522_primary', ['liveIndex'], { unique: true })
@Entity('scdb_liveinfo', { schema: 'shinycolors' })
export class ScdbLiveInfo {
  @Column('integer', { primary: true, name: 'liveindex' })
  liveIndex: number;

  @Column('text', { name: 'livetitle' })
  liveTitle: string;

  @Column('text', { name: 'livesubtitle' })
  liveSubtitle: string;

  @Column('text', { name: 'liveid' })
  liveId: number;

  @Column('date', { name: 'liveday1' })
  liveDay1: string;

  @Column('text', { name: 'day1open' })
  day1Open: string;

  @Column('text', { name: 'day1start' })
  day1Start: string;

  @Column('date', { name: 'liveday2' })
  liveDay2: string;

  @Column('text', { name: 'day2open' })
  day2Open: string;

  @Column('text', { name: 'day2start' })
  day2Start: string;

  @Column('smallint', { name: 'idol01', default: () => "'0'" })
  idol01: number;

  @Column('smallint', { name: 'idol02', default: () => "'0'" })
  idol02: number;

  @Column('smallint', { name: 'idol03', default: () => "'0'" })
  idol03: number;

  @Column('smallint', { name: 'idol04', default: () => "'0'" })
  idol04: number;

  @Column('smallint', { name: 'idol05', default: () => "'0'" })
  idol05: number;

  @Column('smallint', { name: 'idol06', default: () => "'0'" })
  idol06: number;

  @Column('smallint', { name: 'idol07', default: () => "'0'" })
  idol07: number;

  @Column('smallint', { name: 'idol08', default: () => "'0'" })
  idol08: number;

  @Column('smallint', { name: 'idol09', default: () => "'0'" })
  idol09: number;

  @Column('smallint', { name: 'idol10', default: () => "'0'" })
  idol10: number;

  @Column('smallint', { name: 'idol11', default: () => "'0'" })
  idol11: number;

  @Column('smallint', { name: 'idol12', default: () => "'0'" })
  idol12: number;

  @Column('smallint', { name: 'idol13', default: () => "'0'" })
  idol13: number;

  @Column('smallint', { name: 'idol14', default: () => "'0'" })
  idol14: number;

  @Column('smallint', { name: 'idol15', default: () => "'0'" })
  idol15: number;

  @Column('smallint', { name: 'idol16', default: () => "'0'" })
  idol16: number;

  @Column('smallint', { name: 'idol17', default: () => "'0'" })
  idol17: number;

  @Column('smallint', { name: 'idol18', default: () => "'0'" })
  idol18: number;

  @Column('smallint', { name: 'idol19', default: () => "'0'" })
  idol19: number;

  @Column('smallint', { name: 'idol20', default: () => "'0'" })
  idol20: number;

  @Column('smallint', { name: 'idol21', default: () => "'0'" })
  idol21: number;

  @Column('smallint', { name: 'idol22', default: () => "'0'" })
  idol22: number;

  @Column('smallint', { name: 'idol23', default: () => "'0'" })
  idol23: number;

  @Column('smallint', { name: 'idol24', default: () => "'0'" })
  idol24: number;

  @Column('smallint', { name: 'idol25', default: () => "'0'" })
  idol25: number;

  @Column('smallint', { name: 'idol26', default: () => "'0'" })
  idol26: number;

  @Column('smallint', { name: 'idol27', default: () => "'0'" })
  idol27: number;

  @Column('smallint', { name: 'idol28', default: () => "'0'" })
  idol28: number;

  @Column('text', { name: 'livelocation' })
  liveLocation: string;

  @Column('text', { name: 'livebuilding' })
  liveBuilding: string;

  @Column('text', { name: 'livelogo' })
  liveLogo: string;

  @Column('text', { name: 'livelogobg' })
  liveLogoBg: string;

  @Column('text', { name: 'livememo' })
  liveMemo: string;

  @OneToMany(() => ScdbLiveSetList, (liveSetList) => liveSetList.live)
  liveSetLists: ScdbLiveSetList[];
}
