import { PagePlaceholderTemplate } from '../../templates';

export default function CategoriesPage() {
  return (
    <PagePlaceholderTemplate
      description="Prepare category governance space for future create, update, delete, and catalog organization workflows."
      readinessItems={['Admin route ready', 'Category navigation ready', 'Category forms pending']}
      title="Categories"
    />
  );
}
