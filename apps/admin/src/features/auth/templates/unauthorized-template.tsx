'use client';

import { useRouter } from 'next/navigation';
import { localoAuthAssets } from '@localo/assets';
import { Alert, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@localo/ui';
import { AdminRoutes } from '../../../config';
import { ADMIN_AUTH_COPY } from '../config';

export function UnauthorizedTemplate() {
  const router = useRouter();

  return (
    <main className="grid min-h-dvh place-items-center bg-[#F2F4F7] px-5 py-8">
      <Card className="w-full max-w-md text-center" padding="lg" variant="elevated">
        <CardHeader>
          <img alt={localoAuthAssets.securityShield.alt} className="mx-auto h-20 w-20 object-contain" src={localoAuthAssets.securityShield.src} />
          <CardTitle>Access restricted</CardTitle>
          <CardDescription>{ADMIN_AUTH_COPY.nonAdmin}</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert
            description="Use an ADMIN or SUPER_ADMIN account to continue to Localo Admin."
            size="sm"
            variant="warning"
          />
          <Button className="mt-5" fullWidth onClick={() => router.replace(AdminRoutes.Login)} size="lg">
            Back to sign in
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
