import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {
   
    beforeEach('Начало теста', function () {
        cy.visit('/'); // Зашли на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяем цвет кнопки
    });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // Есть крестик и его видно
    });

it('Верный логин и верный пароль', function () {
    cy.visit('/'); // Зашли на сайт
    cy.get(main_page.email).type(data.login); // Ввели верный логин
    cy.get(main_page.password).type(data.password); // Ввели верный пароль
    cy.get(main_page.login_button).click(); //  Нажали на кнопку "войти"
    cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю что после авторизации вижу текст
    })

it('Верный логин и неверный пароль', function () {
    cy.visit('/'); // Зашли на сайт
    cy.get(main_page.email).type(data.login); // Ввели верный логин
    cy.get(main_page.password).type('iLoveqastudio2'); // Ввели неверный пароль
    cy.get(main_page.login_button).click(); //  Нажали на кнопку "войти"
    cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю что после авторизации вижу текст
})

it('Неверный логин и верный пароль', function () {
    cy.visit('/'); // Зашли на сайт
    cy.get(main_page.email).type('aty@hackerman.ru'); // Ввели неверный логин
    cy.get(main_page.password).type(data.password); // Ввели верный пароль
    cy.get(main_page.login_button).click(); //  Нажали на кнопку "войти"
    cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю что после авторизации вижу текст
})

it('Не валидный логин и верный пароль', function () {
    cy.visit('/'); // Зашли на сайт
    cy.get(main_page.email).type('germandolnikov.ru'); // Ввели логин без @
    cy.get(main_page.password).type(data.password); // Ввели верный пароль
    cy.get(main_page.login_button).click(); //  Нажали на кнопку "войти"
    cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю что после авторизации вижу текст
})
 
it('Проверка востановления пароля', function () {
    cy.visit('/'); // Зашли на сайт
    cy.get(main_page.fogot_pass_btn).click(); //  Нажали на кнопку "забыл пароль"
    cy.get(recovery_password_page.email).type(data.login); // Вводим емэйл
    cy.get(recovery_password_page.send_button).click (); // Нажимаем кнопку
    cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяем сообщение об отправке емэйла
})

it('Верный логин в другом регистре и верный пароль', function () {
    cy.visit('/'); // Зашли на сайт
    cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввели верный в логин в другом регистре
    cy.get(main_page.password).type(data.password); // Ввели верный пароль
    cy.get(main_page.login_button).click(); //  Нажали на кнопку "войти"
    cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю что после авторизации вижу текст
})
})