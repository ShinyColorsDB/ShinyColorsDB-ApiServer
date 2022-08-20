import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CardList } from "./cardList.entity";

@Index("CardIndex", ["enzaId"], {})
@Entity("SCDB_CardIdeaMark", { schema: "shinycolors_dev2" })
export class CardIdeaMark {
  @PrimaryGeneratedColumn({ type: "int", name: "IdeaMarkIndex" })
  ideaMarkIndex: number;

  @Column("bigint", { name: "EnzaID" })
  enzaId: string;

  @Column("text", { name: "IdeaMark" })
  ideaMark: string;

  @ManyToOne(
    () => CardList,
    (cardList) => cardList.cardIdeaMarks,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "EnzaID", referencedColumnName: "enzaId" }])
  enza: CardList;
}
