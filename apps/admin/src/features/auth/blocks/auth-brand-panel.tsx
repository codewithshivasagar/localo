import { localoAuthAssets, localoBrandAssets } from "@localo/assets";
import { Badge } from "@localo/ui";

const featureHighlights = [
  {
    title: "Shop Approvals",
    description: "Review and approve new shops",
    asset: localoAuthAssets.shopApprovalsIcon,
  },
  {
    title: "Catalog Control",
    description: "Manage categories and products",
    asset: localoAuthAssets.catalogControlIcon,
  },
  {
    title: "Support Operations",
    description: "Handle tickets and user support",
    asset: localoAuthAssets.supportOperationsIcon,
  },
  {
    title: "Commission Tracking",
    description: "Track earnings and settlements",
    asset: localoAuthAssets.commissionTrackingIcon,
  },
] as const;

export function AuthBrandPanel() {
  return (
    <aside className="relative hidden min-h-dvh overflow-hidden bg-[#0F172A] px-9 py-9 text-white lg:flex lg:flex-col xl:px-14 xl:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(22,163,74,0.22),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(13,148,136,0.16),transparent_30%)]" />
      <div className="absolute bottom-24 right-4 h-72 w-72 rounded-full border border-white/10" />
      <div className="absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-localo-primary/10 blur-3xl" />
      <div className="absolute bottom-48 right-20 h-44 w-64 rounded-[50%] border border-localo-accent/20 opacity-70" />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-center gap-3">
          <img
            alt={localoBrandAssets.localoLogoTransparentLight.alt}
            className="max-w-[15rem] object-contain"
            src={localoBrandAssets.localoLogoTransparentLight.src}
          />
          <Badge
            className="min-h-7 rounded-localo-full bg-localo-primary px-3.5 text-sm text-localo-primary-foreground"
            variant="primary"
          >
            ADMIN
          </Badge>
        </div>

        <div className="mt-12 max-w-xl xl:mt-14">
          <h1 className="text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">
            Localo <span className="text-localo-primary">Admin</span>
          </h1>
          <p className="mt-5 max-w-[29rem] text-lg leading-8 text-white/75 xl:text-xl">
            Manage local shops, products, support, commissions, and platform
            operations from one secure dashboard.
          </p>
        </div>

        <div className="mt-9 space-y-4 xl:mt-10 xl:space-y-5">
          {featureHighlights.map((feature) => (
            <div
              className="flex min-h-16 items-center gap-4"
              key={feature.title}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-localo-full bg-white/10 shadow-localo-sm">
                <img
                  alt={feature.asset.alt}
                  className="h-7 w-7 object-contain"
                  src={feature.asset.src}
                />
              </span>
              <span>
                <span className="block text-base font-black">
                  {feature.title}
                </span>
                <span className="text-sm leading-6 text-white/70">
                  {feature.description}
                </span>
              </span>
            </div>
          ))}
        </div>

        <div className="relative mt-auto max-w-[38rem] pt-6">
          <div className="mt-5 flex min-h-24 max-w-[34rem] items-center gap-4 rounded-localo-2xl border border-rounded border-white/[0.15] bg-white/5 p-5 backdrop-blur">
            <img
              alt={localoAuthAssets.secureTrusted.alt}
              className="h-11 w-11 shrink-0 object-contain"
              src={localoAuthAssets.secureTrusted.src}
            />
            <p className="text-sm leading-6 text-white/75 xl:text-base">
              <span className="block text-base font-bold text-white">
                Secure & Trusted
              </span>
              Your data is protected with enterprise-grade security.
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 w-full h-full"
          style={{
            backgroundImage: `url(${localoAuthAssets.adminDashboardIllustration.src})`,
            backgroundSize: "400px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom right",
            zIndex: -1,
            opacity: 0.6,
          }}
        ></div>
      </div>
    </aside>
  );
}
