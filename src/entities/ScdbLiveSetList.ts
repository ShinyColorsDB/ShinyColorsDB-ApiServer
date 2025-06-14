import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ScdbLiveInfo } from './ScdbLiveInfo';

@Index('idx_16555_liveid', ['liveId'], {})
@Index('idx_16555_primary', ['setListIndex'], { unique: true })
@Index('idx_16555_songid', ['songId'], {})
@Entity('scdb_livesetlist', { schema: 'shinycolors' })
export class ScdbLiveSetList {
  @Column('integer', { primary: true, name: 'setlistindex' })
  setListIndex: number;

  @Column('int', { name: 'liveid' })
  liveId: number;

  @Column('text', { name: 'songname' })
  songName: string;

  @Column('int', { name: 'songid', nullable: true })
  songId: number;

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

  @ManyToOne(() => ScdbLiveInfo, (liveInfo) => liveInfo.liveSetLists, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'liveid', referencedColumnName: 'liveId' }])
  live: ScdbLiveInfo;
}
