import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type IngredientType = 'bun' | 'sauce' | 'main';

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  type: IngredientType;

  @Column('int')
  price: number;

  @Column('int')
  proteins: number;

  @Column('int')
  fat: number;

  @Column('int')
  carbohydrates: number;

  @Column('int')
  calories: number;

  @Column()
  image: string;

  @Column()
  image_large: string;

  @Column()
  image_mobile: string;
}
