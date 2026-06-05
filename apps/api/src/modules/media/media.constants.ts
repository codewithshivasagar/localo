export const MEDIA_DEFAULT_LIST_PAGE = 1;
export const MEDIA_DEFAULT_LIST_LIMIT = 24;
export const MEDIA_MAX_LIST_LIMIT = 100;
export const MEDIA_MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;

export const MEDIA_ALLOWED_IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml'
]);

export const MEDIA_ALLOWED_DOCUMENT_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
]);

export const MEDIA_ALLOWED_MIME_TYPES = new Set([
  ...MEDIA_ALLOWED_IMAGE_MIME_TYPES,
  ...MEDIA_ALLOWED_DOCUMENT_MIME_TYPES
]);

export const MEDIA_UPLOAD_PUBLIC_PREFIX = '/public/media';
