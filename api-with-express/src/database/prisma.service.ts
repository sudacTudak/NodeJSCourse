import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(@inject(TYPES.Logger) private logger: ILogger) {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.log('[PrismaService]: Успешное подключение к базе данных');
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error('[PrismaService]: Ошибка при подключении к базе данных: ' + err.message);
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
    this.logger.log('[PrismaService]: Отключение от базы данных');
  }
}
