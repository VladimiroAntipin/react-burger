# Stellar Burger
## Учебный проект Яндекс Практикума

## Ссылка на GitHub Pages
Ссылка проекта на GitHub Pages [Stellar Burger - GitHub Pages](https://vladimiroantipin.github.io/react-burger/).

## SPRINT 11 - ВЁРСТКА
При создании этого проекта был использован:
* React;
* библиотека UI-компонентов от Яндекс Практикума;
* CSS модулы;
* API для получение информации об ингрудиентов бургеров;
* Hook;
* Portal;

## Файловая структура
Каждый компонент храниться в отдельной директории вместе с его стили CSS.

## Вёрстка главного экрана проекта
главная страница состоит от 3 секции:
* AppHeader — шапка приложения;
* BurgerIngredients — список ингредиентов;
* BurgerConstructor — текущий состав бургера.

## Компоненты Modal и ModalOverlay
В проектной работе используется несколько модальных окон: для оформленного заказа, детальной информации об ингредиенте и детального состава заказа.

## SPRINT 12 - REDUX
* Исправленные ошибки от Sprint 11
* Логика приложение теперь в Redux
* Добавлена возможность создать заказ
* Улучшение UI: переключение TAB при скролл и возможность изменить порядок игредиенты в корзину

## SPRINT 13 - ROUTING AND AUTHORIZATION
* Исправленные ошибки от Sprint 12
* Новые стрвницы с маршрутом 
* Возможность создать профиль, управлять его и сделать логин/логаут 
* Модал с игредиентом остается открытым если обновляем страницу
* возможность открыть страница с деталей ингредиента по id

## SPRINT 14 - TYPESCRIPT
* типизация
* удаление PropTypes

## SPRINT 15 - WEBSOCKET
* добавление лента заказов и заказов пользователья
* подключение WS
* добавление модал и страницы с деталями заказа

## SPRINT 16 - TESTING AND DEPLOY
* добавление тест для редюсеров
* добавление тест для компонентов
* деплой в gh-pages

## Available Scripts
In the project directory, you can run:
* `npm start` Dev-mode
* `npm test` Interactive watch mode
* `npm run build` Build
* `npm run eject` Eject

#### To get a new build
##### Add in package.json file "homepage": "https://vladimiroantipin.github.io/react-burger/", and in BurgerConstructor.tsx delete '/' in EMPTY_BUN thumbnail
