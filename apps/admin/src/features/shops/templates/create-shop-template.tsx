import { Breadcrumbs, PageContainer, PageHeader } from '@localo/ui';
import { AdminRoutes } from '../../../config';
import { adminShopRoutes } from '../config';
import { CreateShopWizard } from '../blocks';

export function CreateShopTemplate() {
  return (
    <PageContainer className="space-y-6">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: AdminRoutes.Dashboard },
            { label: 'Shops', href: adminShopRoutes.list },
            { label: 'Create Shop', current: true }
          ]}
        />
        <PageHeader
          description="Add a new local business to Localo and prepare it for approval."
          title="Create Shop"
        />
      </div>
      <CreateShopWizard />
    </PageContainer>
  );
}
