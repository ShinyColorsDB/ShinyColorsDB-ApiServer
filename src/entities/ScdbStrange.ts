import { Column, Entity, Index } from 'typeorm';

@Index('idx_16618_primary', ['strangeindex'], { unique: true })
@Entity('scdb_strange', { schema: 'shinycolors' })
export class ScdbStrange {
  @Column('integer', { primary: true, name: 'strangeindex' })
  strangeIndex: number;

  @Column('text', { name: 'title' })
  title: string;

  @Column('text', { name: 'subtitle' })
  subTitle: string;

  @Column('text', { name: 'pagename' })
  pageName: string;

  @Column('datetime', { name: 'fromdatetime' })
  fromDateTime: Date;

  @Column('text', { name: 'background' })
  background: string;

  @Column('text', { name: 'overlaycolor' })
  overlayColor: string;

  @Column('text', { name: 'note' })
  note: string;
}
