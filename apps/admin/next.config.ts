import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@localo/api-client",
    "@localo/assets",
    "@localo/shared-types",
    "@localo/ui",
    "@localo/theme",
    "@localo/types",
    "@localo/constants",
    "@localo/domain",
    "@localo/services",
    "@localo/utils",
    "@localo/validation",
    "@localo/permissions",
    "@localo/supabase"
  ]
};

export default nextConfig;
