export const ADMIN_SHOPS_DEFAULT_PAGE = 1;
export const ADMIN_SHOPS_DEFAULT_LIMIT = 10;

export const shopStatusOptions = [
  { label: 'All Statuses', value: '' },
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Pending Review', value: 'PENDING_REVIEW' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Paused', value: 'PAUSED' },
  { label: 'Suspended', value: 'SUSPENDED' },
  { label: 'Rejected', value: 'REJECTED' },
  { label: 'Closed', value: 'CLOSED' }
];

export const shopApprovalOptions = [
  { label: 'All Approvals', value: '' },
  { label: 'Unverified', value: 'UNVERIFIED' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Verified', value: 'VERIFIED' },
  { label: 'Rejected', value: 'REJECTED' }
];

export const shopPageSizeOptions = [
  { label: '10 per page', value: '10' },
  { label: '20 per page', value: '20' },
  { label: '50 per page', value: '50' }
];
