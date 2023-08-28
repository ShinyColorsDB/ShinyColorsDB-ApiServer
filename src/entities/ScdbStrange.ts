import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SCDB_Strange', { schema: 'shinycolors' })
export class ScdbStrange {
  @PrimaryGeneratedColumn({ type: 'int', name: 'StrangeIndex' })
  strangeIndex: number;

  @Column('text', { name: 'Title' })
  title: string;

  @Column('text', { name: 'SubTitle' })
  subTitle: string;

  @Column('text', { name: 'PageName' })
  pageName: string;

  @Column('datetime', { name: 'FromDateTime' })
  fromDateTime: Date;

  @Column('text', { name: 'Background' })
  background: string;

  @Column('text', { name: 'OverlayColor' })
  overlayColor: string;

  @Column('text', { name: 'Note' })
  note: string;
}
