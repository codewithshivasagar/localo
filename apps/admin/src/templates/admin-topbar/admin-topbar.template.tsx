import { Badge, Button, Topbar } from '@localo/ui';
import { adminAppConfig } from '../../config';

export function AdminTopbarTemplate() {
  return (
    <Topbar
      actions={
        <>
          <Badge variant="outline">UI-6</Badge>
          <Button size="sm" variant="outline">
            Account
          </Button>
        </>
      }
      className="bg-localo-surface/90"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-localo-primary">Admin Console</p>
        <p className="text-sm font-semibold text-localo-text">{adminAppConfig.brand.tagline}</p>
      </div>
    </Topbar>
  );
}
