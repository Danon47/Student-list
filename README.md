# Панель управления студентами

## Описание
Проект представляет собой панель управления студентами, которая включает функциональность для добавления, фильтрации, сортировки и удаления студентов. Данные студентов сохраняются в массиве, а также предусмотрена возможность работы с сервером для хранения списка студентов.

## Цели задания
- Закрепить навыки работы с массивами объектов.
- Развить умение взаимодействовать с формами, валидацией и фильтрацией данных.
- Практиковаться в работе с API.

## Что нужно сделать

### Этап 1: Панель управления студентами

1. **Форма добавления нового студента**:
   - Имя, фамилия, отчество, дата рождения, год начала обучения, факультет.
   - Валидация:
     - Все поля обязательны для заполнения (метод `trim()`).
     - Дата рождения должна быть в пределах от 01.01.1900 до текущей даты.
     - Год начала обучения должен быть от 2000 года до текущего.
   - При успешной валидации студент добавляется в таблицу, поля формы очищаются. Если валидация не прошла, выводятся сообщения об ошибках.

2. **Таблица студентов**:
   - Отображаются Ф. И. О., факультет, дата рождения (с возрастом), годы обучения (с номером курса).
   - Сортировка по клику на заголовки таблицы:
     - По Ф. И. О., факультету, дате рождения, году начала обучения.
   - Фильтрация студентов по Ф. И. О., факультету, году начала и окончания обучения.
   
3. **Фильтры**:
   - Поля для фильтрации по Ф. И. О., факультету, году начала и окончания обучения.
   - Фильтры обновляют таблицу при каждом изменении.

### Этап 2: Работа с API

1. **Сохранение данных на сервере**:
   - При запуске приложения проверяется наличие данных на сервере.
   - Если данные на сервере есть, они загружаются и отображаются в таблице.

2. **Удаление студентов**:
   - Каждый студент в таблице будет иметь кнопку для удаления.
   - При удалении студента данные отправляются на сервер для обновления.

## Технологии
- HTML
- CSS
- JavaScript
- API для сохранения данных

## Инструкции по запуску

1. Клонировать репозиторий:

   ```bash
    git clone https://github.com/danon47/Skillbox-3D-course.git
2. Для работы с сервером:

  - Перейдите в папку backend:
   ```bash
   cd backend

  - Установите зависимости:
  ```bash
  npm install

  - Запустите сервер:
  ```bash
  npm run dev

3. Для работы с клиентской частью:

  - Перейдите в папку frontend:
  ```bash
  cd frontend

- Установите зависимости:
  ```bash
  npm install

  - Запустите приложение:
  ```bash
  npm run dev

  - После запуска клиентского приложения сервер будет автоматически сохранять и загружать данные студентов.
4. После запуска клиентского приложения, откройте его в браузере. Сервер и клиент будут взаимодействовать, и данные студентов будут сохранены.
