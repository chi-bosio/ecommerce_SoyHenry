import { ApiProperty } from '@nestjs/swagger';
import { Products } from '../../products/entities/products.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Categories {
  /**
   * Identificador único de la categoría, generado automáticamente en formato UUID. Este campo es la clave primaria de la tabla.
   * @example 'bc29e7ad-3e73-4d89-bb9d-2b3f54a5a4e8'
   */
  @ApiProperty({
    description:
      'Identificador único de la categoría, generado automáticamente en formato UUID. Este campo es la clave primaria de la tabla.',
    example: 'bc29e7ad-3e73-4d89-bb9d-2b3f54a5a4e8',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Nombre de la categoría. Es un campo obligatorio y debe ser un texto de hasta 50 caracteres.
   * @example 'Electrónica'
   */
  @ApiProperty({
    description:
      'Nombre de la categoría. Es un campo obligatorio y debe ser un texto de hasta 50 caracteres.',
    example: 'Electrónica',
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  /**
   * Lista de productos asociados a esta categoría. Relación uno a muchos con la entidad "Products".
   * @type Products[]
   */
  @ApiProperty({
    description:
      'Lista de productos asociados a esta categoría. Relación uno a muchos con la entidad "Products".',
    type: () => [Products],
  })
  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];

  /**
   * Fecha de creación de la categoría, generada automáticamente al insertar la entidad en la base de datos.
   * @example '2024-09-20T14:30:00.000Z'
   */
  @ApiProperty({
    description:
      'Fecha de creación de la categoría, generada automáticamente al insertar la entidad en la base de datos.',
    example: '2024-09-20T14:30:00.000Z',
  })
  @CreateDateColumn()
  createdAt?: Date;

  /**
   * Fecha de la última actualización de la categoría, generada automáticamente cuando se modifica la entidad.
   * @example '2024-10-01T11:00:00.000Z'
   */
  @ApiProperty({
    description:
      'Fecha de la última actualización de la categoría, generada automáticamente cuando se modifica la entidad.',
    example: '2024-10-01T11:00:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt?: Date;
}
