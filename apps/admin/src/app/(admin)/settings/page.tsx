import { PagePlaceholderTemplate } from '../../../templates';

export default function SettingsPage() {
  return (
    <PagePlaceholderTemplate
      description="Reserve platform configuration space for later admin settings once auth and business modules are wired."
      readinessItems={['Admin route ready', 'Settings shell ready', 'Configuration forms pending']}
      title="Settings"
    />
  );
}
