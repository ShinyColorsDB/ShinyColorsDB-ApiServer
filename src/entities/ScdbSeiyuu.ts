import { Column, Entity, Index } from 'typeorm';

@Index('idx_16603_primary', ['seiyuuIndex'], { unique: true })
@Entity('scdb_seiyuu', { schema: 'shinycolors' })
export class ScdbSeiyuu {
  @Column('integer', { primary: true, name: 'seiyuuindex' })
  seiyuuIndex: number;

  @Column('text', { name: 'seiyuuname' })
  seiyuuName: string;

  @Column('text', { name: 'seiyuuphoto' })
  seiyuuPhoto: string;

  @Column('text', { name: 'seiyuubirthyear', nullable: true })
  seiyuuBirthYear: string | null;

  @Column('text', { name: 'seiyuubirthdate' })
  seiyuuBirthDate: string;

  @Column('text', { name: 'belongingfirm' })
  belongingFirm: string;

  @Column('text', { name: 'seiyuutwitter', nullable: true })
  seiyuuTwitter: string | null;

  @Column('text', { name: 'seiyuuchokume', nullable: true })
  seiyuuChokume: string | null;
}
