import { Users } from '../../users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrderDetails } from './orderDetails.entity';

@Entity({ name: 'orders' })
export class Orders {
  /**
   * Identificador único de la orden, generado automáticamente en formato UUID. Este campo es la clave primaria de la tabla.
   * @example 'c3b112e7-8c72-478f-9239-0e5218333a54'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  /**
   * Fecha en la que se realiza la orden. Este campo es obligatorio.
   * @example '2024-10-15T12:45:00.000Z'
   */
  @Column()
  date: Date;

  /**
   * Detalles de la orden asociados con esta orden específica. Relación uno a uno con la entidad "OrderDetails".
   */
  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.orders)
  orderDetails: OrderDetails;

  /**
   * Usuario que realizó la orden. Relación de muchos a uno con la entidad "Users".
   */
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  /**
   * Fecha de creación de la orden, generada automáticamente cuando se inserta la orden en la base de datos.
   * @example '2024-10-15T12:46:00.000Z'
   */
  @CreateDateColumn()
  createdAt?: Date;

  /**
   * Fecha de la última actualización de la orden, generada automáticamente cuando se modifica la orden.
   * @example '2024-10-16T14:00:00.000Z'
   */
  @UpdateDateColumn()
  updatedAt?: Date;
}
