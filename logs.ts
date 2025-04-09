import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class logs_v2 {
  @PrimaryGeneratedColumn()
  Data!: string;

  @Column()
  Mensagem!: string;

  @Column()
  Tipo!: string;

  @Column()
  DateFormat!: string;
}
