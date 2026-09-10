import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Ingredient } from '../ingredients/ingredients.entity';
import { User } from '../users/users.entity';
import { Order } from '../orders/orders.entity';

const img = (name: string) => `https://code.s3.yandex.net/react/code/${name}`;

const ingredient = (
  name: string,
  type: 'bun' | 'sauce' | 'main',
  price: number,
  nutrients: [number, number, number, number],
  imgName: string,
): Partial<Ingredient> => ({
  name,
  type,
  price,
  proteins: nutrients[0],
  fat: nutrients[1],
  carbohydrates: nutrients[2],
  calories: nutrients[3],
  image: img(`${imgName}.png`),
  image_large: img(`${imgName}-large.png`),
  image_mobile: img(`${imgName}-mobile.png`),
});

const data: Partial<Ingredient>[] = [
  ingredient(
    'Краторная булка N-200i',
    'bun',
    1255,
    [80, 24, 53, 420],
    'bun-02',
  ),
  ingredient(
    'Флюоресцентная булка R2-D3',
    'bun',
    988,
    [44, 26, 85, 643],
    'bun-01',
  ),
  ingredient('Соус Spicy-X', 'sauce', 90, [30, 20, 40, 30], 'sauce-02'),
  ingredient(
    'Соус фирменный Space Sauce',
    'sauce',
    80,
    [50, 22, 11, 14],
    'sauce-04',
  ),
  ingredient(
    'Соус с шипами Антарианского плоскоходца',
    'sauce',
    88,
    [23, 45, 65, 76],
    'sauce-01',
  ),
  ingredient(
    'Соус традиционный галактический',
    'sauce',
    15,
    [42, 24, 42, 99],
    'sauce-03',
  ),
  ingredient(
    'Филе Люминесцентного тетраодонтимформа',
    'main',
    988,
    [44, 26, 85, 643],
    'core',
  ),
  ingredient(
    'Мясо бессмертных моллюсков Protostomia',
    'main',
    1337,
    [433, 244, 33, 420],
    'meat-02',
  ),
  ingredient(
    'Говяжий метеорит (отбивная)',
    'main',
    3000,
    [800, 800, 300, 2674],
    'meat-04',
  ),
  ingredient(
    'Биокотлета из марсианской Магнолии',
    'main',
    424,
    [420, 142, 242, 4242],
    'meat-01',
  ),
  ingredient(
    'Плоды Фалленианского дерева',
    'main',
    874,
    [20, 5, 55, 77],
    'sp_1',
  ),
  ingredient(
    'Хрустящие минеральные кольца',
    'main',
    300,
    [808, 689, 609, 986],
    'rings',
  ),
  ingredient(
    'Кристаллы марсианских альфа-сахаридов',
    'main',
    762,
    [234, 189, 111, 552],
    'mineral',
  ),
  ingredient('Мини-салат Экзо-Плантаго', 'main', 4400, [1, 2, 3, 6], 'salad'),
  ingredient(
    'Сыр с астероидной плесенью',
    'main',
    4142,
    [84, 48, 420, 3377],
    'cheese',
  ),
];

async function seed() {
  const ds = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_HOST),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Ingredient, User, Order],
    synchronize: true,
  });

  await ds.initialize();
  const repo = ds.getRepository(Ingredient);
  const count = await repo.count();

  if (count > 0) {
    console.log('Ингредиенты уже добавлены');
  } else {
    await repo.save(data.map((d) => repo.create(d)));
    console.log(`Добавлено ингредиентов: ${data.length}`);
  }

  await ds.destroy();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
