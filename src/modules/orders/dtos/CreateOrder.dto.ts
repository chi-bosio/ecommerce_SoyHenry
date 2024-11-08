import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
  /**
   * UUID del usuario que está realizando el pedido
   * @example "a23bcf89-67da-4bde-bdce-28df897a7c59"
   */
  @IsNotEmpty()
  @IsUUID('4')
  userId: string;

  /**
   * Lista de UUIDs de productos incluidos en el pedido. Debe contener al menos un producto.
   * @example [ "a34bfe23-45dc-4b78-91fe-23edcbf12398" ]
   */
  @IsArray()
  @ArrayMinSize(1)
  products: string[];
}
