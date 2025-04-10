import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity() 
export class Logs {
  @PrimaryGeneratedColumn()
  ID!: number;

  @Column('text')
  Data!: string;

  @Column('text')
  Mensagem!: string;

  @Column('text')
  Tipo!: string;

  @Column('text')
  DateFormat!: string;
}