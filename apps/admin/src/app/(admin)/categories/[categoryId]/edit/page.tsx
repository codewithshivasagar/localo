import { CategoryFormTemplate } from '../../../../../features/categories';

interface EditCategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { categoryId } = await params;

  return <CategoryFormTemplate categoryId={categoryId} isEditMode />;
}
