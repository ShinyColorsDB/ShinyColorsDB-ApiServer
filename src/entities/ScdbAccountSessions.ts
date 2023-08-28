import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SCDB_AccountSessions', { schema: 'shinycolors' })
export class ScdbAccountSessions {
  @PrimaryGeneratedColumn({ type: 'int', name: 'AccountIndex' })
  accountIndex: number;

  @Column('text', { name: 'AppToken' })
  appToken: string;

  @Column('text', { name: 'AccountSession' })
  accountSession: string;

  @Column('text', { name: 'AccountAppToken' })
  accountAppToken: string;
}
