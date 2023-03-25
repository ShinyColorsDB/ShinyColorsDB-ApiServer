import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SCDB_Lyrics', { schema: 'shinycolors' })
export class ScdbLyrics {
  @PrimaryGeneratedColumn({ type: 'int', name: 'LyricIndex' })
  lyricIndex: number;

  @Column('text', { name: 'SongName' })
  songName: string;

  @Column('text', { name: 'SongLyrics' })
  songLyrics: string;

  @Column('text', { name: 'SongLyricsZH' })
  songLyricsZh: string;
}
