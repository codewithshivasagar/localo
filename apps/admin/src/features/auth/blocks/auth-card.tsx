import { localoAuthAssets } from '@localo/assets';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@localo/ui';
import { ADMIN_AUTH_COPY } from '../config';
import { LoginForm } from './login-form';

export function AuthCard() {
  return (
    <Card className="w-full max-w-[27.5rem] border-white/80 shadow-localo-lg" padding="lg" variant="elevated">
      <CardHeader className="text-center">
        <img
          alt={localoAuthAssets.shopIllustration.alt}
          className="mx-auto h-24 w-24 object-contain sm:h-28 sm:w-28"
          src={localoAuthAssets.shopIllustration.src}
        />
        <CardTitle className="mt-3">{ADMIN_AUTH_COPY.title}</CardTitle>
        <CardDescription className="text-base">{ADMIN_AUTH_COPY.subtitle}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-6 h-px bg-localo-border" />
        <LoginForm />
        <div className="mt-8 flex items-start justify-center gap-3 text-left text-sm text-localo-text-muted">
          <img alt={localoAuthAssets.securityShield.alt} className="mt-0.5 h-9 w-9 object-contain" src={localoAuthAssets.securityShield.src} />
          <p className="max-w-64 leading-6">
            <span className="block font-bold text-localo-text">Admin access only.</span>
            Unauthorized access is restricted.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
