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

@Index('AlbumIndex', ['albumIndex'], {})
@Entity('SCDB_AlbumList', { schema: 'shinycolors_dev2' })
export class AlbumList {
  @PrimaryGeneratedColumn({ type: 'int', name: 'AlbumIndex' })
  albumIndex: number;

  @Column('text', { name: 'AlbumName' })
  albumName: string;

  @Column('date', { name: 'AlbumReleaseDate' })
  albumReleaseDate: string;

  @OneToMany(() => AlbumDetail, (albumDetail) => albumDetail.detailIndex)
  albumDetails: AlbumDetail[];
}
