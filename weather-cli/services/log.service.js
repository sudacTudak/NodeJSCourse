import chalk from "chalk";
import dedent from "dedent-js";

export const printError = (error) => {
  console.log(`${chalk.bgRed(" ERROR ")}: ${error}`);
};

export const printSuccess = (message) => {
  console.log(`${chalk.bgGreen(" SUCCESS ")}: ${message}`);
};

export const printHelp = () => {
  console.log(
    dedent(`
    ${chalk.yellow.bgWhite.bold.underline.yellow(" HELP ")}
    Запуск без параметров - вывод погоды
    -h - для вывода помощи
    -s [CITY] - для установки города
    -t [API_KEY] - для сохранения API-ключа
    `)
  );
};

export const printWeather = (response, icon) => {
  console.log(
    dedent(`
    ${chalk.bgCyan.bold(" WEATHER ")}

    Погода в городе ${chalk.bold(response.name)}
    ${icon ? icon + "  " : ""}${chalk.bold(response.weather[0].description)}
    - Средняя температура: ${chalk.bold(response.main.temp)}
    - Ощущается как: ${chalk.bold(response.main.feels_like)}
    - Влажность: ${chalk.bold(response.main.humidity + "%")}
    - Видимость: ${chalk.bold(response.visibility)}
    - Скорость ветра: ${chalk.bold(response.wind.speed + "(м/с)")}
    - Давление: ${chalk.bold(response.main.pressure)}
    `)
  );
};
