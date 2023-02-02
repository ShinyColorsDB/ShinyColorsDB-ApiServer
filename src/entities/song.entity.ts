import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumDetail } from './albumDetail.entity';

@Index('SongIndex', ['songIndex'], {})
@Entity('SCDB_SongList', { schema: 'shinycolors_dev2' })
export class SongList {
  @PrimaryGeneratedColumn({ type: 'int', name: 'SongIndex' })
  songIndex: number;

  @Column('text', { name: 'SongName' })
  songName: string;

  @Column('text', { name: 'SongLyrics' })
  songLyrics: string;

  @Column('text', { name: 'SongLyricsZH' })
  songLyricsZh: string;

  @OneToMany(() => AlbumDetail, (albumDetail) => albumDetail.detailIndex)
  albumDetails: AlbumDetail[];
}
