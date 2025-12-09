// ===================================================
// ГЛОБАЛЬНІ ФУНКЦІЇ ДЛЯ ФОРМАТУВАННЯ
// ===================================================

const monthNames = ["січня", "лютого", "березня", "квітня", "травня", "червня", 
                    "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];
const dayNames = ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"];

/**
 * Функція для форматування часу (додавання нулів).
 * @param {number} h - години
 * @param {number} m - хвилини
 * @param {number} s - секунди
 * @returns {string} - час у форматі HH:MM:SS
 */
function formatTime(h, m, s) {
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

// ===================================================
// ЗАВДАННЯ 1: Об'єкт Час та Функції
// ===================================================

// Об'єкт, що описує час
let timeObject = {
    h: 20,
    m: 30,
    s: 45
};

// 1.1. Функція виведення поточного часу на екран.
function displayTime() {
    const timeStr = formatTime(timeObject.h, timeObject.m, timeObject.s);
    document.getElementById('output-time-current').textContent = `Поточний час: ${timeStr}`;
    document.getElementById('output-time').textContent = `Виведено поточний час: ${timeStr}`;
}

// Викликаємо одразу для ініціалізації відображення
window.onload = displayTime; 

// 1.2. Функція зміни часу на передану кількість секунд.
function changeTime() {
    const secondsInput = parseInt(document.getElementById('sec-input').value);
    if (isNaN(secondsInput)) {
        document.getElementById('output-time').textContent = "Помилка: Будь ласка, введіть коректну кількість секунд.";
        return;
    }

    const oldTime = formatTime(timeObject.h, timeObject.m, timeObject.s);
    
    // Переводимо поточний час у секунди від початку доби
    let totalSeconds = timeObject.h * 3600 + timeObject.m * 60 + timeObject.s;
    
    // Додаємо/віднімаємо передані секунди
    totalSeconds += secondsInput;

    // Обробка переходу через добу (24 години = 86400 секунд)
    const secondsInDay = 86400;
    
    // Операція % secondsInDay гарантує, що час залишається в межах доби (0 - 86399).
    // Додавання secondsInDay перед % потрібне для коректної обробки від'ємних значень.
    totalSeconds = (totalSeconds % secondsInDay + secondsInDay) % secondsInDay; 
    
    // Зворотне перетворення в години, хвилини, секунди
    timeObject.h = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    timeObject.m = Math.floor(totalSeconds / 60);
    timeObject.s = totalSeconds % 60;

    const newTime = formatTime(timeObject.h, timeObject.m, timeObject.s);

    document.getElementById('output-time').textContent = 
        `Початковий час: ${oldTime}\n` +
        `Змінено на секунд: ${secondsInput}\n` +
        `Новий час: ${newTime}`;
    
    displayTime(); // Оновлюємо поточний час на сторінці
}

// ===================================================
// ЗАВДАННЯ 2: Робота з Датою
// ===================================================

// 2.1. Функція виведення поточної дати
function displayCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const dayOfMonth = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    const month = monthNames[date.getMonth()];
    const dayOfWeek = dayNames[date.getDay()];

    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    const result = `Дата: ${dayOfMonth} ${month} ${year} року\n` +
                   `День тижня: ${dayOfWeek}\n` +
                   `Час: ${timeStr}`;
    
    document.getElementById('output-date').textContent = result;
}

// 2.2. Функція, яка за заданим роком та номером місяця визначає останній день
function getLastDayOfMonth() {
    const year = parseInt(document.getElementById('year-input').value);
    const month = parseInt(document.getElementById('month-input').value); // 1-12
    
    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        document.getElementById('output-last-day').textContent = "Помилка: Будь ласка, введіть коректні рік та номер місяця (1-12).";
        return;
    }

    // В конструкторі Date(Рік, Місяць, 0) вказання дня 0 переводить дату на останній день попереднього місяця.
    // Оскільки JS місяці нумеруються 0-11, ми використовуємо month (1-12).
    const date = new Date(year, month, 0); 
    const lastDay = date.getDate();
    
    document.getElementById('output-last-day').textContent = 
        `Останній день ${monthNames[month - 1]} ${year} року: ${lastDay}`;
}

// 2.3. Функція, яка повертає об'єкт з кількістю секунд
function getSecondsInfo() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const totalSecondsInDay = 24 * 3600;
    
    // 1. Кількість секунд, яка пройшла від початку сьогоднішнього дня
    const secondsPassed = hours * 3600 + minutes * 60 + seconds;
    
    // 2. Кількість секунд до початку наступного дня
    const secondsUntilNextDay = totalSecondsInDay - secondsPassed;
    
    return {
        secondsPassed: secondsPassed,
        secondsUntilNextDay: secondsUntilNextDay
    };
}

