import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateWalletDto, InitializeUserWalletDto } from "@spendee-clone/common/dto";
import { FindOptionsWhere, Repository } from "typeorm";

import { CurrencyService } from "../currency/currency.service";
import { WalletEntity } from "./wallet.entity";

@Injectable()
export class WalletService {
  private defaultCurrencyId = 1;

  constructor(
    @InjectRepository(WalletEntity) private readonly walletRepository: Repository<WalletEntity>,
    private readonly currencyService: CurrencyService
  ) {}

  async find(where: FindOptionsWhere<WalletEntity> | FindOptionsWhere<WalletEntity>[]): Promise<WalletEntity[]> {
    return this.walletRepository.find({
      relations: ['currency'],
      where,
    });
  }

  async create(createWalletDto: CreateWalletDto): Promise<WalletEntity> {
    const currency = await this.currencyService.findOne({ id: createWalletDto.currencyId });
    if (!currency) {
      throw new RpcException({
        code: HttpStatus.BAD_REQUEST,
        message: 'Currency does not exists.',
      });
    }

    const existingWallet = await this.find({ currency, userId: createWalletDto.userId });
    if (existingWallet.length) {
      throw new RpcException({
        code: HttpStatus.BAD_REQUEST,
        message: 'Wallet already exists.',
      });
    }

    const wallet = new WalletEntity();
    wallet.userId = createWalletDto.userId;
    wallet.currency = currency;

    return this.walletRepository.save(wallet);
  }

  async initializeUserWallet(initializedUserWalletDto: InitializeUserWalletDto) {
    const { userId } = initializedUserWalletDto;
    return this.create({ currencyId: this.defaultCurrencyId, userId });
  }
}
