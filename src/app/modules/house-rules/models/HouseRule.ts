import { Entitie } from './Entitie';

export interface HouseRule {
  success: boolean;
  data: {
    entities: Array<Entitie>;
    pagination: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: 1;
      links: {
        next?: number;
        prev?: number;
      };
    };
  };
  message: string;
}
