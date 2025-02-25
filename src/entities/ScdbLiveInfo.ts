import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SCDB_LiveInfo', { schema: 'shinycolors' })
export class ScdbLiveInfo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'LiveIndex' })
  liveIndex: number;

  @Column('text', { name: 'LiveTitle' })
  liveTitle: string;

  @Column('text', { name: 'LiveSubtitle' })
  liveSubtitle: string;

  @Column('text', { name: 'LiveID' })
  liveId: string;

  @Column('date', { name: 'LiveDay1' })
  liveDay1: string;

  @Column('text', { name: 'Day1Open' })
  day1Open: string;

  @Column('text', { name: 'Day1Start' })
  day1Start: string;

  @Column('date', { name: 'LiveDay2' })
  liveDay2: string;

  @Column('text', { name: 'Day2Open' })
  day2Open: string;

  @Column('text', { name: 'Day2Start' })
  day2Start: string;

  @Column('tinyint', { name: 'Present_Idol01' })
  present_idol01: number;

  @Column('tinyint', { name: 'Present_Idol02' })
  present_idol02: number;

  @Column('tinyint', { name: 'Present_Idol03' })
  present_idol03: number;

  @Column('tinyint', { name: 'Present_Idol04' })
  present_idol04: number;

  @Column('tinyint', { name: 'Present_Idol05' })
  present_idol05: number;

  @Column('tinyint', { name: 'Present_Idol06' })
  present_idol06: number;

  @Column('tinyint', { name: 'Present_Idol07' })
  present_idol07: number;

  @Column('tinyint', { name: 'Present_Idol08' })
  present_idol08: number;

  @Column('tinyint', { name: 'Present_Idol09' })
  present_idol09: number;

  @Column('tinyint', { name: 'Present_Idol10' })
  present_idol10: number;

  @Column('tinyint', { name: 'Present_Idol11' })
  present_idol11: number;

  @Column('tinyint', { name: 'Present_Idol12' })
  present_idol12: number;

  @Column('tinyint', { name: 'Present_Idol13' })
  present_idol13: number;

  @Column('tinyint', { name: 'Present_Idol14' })
  present_idol14: number;

  @Column('tinyint', { name: 'Present_Idol15' })
  present_idol15: number;

  @Column('tinyint', { name: 'Present_Idol16' })
  present_idol16: number;

  @Column('tinyint', { name: 'Present_Idol17' })
  present_idol17: number;

  @Column('tinyint', { name: 'Present_Idol18' })
  present_idol18: number;

  @Column('tinyint', { name: 'Present_Idol19' })
  present_idol19: number;

  @Column('tinyint', { name: 'Present_Idol20' })
  present_idol20: number;

  @Column('tinyint', { name: 'Present_Idol21' })
  present_idol21: number;

  @Column('tinyint', { name: 'Present_Idol22' })
  present_idol22: number;

  @Column('tinyint', { name: 'Present_Idol23' })
  present_idol23: number;

  @Column('tinyint', { name: 'Present_Idol24' })
  present_idol24: number;

  @Column('tinyint', { name: 'Present_Idol25' })
  present_idol25: number;

  @Column('tinyint', { name: 'Present_Idol26' })
  present_idol26: number;

  @Column('tinyint', { name: 'Present_Idol27' })
  present_idol27: number;

  @Column('tinyint', { name: 'Present_Idol28' })
  present_idol28: number;

  @Column('text', { name: 'LiveLocation' })
  liveLocation: number;

  @Column('text', { name: 'LiveBuilding' })
  liveBuilding: number;

  @Column('text', { name: 'LiveLogo' })
  liveLogo: number;

  @Column('text', { name: 'LiveMemo' })
  liveMemo: number;
}
