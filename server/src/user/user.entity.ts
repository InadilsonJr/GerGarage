  import { Booking } from 'src/booking/booking.entity';
  import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    surname: string;

    @Column()
    mobile: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @OneToMany(() => Booking, booking => booking.user)
    booking?: Booking

    @Column({ default: true })
    isActive: boolean;
  }