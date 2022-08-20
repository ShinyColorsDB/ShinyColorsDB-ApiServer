import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Idol } from "./idol.entity";

@Index("IdolID", ["idolId"], {})
@Entity("SCDB_IdolDress", { schema: "shinycolors_dev2" })
export class IdolDress {
  @PrimaryGeneratedColumn({ type: "int", name: "DressIndex" })
  dressIndex: number;

  @Column("int", { name: "IdolID" })
  idolId: number;

  @Column("bigint", { name: "EnzaID" })
  enzaId: string;

  @Column("text", { name: "DressName" })
  dressName: string;

  @Column("text", { name: "DressUUID" })
  dressUuid: string;

  @Column("tinyint", { name: "Sml_Cloth0", width: 1 })
  smlCloth0: boolean;

  @Column("tinyint", { name: "Sml_Cloth1", width: 1 })
  smlCloth1: boolean;

  @Column("tinyint", { name: "Big_Cloth0", width: 1 })
  bigCloth0: boolean;

  @Column("tinyint", { name: "Big_Cloth1", width: 1 })
  bigCloth1: boolean;

  @Column("text", { name: "DressType" })
  dressType: string;

  @Column("tinyint", { name: "Exist", width: 1 })
  exist: boolean;

  @ManyToOne(() => Idol, (idol) => idol.idolDress, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "IdolID", referencedColumnName: "idolId" }])
  idol: Idol;
}
