import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { jwtUtil } from 'src/common/utils/jwt.util';
import { prismaUtil } from 'src/common/utils/prisma.util';
import { responseUtil } from 'src/common/utils/response.util';

@Injectable()
export class AuthService {
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
    } = await prismaUtil().findById(id);

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
}
