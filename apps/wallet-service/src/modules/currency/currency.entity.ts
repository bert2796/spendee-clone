import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'currencies' })
export class CurrencyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 3 })
  code: string;

  @Column({ length: 10 })
  symbol: string
}
