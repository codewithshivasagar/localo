import { localoAuthAssets } from '@localo/assets';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@localo/ui';
import { ADMIN_AUTH_COPY } from '../config';
import { LoginForm } from './login-form';

export function AuthCard() {
  return (
    <Card className="w-[calc(100%-2rem)] max-w-[42rem] rounded-[1.75rem] border-white/80 bg-white/95 px-6 py-6 backdrop-blur sm:px-8 sm:py-7" padded={false} variant="elevated">
      <CardHeader className="mb-5 text-center">
        <img
          alt={localoAuthAssets.shopIllustration.alt}
          className="mx-auto h-24 w-24 object-contain sm:h-28 sm:w-28"
          src={localoAuthAssets.shopIllustration.src}
        />
        <CardTitle className="mt-3 text-[2rem] leading-tight sm:text-[2.25rem]">{ADMIN_AUTH_COPY.title}</CardTitle>
        <CardDescription className="text-base leading-7 text-localo-text-muted">{ADMIN_AUTH_COPY.subtitle}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-5 h-px bg-localo-border sm:mb-6" />
        <LoginForm />
        <div className="mt-8 flex items-start justify-center gap-3 text-left text-sm text-localo-text-muted">
          <img alt={localoAuthAssets.securityShield.alt} className="mt-0.5 h-8 w-8 object-contain" src={localoAuthAssets.securityShield.src} />
          <p className="max-w-64 leading-7">
            <span className="block font-bold text-localo-text">Admin access only.</span>
            Unauthorized access is restricted.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
