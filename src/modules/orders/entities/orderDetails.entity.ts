import { Products } from '../../products/entities/products.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Orders } from './orders.entity';

@Entity({ name: 'orderDetails' })
export class OrderDetails {
  /**
   * Identificador único de los detalles de la orden, generado automáticamente en formato UUID. Este campo es la clave primaria de la tabla.
   * @example '7b6122d9-9c46-4b9a-90d8-568f7a76944a'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  /**
   * Precio total asociado con los productos en esta orden. Se almacena como un número decimal con precisión de 10 dígitos y 2 decimales.
   * @example 159.99
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  /**
   * La orden a la que pertenecen estos detalles. Relación uno a uno con la entidad "Orders".
   */
  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  orders: Orders;

  /**
   * Lista de productos que están asociados con estos detalles de la orden. Relación de muchos a muchos con la entidad "Products".
   */
  @ManyToMany(() => Products)
  @JoinTable({
    name: 'orderdetails_products',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'orderdetail_id', referencedColumnName: 'id' },
  })
  products: Products[];

  /**
   * Fecha de creación de los detalles de la orden, generada automáticamente al momento de insertar la entidad en la base de datos.
   * @example '2024-10-15T12:45:00.000Z'
   */
  @CreateDateColumn()
  createdAt?: Date;

  /**
   * Fecha de la última actualización de los detalles de la orden, generada automáticamente cuando se modifica la entidad.
   * @example '2024-10-16T14:00:00.000Z'
   */
  @UpdateDateColumn()
  updatedAt?: Date;
}
