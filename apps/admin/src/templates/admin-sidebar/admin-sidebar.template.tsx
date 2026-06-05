'use client';

import { usePathname } from 'next/navigation';
import {
  Badge,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarLink,
  cn
} from '@localo/ui';
import { adminAppConfig, adminNavigationItems } from '../../config';

function isActiveRoute(pathname: string, href: string) {
  return pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));
}

export function AdminSidebarTemplate() {
  const pathname = usePathname();

  return (
    <Sidebar className="!bg-localo-panel !text-white shadow-2xl shadow-slate-950/20">
      <SidebarHeader className="min-h-20 px-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-localo-2xl bg-localo-primary text-sm font-black text-localo-primary-foreground shadow-localo-md shadow-localo-primary/30">
          L
        </div>
        <div className="min-w-0">
          <p className="truncate text-xl font-black tracking-tight text-white">{adminAppConfig.brand.name}</p>
          <p className="truncate text-xs font-semibold text-localo-primary">{adminAppConfig.brand.tagline}</p>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-5">
        <SidebarGroup className="[&_p]:!text-white/45" title="Admin">
          {adminNavigationItems.map((item) => {
            const isActive = isActiveRoute(pathname, item.href);

            return (
              <SidebarItem key={item.href}>
                <SidebarLink
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group min-h-12 rounded-localo-xl px-3 !text-white/75 hover:!bg-white/[0.08] hover:!text-white',
                    isActive && '!bg-localo-primary/15 !text-localo-primary shadow-localo-sm ring-1 ring-localo-primary/25 hover:!bg-localo-primary/15 hover:!text-localo-primary'
                  )}
                  href={item.href}
                  title={item.description}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-localo-lg !bg-white/[0.08] text-[11px] font-black !text-white/55',
                      isActive && '!bg-localo-primary !text-localo-primary-foreground'
                    )}
                  >
                    {item.shortLabel}
                  </span>
                  <span className="truncate">{item.label}</span>
                </SidebarLink>
              </SidebarItem>
            );
          })}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="rounded-localo-2xl border border-white/10 bg-white/5 p-4">
          <Badge className="w-fit" variant="success">
            Admin
          </Badge>
          <p className="mt-3 text-sm font-bold text-white">Localo Admin</p>
          <p className="text-xs leading-5 text-white/55">Super Admin workspace</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
