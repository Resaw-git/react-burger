# Stellar Burger :hamburger:
## React приложение в рамках курса Яндекс практикума React&nbsp;-&nbsp;разработчик
Веб-приложение космической бургерной где Вы сможете собрать бургер по своему рецепту, оформить заказ, посмотреть ленту всех заказов, а так же личный кабинет с историей ваших заказов.

:link: ссылка на демо: https://react-burger-beta.vercel.app/

## Технологии
 - TypeScript v4.7
 - React v18.2
 - Redux v4.2
 - Redux thunk v2.4
 - React Router v5.2

## Функционал
 - Навигация по приложению
 - Список ингредиентов с детальной информацией в модальном окне
 - Конструктор заказа с возможностью оформить заказ
 - Перетаскивание ингредиентов в конструктор с помощью drag&drop
 - Лента заказов с детальной информацией о заказе в модальном окне, статус и статистика заказов
 - Личный кабинет с регистрацией, авторизацией, аутентификацей и востановлением пароля
 - Редактирование данных в личном кабинете и просмотр заказов

## Запуск
 1.  <code>git clone https://github.com/Resaw-git/react-burger.git</code>
 2.  <code>npm install</code>
 3.  <code>npm start</code>

## Доступные скрипты
  - <code>npm start</code>: запуск приложения на localhost
  - <code>npm run build</code>: оптимизированная сборка приложения
  - <code>npm run test</code>: запуск модульных тестов для redux
  - <code>npm run test:cypress</code>: запуск E2E тестов

## TODO:
 :black_square_button: Адаптивный дизайн  
 :black_square_button: Вёрстка мобильной версии (ссылка на макет: https://www.figma.com/file/zFGN2O5xktHl9VmoOieq5E/React-_-Проектные-задачи_external_link?node-id=0%3A1&t=z5xewpXbDAkYwxEv-0)  
 :black_square_button: Переключение типов игредиентов на табы  
 :black_square_button: Адекватное переключение фокуса на TAB, выделение ингредиентов   
 :black_square_button: Работа с асинхроными запросами: дожидаться ответа от сервера, затем рендерить страницу(маршрут /login и /profile)  

