import { localoAuthAssets } from '@localo/assets';
import { Badge } from '@localo/ui';

const featureHighlights = [
  {
    title: 'Shop Approvals',
    description: 'Review and approve new shops',
    asset: localoAuthAssets.shopApprovalsIcon
  },
  {
    title: 'Catalog Control',
    description: 'Manage categories and products',
    asset: localoAuthAssets.catalogControlIcon
  },
  {
    title: 'Support Operations',
    description: 'Handle tickets and user support',
    asset: localoAuthAssets.supportOperationsIcon
  },
  {
    title: 'Commission Tracking',
    description: 'Track earnings and settlements',
    asset: localoAuthAssets.commissionTrackingIcon
  }
] as const;

export function AuthBrandPanel() {
  return (
    <aside className="relative hidden min-h-dvh overflow-hidden bg-[#0F172A] px-10 py-10 text-white lg:flex lg:flex-col xl:px-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(22,163,74,0.22),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(13,148,136,0.16),transparent_30%)]" />
      <div className="absolute bottom-24 right-4 h-72 w-72 rounded-full border border-white/10" />
      <div className="absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-localo-primary/10 blur-3xl" />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-center gap-3">
          <img alt={localoAuthAssets.shopIllustration.alt} className="h-14 w-14 object-contain" src={localoAuthAssets.shopIllustration.src} />
          <p className="text-3xl font-black tracking-tight">Localo</p>
          <Badge className="bg-localo-primary text-localo-primary-foreground" variant="primary">
            ADMIN
          </Badge>
        </div>

        <div className="mt-12 max-w-xl">
          <h1 className="text-5xl font-black tracking-tight xl:text-6xl">
            Localo <span className="text-localo-primary">Admin</span>
          </h1>
          <p className="mt-5 max-w-lg text-xl leading-8 text-white/78">
            Manage local shops, products, support, commissions, and platform operations from one secure dashboard.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          {featureHighlights.map((feature) => (
            <div className="flex items-center gap-4" key={feature.title}>
              <span className="flex h-12 w-12 items-center justify-center rounded-localo-full bg-white/10">
                <img alt={feature.asset.alt} className="h-8 w-8 object-contain" src={feature.asset.src} />
              </span>
              <span>
                <span className="block text-base font-bold">{feature.title}</span>
                <span className="text-sm text-white/70">{feature.description}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="relative mt-auto max-w-xl">
          <img
            alt={localoAuthAssets.adminDashboardIllustration.alt}
            className="mt-8 max-h-64 w-full object-contain opacity-95"
            src={localoAuthAssets.adminDashboardIllustration.src}
          />
          <div className="mt-6 flex items-center gap-4 rounded-localo-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
            <img alt={localoAuthAssets.secureTrusted.alt} className="h-12 w-12 object-contain" src={localoAuthAssets.secureTrusted.src} />
            <p className="text-sm leading-6 text-white/76">
              <span className="block text-base font-bold text-white">Secure & Trusted</span>
              Your data is protected with enterprise-grade security.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
