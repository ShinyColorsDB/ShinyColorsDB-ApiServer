import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SCDB_SupportSkillList', { schema: 'shinycolors' })
export class ScdbSupportSkillList {
  @PrimaryGeneratedColumn({ type: 'int', name: 'SupSkillIndex' })
  supSkillIndex: number;

  @Column('text', { name: 'SupSkillName' })
  supSkillName: string;

  @Column('tinyint', { name: 'HasSubOption' })
  hasSubOption: boolean;
}
