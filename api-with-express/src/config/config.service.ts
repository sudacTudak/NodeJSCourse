import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.Logger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error('[ConfigService]: Не удалось прочитать файл .env или он отсутствует');
    } else {
      this.config = result.parsed as DotenvParseOutput;
      this.logger.log('[ConfigService]: Конфигурация .env загружена');
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
