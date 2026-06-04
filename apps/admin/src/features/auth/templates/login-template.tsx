import { localoAuthAssets } from '@localo/assets';
import { AuthBrandPanel, AuthCard } from '../blocks';

export function LoginTemplate() {
  return (
    <main className="grid min-h-dvh bg-[#F2F4F7] lg:grid-cols-[46fr_54fr]">
      <AuthBrandPanel />

      <section className="relative flex min-h-dvh items-start justify-center overflow-hidden px-4 py-8 pt-10 sm:px-8 lg:px-10 lg:pt-[12vh] xl:px-14 xl:pt-[12vh]">
        <div className="absolute -right-28 -top-24 h-[30rem] w-[30rem] rounded-full bg-white/80 blur-2xl" />
        <div className="absolute -bottom-32 right-10 h-96 w-96 rounded-full bg-white/70 blur-xl" />

        <div className="relative z-10 flex w-full flex-col items-center">
          <div className="mb-8 flex items-center justify-center gap-3 sm:mb-10 lg:hidden">
            <img alt={localoAuthAssets.logoMark.alt} className="h-12 w-12 object-contain" src={localoAuthAssets.logoMark.src} />
            <p className="text-[2rem] font-black leading-none tracking-tight text-[#0F172A]">Localo</p>
            <span className="rounded-localo-full bg-localo-primary px-3.5 py-1 text-xs font-black text-localo-primary-foreground shadow-localo-sm">
              ADMIN
            </span>
          </div>

          <AuthCard />
        </div>
      </section>
    </main>
  );
}
