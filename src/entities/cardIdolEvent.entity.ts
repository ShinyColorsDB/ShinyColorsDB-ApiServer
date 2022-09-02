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
@Entity("SCDB_CardIdolEvent", { schema: "shinycolors_dev2" })
export class CardIdolEvent {
  @PrimaryGeneratedColumn({ type: "int", name: "EventIndex" })
  eventIndex: number;

  @Column("bigint", { name: "EnzaID", comment: "EnzaID", select: false })
  enzaId: string;

  @Column("text", { name: "EventCategory" })
  eventCategory: string;

  @Column("int", { name: "EventID" })
  eventId: number;

  @Column("text", { name: "EventTitle" })
  eventTitle: string;

  @Column("int", { name: "EventOp1", nullable: true })
  eventOp1: number | null;

  @Column("int", { name: "EventOp2", nullable: true })
  eventOp2: number | null;

  @Column("int", { name: "EventOp3", nullable: true })
  eventOp3: number | null;

  @ManyToOne(
    () => CardList,
    (cardList) => cardList.cardIdolEvents,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "EnzaID", referencedColumnName: "enzaId" }])
  enza: CardList;
}
