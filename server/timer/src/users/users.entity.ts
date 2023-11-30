import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';

export class Timers {
  @Column()
  s: number[];

  @Column()
  m: number[];

  @Column()
  l: number[];
}

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column(() => Timers)
  timers: Timers;
}
