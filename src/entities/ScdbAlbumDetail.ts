import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SCDB_AlbumDetail', { schema: 'shinycolors' })
export class ScdbAlbumDetail {
  @PrimaryGeneratedColumn({ type: 'int', name: 'DetailIndex' })
  detailIndex: number;

  @Column('int', { name: 'AlbumID' })
  albumId: number;

  @Column('int', { name: 'SongTitle' })
  songTitle: number;

  @Column('int', { name: 'Comment' })
  comment: number;

  @Column('int', { name: 'LyricsID', nullable: true })
  lyricsId: number | null;
}
