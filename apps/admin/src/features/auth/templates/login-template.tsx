import { localoAuthAssets } from '@localo/assets';
import { AuthBrandPanel, AuthCard } from '../blocks';

export function LoginTemplate() {
  return (
    <main className="grid min-h-dvh bg-[#F2F4F7] lg:grid-cols-[minmax(32rem,0.9fr)_minmax(30rem,1.1fr)]">
      <AuthBrandPanel />

      <section className="relative flex min-h-dvh items-center justify-center overflow-hidden px-5 py-8 sm:px-8 lg:px-12">
        <div className="absolute -right-28 -top-24 h-96 w-96 rounded-full bg-white/70 blur-2xl" />
        <div className="absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-white/60 blur-xl" />

        <div className="relative z-10 flex w-full flex-col items-center">
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <img alt={localoAuthAssets.shopIllustration.alt} className="h-12 w-12 object-contain" src={localoAuthAssets.shopIllustration.src} />
            <p className="text-3xl font-black tracking-tight text-[#0F172A]">Localo</p>
            <span className="rounded-localo-full bg-localo-primary px-3 py-1 text-xs font-black text-localo-primary-foreground">
              ADMIN
            </span>
          </div>

          <AuthCard />
        </div>
      </section>
    </main>
  );
}
