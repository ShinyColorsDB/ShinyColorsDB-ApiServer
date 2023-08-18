import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SCDB_AssetVersion', { schema: 'dev_shinycolors' })
export class ScdbAssetVersion {
  @PrimaryGeneratedColumn({ type: 'int', name: 'AssetIndex' })
  assetIndex: number;

  @Column('text', { name: 'AssetChunk', nullable: true })
  assetChunk: string | null;

  @Column('text', { name: 'AssetPath' })
  assetPath: string;

  @Column('text', { name: 'AssetEncryptedPath' })
  assetEncryptedPath: string;

  @Column('int', { name: 'AssetVersion' })
  assetVersion: number;

  @Column('tinyint', { name: 'AssetExist', width: 1 })
  assetExist: boolean;
}
