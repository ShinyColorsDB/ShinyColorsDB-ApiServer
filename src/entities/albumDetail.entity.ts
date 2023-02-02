import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('SCDB_AlbumDetail', { schema: 'shinycolors_dev2' })
export class AlbumDetail {
  @PrimaryGeneratedColumn({ type: 'int', name: 'DetailIndex' })
  detailIndex: number;
}
