import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SCDB_Album', { schema: 'dev_shinycolors' })
export class ScdbAlbum {
  @PrimaryGeneratedColumn({ type: 'int', name: 'AlbumIndex' })
  albumIndex: number;

  @Column('text', { name: 'AlbumID' })
  albumId: string;

  @Column('text', { name: 'AlbumName' })
  albumName: string;

  @Column('date', { name: 'AlbumReleaseDate' })
  albumReleaseDate: string;
}
