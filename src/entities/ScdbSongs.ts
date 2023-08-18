import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SCDB_Songs', { schema: 'dev_shinycolors' })
export class ScdbSongs {
  @PrimaryGeneratedColumn({ type: 'int', name: 'SongIndex' })
  songIndex: number;

  @Column('int', { name: 'SongID' })
  songId: number;

  @Column('text', { name: 'SongTitle' })
  songTitle: string;

  @Column('text', { name: 'SongDesc' })
  songDesc: string;

  @Column('text', { name: 'Artist' })
  artist: string;

  @Column('int', { name: 'SongSecs' })
  songSecs: number;

  @Column('text', { name: 'MusicStyle' })
  musicStyle: string;

  @Column('text', { name: 'Performance' })
  performance: string;

  @Column('text', { name: 'SongHash' })
  songHash: string;

  @Column('int', { name: 'MvIdolID' })
  mvIdolId: number;

  @Column('int', { name: 'UnitID' })
  unitId: number;

  @Column('text', { name: 'SalesUrl' })
  salesUrl: string;
}
