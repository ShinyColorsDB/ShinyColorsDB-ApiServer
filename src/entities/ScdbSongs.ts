import { Column, Entity, Index } from 'typeorm';

@Index('idx_16608_songid', ['songId'], { unique: true })
@Index('idx_16608_primary', ['songIndex'], { unique: true })
@Entity('scdb_songs', { schema: 'shinycolors' })
export class ScdbSongs {
  @Column('integer', { primary: true, name: 'songindex' })
  songIndex: number;

  @Column('int', { name: 'songid' })
  songId: number;

  @Column('text', { name: 'songtitle' })
  songTitle: string;

  @Column('text', { name: 'songdesc' })
  songDesc: string;

  @Column('text', { name: 'artist' })
  artist: string;

  @Column('int', { name: 'songsecs' })
  songSecs: number;

  @Column('text', { name: 'musicstyle' })
  musicStyle: string;

  @Column('text', { name: 'performance' })
  performance: string;

  @Column('text', { name: 'songhash' })
  songHash: string;

  @Column('int', { name: 'mvidolid' })
  mvIdolId: number;

  @Column('int', { name: 'unitid' })
  unitId: number;

  @Column('text', { name: 'salesurl' })
  salesUrl: string;
}
