'use client';

import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import {
  Alert,
  Badge,
  Button,
  Dialog,
  FileInput,
  FormField,
  Icon,
  Input,
} from '@localo/ui';
import { MEDIA_MANAGER_COPY, MEDIA_TAG_CATEGORY_IMAGE } from '../config/media.constants';

interface MediaUploadDialogProps {
  isOpen: boolean;
  isUploading?: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

function fileTitleFromName(name: string) {
  return name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim();
}

export function MediaUploadDialog({
  isOpen,
  isUploading,
  onClose,
  onSubmit
}: MediaUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [altText, setAltText] = useState('');
  const [tags, setTags] = useState(MEDIA_TAG_CATEGORY_IMAGE);
  const [error, setError] = useState<string | null>(null);

  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file]
  );
  const isImagePreview = Boolean(
    file && (file.type.startsWith('image/') || file.type === 'image/svg+xml')
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!isOpen) {
      setFile(null);
      setTitle('');
      setAltText('');
      setTags(MEDIA_TAG_CATEGORY_IMAGE);
      setError(null);
    }
  }, [isOpen]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
    if (selectedFile && !title.trim()) {
      const derivedTitle = fileTitleFromName(selectedFile.name);
      setTitle(derivedTitle);
      setAltText((current) => current || derivedTitle);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please choose a file to upload.');
      return;
    }

    try {
      setError(null);
      const formData = new FormData();
      formData.append('file', file);

      if (title.trim()) {
        formData.append('title', title.trim());
      }

      if (altText.trim()) {
        formData.append('altText', altText.trim());
      }

      const normalizedTags = tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
        .join(',');

      if (normalizedTags) {
        formData.append('tags', normalizedTags);
      }

      await onSubmit(formData);
      onClose();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Unable to upload media.');
    }
  };

  return (
    <Dialog
      description="Upload reusable media. Tag category artwork as category-image so the category form can find it later."
      footer={
        <>
          <Button disabled={isUploading} onClick={onClose} type="button" variant="ghost">
            Cancel
          </Button>
          <Button
            isLoading={isUploading}
            loadingLabel="Uploading..."
            onClick={handleSubmit}
            type="button"
            variant="primary"
          >
            Upload
          </Button>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Media"
    >
      <div className="space-y-5">
        {error ? <Alert description={error} title="Upload failed" variant="danger" /> : null}

        <FormField description={MEDIA_MANAGER_COPY.uploadHelper} htmlFor="media-upload-file" label="Media file" required>
          <FileInput
            accept="image/*,.svg,.pdf,.txt,.doc,.docx"
            id="media-upload-file"
            disabled={isUploading}
            onChange={handleFileChange}
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField htmlFor="media-upload-title" label="Title">
            <Input
              disabled={isUploading}
              id="media-upload-title"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </FormField>
          <FormField htmlFor="media-upload-alt-text" label="Alt text">
            <Input
              disabled={isUploading}
              id="media-upload-alt-text"
              onChange={(event) => setAltText(event.target.value)}
              value={altText}
            />
          </FormField>
        </div>

        <FormField
          description="Comma-separated tags. Use category-image for category visuals."
          htmlFor="media-upload-tags"
          label="Tags"
        >
          <Input
            id="media-upload-tags"
            disabled={isUploading}
            onChange={(event) => setTags(event.target.value)}
            value={tags}
          />
        </FormField>

        <div className="rounded-localo-2xl border border-localo-border bg-localo-surface-muted p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-localo-text">Preview</p>
              <p className="text-sm text-localo-text-muted">
                {file ? `${file.name} • ${Math.round(file.size / 1024)} KB` : 'Select a file to preview'}
              </p>
            </div>
            <Badge variant="outline">{MEDIA_TAG_CATEGORY_IMAGE}</Badge>
          </div>

          <div className="mt-4 aspect-[16/9] overflow-hidden rounded-localo-xl border border-localo-border bg-localo-surface">
            {previewUrl && isImagePreview ? (
              <img alt={title || altText || 'Media preview'} className="h-full w-full object-contain" src={previewUrl} />
            ) : (
              <div className="flex h-full items-center justify-center text-localo-text-muted">
                <Icon name={file ? 'note' : 'image'} size="lg" tone="muted" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
