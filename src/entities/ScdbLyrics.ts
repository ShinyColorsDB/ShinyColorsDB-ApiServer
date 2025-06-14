import { Column, Entity, Index } from 'typeorm';

@Index('idx_16588_primary', ['lyricIndex'], { unique: true })
@Entity('scdb_lyrics', { schema: 'shinycolors' })
export class ScdbLyrics {
  @Column('integer', { primary: true, name: 'lyricindex' })
  lyricIndex: number;

  @Column('text', { name: 'songname' })
  songName: string;

  @Column('text', { name: 'songlyrics' })
  songLyrics: string;

  @Column('text', { name: 'songlyricszh' })
  songLyricsZh: string;
}
