import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ScdbAlbumDetail } from './ScdbAlbumDetail';

@Index('idx_16396_primary', ['albumIndex'], { unique: true })
@Entity('scdb_album', { schema: 'shinycolors' })
export class ScdbAlbum {
  @Column('integer', { primary: true, name: 'albumindex' })
  albumIndex: number;

  @Column('text', { name: 'albumid' })
  albumId: string;

  @Column('text', { name: 'albumtitle' })
  albumTitle: string;

  @Column('text', { name: 'albumname' })
  albumName: string;

  @Column('text', { name: 'albumartist', nullable: true })
  albumArtist: string | null;

  @Column('text', { name: 'artistdetail', nullable: true })
  artistDetail: string | null;

  @Column('text', { name: 'albumcategory', nullable: true })
  albumCategory: string | null;

  @Column('date', { name: 'albumreleasedate' })
  albumReleaseDate: string;

  @OneToMany(() => ScdbAlbumDetail, (albumDetail) => albumDetail.albumId)
  albumDetails: ScdbAlbumDetail[];
}
