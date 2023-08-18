import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SCDB_Seiyuu', { schema: 'dev_shinycolors' })
export class ScdbSeiyuu {
  @PrimaryGeneratedColumn({ type: 'int', name: 'SeiyuuIndex' })
  seiyuuIndex: number;

  @Column('text', { name: 'SeiyuuName' })
  seiyuuName: string;

  @Column('text', { name: 'SeiyuuPhoto' })
  seiyuuPhoto: string;

  @Column('text', { name: 'SeiyuuBirthYear', nullable: true })
  seiyuuBirthYear: string | null;

  @Column('text', { name: 'SeiyuuBirthDate' })
  seiyuuBirthDate: string;

  @Column('text', { name: 'BelongingFirm' })
  belongingFirm: string;

  @Column('text', { name: 'SeiyuuTwitter', nullable: true })
  seiyuuTwitter: string | null;

  @Column('text', { name: 'SeiyuuChokume', nullable: true })
  seiyuuChokume: string | null;
}
