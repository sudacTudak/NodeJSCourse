#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getIcon, getWeather } from "./services/api.service.js";
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from "./services/log.service.js";
import {
  saveKeyValue,
  KEYS_DICTIONARY,
  getKeyValue,
} from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError(`API-ключ не был передан`);
    return;
  }
  try {
    await saveKeyValue(KEYS_DICTIONARY.token, token);
    printSuccess("API-ключ сохранен");
  } catch (e) {
    printError(`При сохранении API-ключа возникла ошибка: ${e.message}`);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError(`Город не был передан`);
    return;
  }

  try {
    await saveKeyValue(KEYS_DICTIONARY.city, city);
    printSuccess("Город сохранен");
  } catch (e) {
    printError(`При сохранении города возникла ошибка: ${e.message}`);
  }
};

const getForcast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(KEYS_DICTIONARY.city));
    const weatherData = await getWeather(city);
    printWeather(weatherData, getIcon(weatherData.weather[0].icon));
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("Неверно указан город");
    } else if (e?.response?.status == 401) {
      printError("Неверно указан API-ключ");
    } else {
      printError(e.message);
    }
  }
};

const initCLI = async () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.s) {
    return await saveCity(args.s);
  }

  if (args.t) {
    return await saveToken(args.t);
  }

  return getForcast();
};

initCLI();