function displaySecondsInfo() {
    const info = getSecondsInfo();
    document.getElementById('output-sec-info').textContent = 
        `Кількість секунд, що пройшла від початку сьогоднішнього дня: ${info.secondsPassed}\n` +
        `Кількість секунд до початку наступного дня: ${info.secondsUntilNextDay}`;
}

// ===================================================
// ЗАВДАННЯ 3, 4, 5, 6: ООП (Класи та Наслідування)
// ===================================================

// ЗАВДАННЯ 3: Клас Car
class Car {
    constructor(brand, model, year) { // Вимога: Кожен клас має містити конструктор.
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    info() { // Вимога: Щонайменше 1 метод
        return `Авто: ${this.brand} ${this.model}, ${this.year} року.`;
    }
}

// ЗАВДАННЯ 4: Клас ElectricCar (Наслідування від Car)
class ElectricCar extends Car { // Вимога: 1 наслідування
    constructor(brand, model, year, battery) {
        super(brand, model, year);
        this.battery = battery;
    }

    charge() { // Додатковий метод
        return `${this.brand} ${this.model} заряджається... Батарея: ${this.battery} kWh`;
    }
}

// ЗАВДАННЯ 5: Статичний метод
class MathHelper {
    static add(a, b) { // Вимога: Використати статичний метод
        return a + b;
    }
}

// Приклади роботи (виводиться у консоль, але є частиною завдання 3-5)
const car1 = new Car("Toyota", "Camry", 2020);
car1.info(); // Авто: Toyota Camry, 2020 року.

const tesla = new ElectricCar("Tesla", "Model 3", 2022, 75);
tesla.info(); // Авто: Tesla Model 3, 2022 року.
tesla.charge(); // Tesla Model 3 заряджається... Батарея: 75 kWh

console.log(`Приклад статичного методу MathHelper.add(5, 7): ${MathHelper.add(5, 7)}`); // 12

// ===================================================
// ЗАВДАННЯ 6: ІНДИВІДУАЛЬНЕ (Варіант 1: Прямокутник)
// ===================================================

// Базовий клас Figure
class Figure {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    // Статичне поле для підрахунку фігур (Виконання вимоги статичного поля)
    static count = 0; 
    
    // Статичний метод для збільшення лічильника
    static incrementCount() {
        Figure.count++;
    }

    getBaseInfo() {
        return `Назва фігури: ${this.name}\nКолір: ${this.color}`;
    }
}

// Клас Rectangle (Наслідування від Figure)
class Rectangle extends Figure {
    constructor(name, color, length, width) {
        super(name, color); // Наслідування
        this.length = parseFloat(length);
        this.width = parseFloat(width);
        Figure.incrementCount(); // Використання статичного методу
    }

    // Метод для обчислення площі (вимога: щонайменше 1 метод)
    calculateArea() {
        if (isNaN(this.length) || isNaN(this.width) || this.length <= 0 || this.width <= 0) {
            return 'Некоректні розміри';
        }
        return this.length * this.width;
    }

    // Перевизначений метод info() для виведення всіх даних
    info() {
        const area = this.calculateArea();
        
        return `${this.getBaseInfo()}\n` +
               `Довжина: ${this.length} см\n` +
               `Ширина: ${this.width} см\n` +
               `Площа: ${area} кв.см\n` +
               `Всього створено об'єктів Figure (статичне поле): ${Figure.count}`;
    }
}

/**
 * Функція для обробки форми Індивідуального Завдання.
 * (Виведення результатів на вебсторінку)
 */
function showIndividualInfo() {
    const name = document.getElementById('figure-name').value;
    const length = document.getElementById('figure-length').value;
    const width = document.getElementById('figure-width').value;
    const color = document.getElementById('figure-color').value;

    if (!name || !length || !width || !color) {
        document.getElementById('output-individual').textContent = 'Помилка: Будь ласка, заповніть усі поля.';
        return;
    }

    // Створюємо новий об'єкт
    const rect = new Rectangle(name, color, length, width);
    
    // Виводимо інформацію на сторінку
    document.getElementById('output-individual').textContent = rect.info();
}

/**
 * Функція для очищення полів форми.
 * (Виконання вимоги: Кнопка "Очистити поля")
 */
function clearIndividualFields() {
    document.getElementById('figure-name').value = '';
    document.getElementById('figure-length').value = '';
    document.getElementById('figure-width').value = '';
    document.getElementById('figure-color').value = '';
    document.getElementById('output-individual').textContent = '';
}