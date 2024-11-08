import { Orders } from '../../orders/entities/orders.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'users' })
export class Users {
  /**
   * Identificador único de cada usuario, generado automáticamente en formato UUID. Este campo es la clave primaria de la tabla.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  /**
   * Nombre completo del usuario. Este campo es obligatorio y tiene un límite de 50 caracteres.
   *
   * @example 'Chiara Bosio'
   */
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  /**
   * Correo electrónico único del usuario, utilizado para la autenticación y comunicación. Este campo es obligatorio y debe ser único en la base de datos.
   *
   * @example 'cbosio@gmail.com'
   */
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  /**
   * Contraseña encriptada del usuario. Este campo es obligatorio y se recomienda almacenar la contraseña utilizando un hash seguro.
   *
   * @example '$2b$10$eW5M6TkNEB8GcvBN... (hashed password)'
   */
  @Column({ type: 'varchar', length: 72, nullable: false })
  password: string;

  /**
   * Número de teléfono del usuario. Este campo es opcional y se puede utilizar para propósitos de contacto o autenticación de dos factores.
   *
   * @example 324235346
   */
  @Column({ type: 'int' })
  phone: number;

  /**
   * País de residencia del usuario. Este campo tiene un límite de 50 caracteres y puede ser utilizado para identificar la ubicación geográfica.
   *
   * @example 'Argentina'
   */
  @Column({ type: 'varchar', length: 50 })
  country: string;

  /**
   * Dirección física del usuario. Puede ser utilizada para fines de facturación o envío de productos. Este campo permite almacenar direcciones largas utilizando el tipo de dato "text".
   *
   * @example 'Calle 123, Piso 4, Departamento B'
   */
  @Column({ type: 'text' })
  address: string;

  /**
   * Ciudad de residencia del usuario. Este campo tiene un límite de 50 caracteres y es útil para identificar la ciudad en la que vive el usuario.
   *
   * @example 'Córdoba'
   */
  @Column({ type: 'varchar', length: 50 })
  city: string;

  /**
   * Indica si el usuario tiene privilegios de administrador. Por defecto es "false", pero puede ser configurado en "true" para otorgar permisos adicionales.
   *
   * @example false
   */
  @Column({ default: false })
  isAdmin: boolean;

  /**
   * Lista de pedidos (orders) asociados al usuario. Esto establece una relación uno a muchos entre el usuario y sus pedidos.
   */
  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];

  /**
   * Fecha de creación del registro del usuario. Este campo es generado automáticamente cuando el usuario es creado.
   *
   * @example '2024-01-15T08:35:21.000Z'
   */
  @CreateDateColumn()
  createdAt?: Date;

  /**
   * Fecha de la última actualización del registro del usuario. Este campo es generado automáticamente cada vez que se actualiza el usuario.
   *
   * @example '2024-02-20T14:21:00.000Z'
   */
  @UpdateDateColumn()
  updatedAt?: Date;
}
