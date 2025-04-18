import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ScdbAlbumDetail } from './ScdbAlbumDetail';

@Entity('SCDB_Album', { schema: 'shinycolors' })
export class ScdbAlbum {
  @PrimaryGeneratedColumn({ type: 'int', name: 'AlbumIndex' })
  albumIndex: number;

  @Column('text', { name: 'AlbumID' })
  albumId: string;

  @Column('text', { name: 'AlbumTitle' })
  albumTitle: string;

  @Column('text', { name: 'AlbumName' })
  albumName: string;

  @Column('text', { name: 'AlbumArtist', nullable: true })
  albumArtist: string | null;

  @Column('text', { name: 'ArtistDetail', nullable: true })
  artistDetail: string | null;

  @Column('text', { name: 'AlbumCategory', nullable: true })
  albumCategory: string | null;

  @Column('date', { name: 'AlbumReleaseDate' })
  albumReleaseDate: string;

  @OneToMany(() => ScdbAlbumDetail, (albumDetail) => albumDetail.albumId)
  albumDetails: ScdbAlbumDetail[];
}
