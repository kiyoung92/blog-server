import { AuthGuard } from '@nestjs/passport';

export const GoogleGuard = AuthGuard('google');