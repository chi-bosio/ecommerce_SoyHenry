import { Categories } from '../../categories/entities/categories.entity';
import { OrderDetails } from '../../orders/entities/orderDetails.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Products {
  /**
   * Identificador único de cada producto, generado automáticamente en formato UUID. Este campo es la clave primaria de la tabla.
   * @example 'e290f1ee-7d64-4b02-80e7-c701748e0952'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Nombre del producto, que debe ser único. Este campo es obligatorio y tiene un límite de 50 caracteres.
   * @example 'Camiseta Deportiva'
   */
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  /**
   * Descripción detallada del producto, permitiendo un campo de texto largo. Este campo es obligatorio.
   * @example 'Camiseta deportiva 100% poliéster, de secado rápido y cómoda para cualquier actividad física.'
   */
  @Column({ type: 'text', nullable: false })
  description: string;

  /**
   * Precio del producto en formato decimal con dos dígitos de precisión. Este campo es obligatorio.
   * @example 25.99
   */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  /**
   * Cantidad de unidades disponibles en el inventario del producto. Este campo es obligatorio.
   * @example 150
   */
  @Column({ type: 'int', nullable: false })
  stock: number;

  /**
   * URL de la imagen del producto. Si no se proporciona, se asigna una imagen por defecto.
   * @example 'https://mi-tienda.com/imagenes/camiseta-deportiva.png'
   */
  @Column({
    type: 'varchar',
    default:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/1200px-Imagen_no_disponible.svg.png',
  })
  imgUrl: string;

  /**
   * Categoría a la que pertenece el producto. Esta es una relación de muchos a uno con la entidad "Categories".
   */
  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  /**
   * Detalles del pedido que incluyen este producto. Es una relación de muchos a muchos con la entidad "OrderDetails".
   */
  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];

  /**
   * Fecha en la que el producto fue creado. Este campo es generado automáticamente.
   * @example '2024-01-15T08:35:21.000Z'
   */
  @CreateDateColumn()
  createdAt?: Date;

  /**
   * Fecha en la que el producto fue actualizado por última vez. Este campo es generado automáticamente.
   * @example '2024-02-20T14:21:00.000Z'
   */
  @UpdateDateColumn()
  updatedAt?: Date;
}
