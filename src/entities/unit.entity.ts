import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Idol } from "./idol.entity";

@Index("UnitID", ["unitId"], { unique: true })
@Entity("SCDB_Units", { schema: "shinycolors_dev2" })
export class Unit {
  @PrimaryGeneratedColumn({ type: "int", name: "UnitID" })
  unitId: number;

  @Column("text", { name: "UnitName" })
  unitName: string;

  @Column("text", { name: "UnitHiragana" })
  unitHiragana: string;

  @Column("text", { name: "Color1" })
  color1: string;

  @Column("text", { name: "Color2" })
  color2: string;

  @Column("text", { name: "UnitPV" })
  unitPv: string;

  @OneToMany(() => Idol, (idol) => idol.unit)
  idols: Idol[];
}
