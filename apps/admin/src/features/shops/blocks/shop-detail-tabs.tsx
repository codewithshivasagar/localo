import { TabButton, Tabs, TabsList } from '@localo/ui';

const tabs = ['Overview', 'Products', 'Business Info', 'Media', 'Hours', 'Locations', 'Owner & Team', 'Activity'];

export function ShopDetailTabs() {
  return (
    <Tabs>
      <TabsList className="rounded-none border-b border-localo-border bg-transparent p-0">
        {tabs.map((tab) => (
          <TabButton className="rounded-none border-b-2 border-transparent data-[active=true]:border-localo-primary" data-active={tab === 'Overview'} disabled={tab !== 'Overview'} isActive={tab === 'Overview'} key={tab}>
            {tab}
          </TabButton>
        ))}
      </TabsList>
    </Tabs>
  );
}
