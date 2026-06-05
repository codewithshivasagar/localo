import { AdminShopDetailTemplate } from '../../../../features/shops';

interface AdminShopDetailPageProps {
  params: {
    shopId: string;
  };
}

export default function AdminShopDetailPage({ params }: AdminShopDetailPageProps) {
  return <AdminShopDetailTemplate shopId={params.shopId} />;
}
