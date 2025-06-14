import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ScdbAlbum } from './ScdbAlbum';

@Index('idx_16401_albumid', ['albumId'], {})
@Index('idx_16401_primary', ['detailIndex'], { unique: true })
@Index('idx_16401_songid', ['songId'], {})
@Entity('SCDB_AlbumDetail', { schema: 'shinycolors' })
export class ScdbAlbumDetail {
  @Column('integer', { primary: true, name: 'detailIndex' })
  detailIndex: number;

  @Column('int', { name: 'AlbumID' })
  albumId: number;

  @Column('int', { name: 'TrackID' })
  trackId: number;

  @Column('int', { name: 'SongID' })
  songId: number;

  @Column('text', { name: 'SongTitle' })
  songTitle: string;

  @Column('text', { name: 'Comment', nullable: true })
  comment: string | null;

  @Column('smallint', { name: 'Idol01', default: () => "'0'" })
  idol01: number;

  @Column('smallint', { name: 'Idol02', default: () => "'0'" })
  idol02: number;

  @Column('smallint', { name: 'Idol03', default: () => "'0'" })
  idol03: number;

  @Column('smallint', { name: 'Idol04', default: () => "'0'" })
  idol04: number;

  @Column('smallint', { name: 'Idol05', default: () => "'0'" })
  idol05: number;

  @Column('smallint', { name: 'Idol06', default: () => "'0'" })
  idol06: number;

  @Column('smallint', { name: 'Idol07', default: () => "'0'" })
  idol07: number;

  @Column('smallint', { name: 'Idol08', default: () => "'0'" })
  idol08: number;

  @Column('smallint', { name: 'Idol09', default: () => "'0'" })
  idol09: number;

  @Column('smallint', { name: 'Idol10', default: () => "'0'" })
  idol10: number;

  @Column('smallint', { name: 'Idol11', default: () => "'0'" })
  idol11: number;

  @Column('smallint', { name: 'Idol12', default: () => "'0'" })
  idol12: number;

  @Column('smallint', { name: 'Idol13', default: () => "'0'" })
  idol13: number;

  @Column('smallint', { name: 'Idol14', default: () => "'0'" })
  idol14: number;

  @Column('smallint', { name: 'Idol15', default: () => "'0'" })
  idol15: number;

  @Column('smallint', { name: 'Idol16', default: () => "'0'" })
  idol16: number;

  @Column('smallint', { name: 'Idol17', default: () => "'0'" })
  idol17: number;

  @Column('smallint', { name: 'Idol18', default: () => "'0'" })
  idol18: number;

  @Column('smallint', { name: 'Idol19', default: () => "'0'" })
  idol19: number;

  @Column('smallint', { name: 'Idol20', default: () => "'0'" })
  idol20: number;

  @Column('smallint', { name: 'Idol21', default: () => "'0'" })
  idol21: number;

  @Column('smallint', { name: 'Idol22', default: () => "'0'" })
  idol22: number;

  @Column('smallint', { name: 'Idol23', default: () => "'0'" })
  idol23: number;

  @Column('smallint', { name: 'Idol24', default: () => "'0'" })
  idol24: number;

  @Column('smallint', { name: 'Idol25', default: () => "'0'" })
  idol25: number;

  @Column('smallint', { name: 'Idol26', default: () => "'0'" })
  idol26: number;

  @Column('smallint', { name: 'Idol27', default: () => "'0'" })
  idol27: number;

  @Column('smallint', { name: 'Idol28', default: () => "'0'" })
  idol28: number;

  @ManyToOne(() => ScdbAlbum, (album) => album.albumDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'AlbumIndex', referencedColumnName: 'albumIndex' }])
  album: ScdbAlbum;
}
