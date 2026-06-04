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
    <Sidebar className="border-r border-localo-border bg-localo-surface">
      <SidebarHeader className="min-h-20 px-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-localo-xl bg-localo-primary text-sm font-black text-localo-primary-foreground shadow-localo-sm">
          L
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-black tracking-tight text-localo-text">{adminAppConfig.brand.name}</p>
          <p className="truncate text-xs font-medium text-localo-text-muted">{adminAppConfig.brand.tagline}</p>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-5">
        <SidebarGroup title="Admin">
          {adminNavigationItems.map((item) => {
            const isActive = isActiveRoute(pathname, item.href);

            return (
              <SidebarItem key={item.href}>
                <SidebarLink
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group min-h-12 rounded-localo-lg px-3',
                    isActive && 'bg-localo-primary text-localo-primary-foreground shadow-localo-sm hover:bg-localo-primary hover:text-localo-primary-foreground'
                  )}
                  href={item.href}
                  title={item.description}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-localo-md bg-localo-surface-muted text-[11px] font-black text-localo-text-muted',
                      isActive && 'bg-white/20 text-localo-primary-foreground'
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

      <SidebarFooter className="space-y-3 p-4">
        <Badge className="w-fit" variant="success">
          Shell ready
        </Badge>
        <p className="text-xs leading-5 text-localo-text-muted">
          Auth guards and live admin data arrive in the next phases.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
