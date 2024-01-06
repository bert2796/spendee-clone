import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginAuthDto, RegisterAuthDto } from '@spendee-clone/common/dto';
import { User } from '@spendee-clone/common/types';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}

  async healthCheck() {
    return firstValueFrom(
      this.authServiceClient.send<string>({ cmd: 'health' }, ''),
    );
  }

  async validateToken(token: string): Promise<User> {
    return firstValueFrom(
      this.authServiceClient
        .send<User, string>({ cmd: 'validate-token', role: 'auth' }, token)
        .pipe(timeout(5000))
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  async login(loginAuthDto: LoginAuthDto): Promise<{ accessToken: string }> {
    return firstValueFrom(
      this.authServiceClient
        .send<{ accessToken: string }, LoginAuthDto>(
          { cmd: 'login', role: 'auth' },
          loginAuthDto,
        )
        .pipe(timeout(5000))
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  async register(registerAuthDto: RegisterAuthDto) {
    return firstValueFrom(
      this.authServiceClient
        .send<{ accessToken: string }, RegisterAuthDto>(
          { cmd: 'register', role: 'auth' },
          registerAuthDto,
        )
        .pipe(timeout(5000))
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }
}
