#Задачи на СР
1. Создать csv-файл со списком товаров
2. Отобразить на главной странице только категории оваров
   При нажатии на категорию, пользователь переходит на страницу с выбранной категорией, где отображаются соответствующие товары (как на сайте https://dream-petshop.herokuapp.com);
3. Наполнить БД 20 товарами

4. Создать новую страницу (новый роутер) add
   + На странице выводится форма добавления товара на сайт, включающая в себя все характеристики товара
   + Подключить javascript-файл (публичный), который соберет заполненную форму при нажатии на кнопку "Добавить" и выведет их в консоли

5. Научиться выбирать товар и удалять его с сайта и из БД при нажатии на соответствующую кнопку (deleteOne({характеристики}));

6. Создать админку товаров, в которой можно отобразить все товары / удалить това и поменять информацию о товаре (get / delete / put)
   1. Создать 3 роутера для:
      - получения всех товаров
      - удаления одного товара
      - изменения одного товара
   2. Создать роутер для отображения соответствующей страницы
   3. Создать view соответствующей страницы
   
7. Настроить динамическую проверку localStorage для удаления, добавления и изменения товара. Обновлять localStorage при получении данных из базы данных
