import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbLiveInfo } from './ScdbLiveInfo';

@Entity('SCDB_LiveSetList', { schema: 'shinycolors' })
export class ScdbLiveSetList {
  @PrimaryGeneratedColumn({ type: 'int', name: 'SetListIndex' })
  setListIndex: number;

  @Column('int', { name: 'LiveID' })
  liveId: number;

  @Column('text', { name: 'SongName' })
  songName: string;

  @Column('int', { name: 'SongID', nullable: true })
  songId: number;

  @Column('tinyint', { name: 'Idol01' })
  idol01: number;

  @Column('tinyint', { name: 'Idol02' })
  idol02: number;

  @Column('tinyint', { name: 'Idol03' })
  idol03: number;

  @Column('tinyint', { name: 'Idol04' })
  idol04: number;

  @Column('tinyint', { name: 'Idol05' })
  idol05: number;

  @Column('tinyint', { name: 'Idol06' })
  idol06: number;

  @Column('tinyint', { name: 'Idol07' })
  idol07: number;

  @Column('tinyint', { name: 'Idol08' })
  idol08: number;

  @Column('tinyint', { name: 'Idol09' })
  idol09: number;

  @Column('tinyint', { name: 'Idol10' })
  idol10: number;

  @Column('tinyint', { name: 'Idol11' })
  idol11: number;

  @Column('tinyint', { name: 'Idol12' })
  idol12: number;

  @Column('tinyint', { name: 'Idol13' })
  idol13: number;

  @Column('tinyint', { name: 'Idol14' })
  idol14: number;

  @Column('tinyint', { name: 'Idol15' })
  idol15: number;

  @Column('tinyint', { name: 'Idol16' })
  idol16: number;

  @Column('tinyint', { name: 'Idol17' })
  idol17: number;

  @Column('tinyint', { name: 'Idol18' })
  idol18: number;

  @Column('tinyint', { name: 'Idol19' })
  idol19: number;

  @Column('tinyint', { name: 'Idol20' })
  idol20: number;

  @Column('tinyint', { name: 'Idol21' })
  idol21: number;

  @Column('tinyint', { name: 'Idol22' })
  idol22: number;

  @Column('tinyint', { name: 'Idol23' })
  idol23: number;

  @Column('tinyint', { name: 'Idol24' })
  idol24: number;

  @Column('tinyint', { name: 'Idol25' })
  idol25: number;

  @Column('tinyint', { name: 'Idol26' })
  idol26: number;

  @Column('tinyint', { name: 'Idol27' })
  idol27: number;

  @Column('tinyint', { name: 'Idol28' })
  idol28: number;

  @ManyToOne(() => ScdbLiveInfo, (liveInfo) => liveInfo.liveSetLists, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'LiveID', referencedColumnName: 'liveId' }])
  live: ScdbLiveInfo;
}
