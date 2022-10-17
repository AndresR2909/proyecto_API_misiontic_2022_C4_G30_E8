import {Entity, model, property} from '@loopback/repository';

@model()
export class Ruta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'object',
    required: true,
  })
  origen: object;

  @property({
    type: 'object',
    required: true,
  })
  destino: object;

  @property({
    type: 'string',
    required: true,
  })
  tiempo_estimado: string;


  constructor(data?: Partial<Ruta>) {
    super(data);
  }
}

export interface RutaRelations {
  // describe navigational properties here
}

export type RutaWithRelations = Ruta & RutaRelations;
