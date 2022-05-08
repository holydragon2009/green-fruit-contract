import { PersistentVector } from 'near-sdk-as'


@nearBindgen
export class GreenFruit {
  name: string;
  sku_id: string;
  constructor(name: string, sku_id: string) {
    name = this.name;
    sku_id = this.sku_id;
  }
}

export const fruits = new PersistentVector<GreenFruit>("f");
