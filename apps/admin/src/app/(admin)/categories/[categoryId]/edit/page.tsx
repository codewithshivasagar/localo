import { CategoryFormTemplate } from '../../../../../features/categories';

interface EditCategoryPageProps {
  params: {
    categoryId: string;
  };
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  return <CategoryFormTemplate categoryId={params.categoryId} isEditMode />;
}

