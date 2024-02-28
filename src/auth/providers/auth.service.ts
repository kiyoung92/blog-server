import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { jwtUtil } from 'src/common/utils/jwt.util';
import { responseUtil } from 'src/common/utils/response.util';
import { JwtStrategyDto } from '../interface/jwt.strategy.interface';
import { UserRepositoryService } from 'src/user/providers/user-repository.service';
import { SocialLoginService } from './social-login.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly socialLoginService: SocialLoginService,
  ) {}

  async signIn(request: Request, response: Response) {
    responseUtil().setCookiesForGuard({ request, response });

    response.redirect('/');
    response.end();
  }

  async getProfile(id: number): Promise<any> {
    const {
      email,
      nick_name,
      about_me,
      profile_image_url,
      created_at,
      updated_at,
    } = await this.userRepository.findById(id);

    return {
      email,
      nick_name,
      about_me,
      profile_image_url,
      created_at,
      updated_at,
    };
  }

  async refreshToken(response: Response, refreshToken: string) {
    try {
      const { sub, email } = await jwtUtil().verifyRefreshToken(refreshToken);
      const { access_token, refresh_token } = await jwtUtil().getTokens({
        sub,
        email,
      });

      responseUtil().setCookies({ response, access_token, refresh_token });
      response.end();
    } catch (err) {
      throw new UnauthorizedException('The token is not valid');
    }
  }

  async setToken(payload: JwtStrategyDto, response: Response) {
    const { access_token, refresh_token } = await jwtUtil().getTokens(payload);

    responseUtil().setCookies({ response, access_token, refresh_token });

    response.end();
  }

  async googleLogin(request: Request, response: Response) {
    await this.socialLoginService.commonSocialLogin(request, response);
  }

  async githubLogin(request: Request, response: Response) {
    await this.socialLoginService.commonSocialLogin(request, response);
  }

  async kakaoLogin(request: Request, response: Response) {
    await this.socialLoginService.commonSocialLogin(request, response);
  }

  async naverLogin(request: Request, response: Response) {
    await this.socialLoginService.commonSocialLogin(request, response);
  }
}