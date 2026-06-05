'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { CategoryResponse } from '@localo/api-client';
import {
  Badge,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  EmptyState,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@localo/ui';
import { adminCategoryRoutes } from '../config';

interface CategoriesTableProps {
  categories: CategoryResponse[];
  hasActiveFilters: boolean;
  isRefreshing: boolean;
}

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
});

function formatDate(value?: string | null): string {
  if (!value) {
    return 'Not set';
  }

  return dateFormatter.format(new Date(value));
}

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function statusVariant(isActive: boolean) {
  return isActive ? 'success' : 'muted';
}

function resolveCategoryVisual(category: CategoryResponse) {
  const visualUrl = category.iconMedia?.publicUrl ?? category.imageMedia?.publicUrl ?? null;
  const visualAlt = category.iconMedia?.altText ?? category.imageMedia?.altText ?? category.name;

  return visualUrl ? { visualAlt, visualUrl } : null;
}

export function CategoriesTable({ categories, hasActiveFilters, isRefreshing }: CategoriesTableProps) {
  const [openMenuCategoryId, setOpenMenuCategoryId] = useState<string | null>(null);

  if (categories.length === 0) {
    return (
      <Card>
        <EmptyState
          action={null}
          description={
            hasActiveFilters
              ? 'Try clearing the search, status, or hierarchy filters to see more categories.'
              : 'Create the first category once the admin category flow is ready.'
          }
          title={hasActiveFilters ? 'No categories match these filters' : 'No categories yet'}
        />
      </Card>
    );
  }

  return (
    <Card className="overflow-visible" padded={false}>
      <div className="flex flex-col gap-2 border-b border-localo-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-black text-localo-text">All Categories</h2>
          <p className="text-sm text-localo-text-muted">Manage category hierarchy, visibility, and display order.</p>
        </div>
        {isRefreshing ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-localo-primary">
            <Icon name="refresh" size="sm" tone="primary" />
            Refreshing
          </div>
        ) : null}
      </div>
      <TableContainer className="rounded-none border-0 shadow-none">
        <Table className="min-w-[68rem]">
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Visual</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sort Order</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => {
              const isRoot = !category.parentId;
              const visual = resolveCategoryVisual(category);

              return (
                <TableRow className="hover:bg-localo-surface-muted/60" key={category.id}>
                  <TableCell>
                    <Link className="block min-w-56 text-left" href={adminCategoryRoutes.edit(category.id)}>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-localo-xl border border-localo-border bg-localo-surface-muted">
                          {visual ? (
                            <img alt={visual.visualAlt} className="h-full w-full object-cover" src={visual.visualUrl} />
                          ) : (
                            <Icon name="categories" size="sm" tone="primary" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-localo-text">{category.name}</p>
                          <p className="truncate text-xs text-localo-text-muted">
                            {category.description ?? 'No description added'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {visual ? (
                        <span className="inline-flex h-10 w-10 overflow-hidden rounded-localo-lg border border-localo-border bg-localo-surface">
                          <img alt={visual.visualAlt} className="h-full w-full object-cover" src={visual.visualUrl} />
                        </span>
                      ) : (
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-localo-lg border border-localo-border bg-localo-surface-muted">
                          <Icon name="categories" size="sm" tone="primary" />
                        </span>
                      )}
                      <span className="text-xs font-semibold text-localo-text-muted">
                        {visual ? 'Backend visual' : 'Fallback icon'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-localo-text-muted">{category.slug}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-localo-text-muted">
                      {category.parent?.name ?? 'Root category'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={isRoot ? 'primary' : 'secondary'}>{isRoot ? 'Root' : 'Subcategory'}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(category.isActive)}>
                      {formatLabel(category.isActive ? 'ACTIVE' : 'INACTIVE')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-localo-text">{category.sortOrder}</span>
                  </TableCell>
                  <TableCell>{formatDate(category.updatedAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        aria-label={`View ${category.name}`}
                        className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-localo-lg border border-localo-border bg-localo-surface text-localo-text-muted shadow-sm transition hover:border-localo-primary hover:text-localo-primary"
                        href={adminCategoryRoutes.edit(category.id)}
                      >
                        <Icon name="eye" size="sm" tone="current" />
                      </Link>
                      <Link
                        aria-label={`Edit ${category.name}`}
                        className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-localo-lg border border-localo-border bg-localo-surface text-localo-text-muted shadow-sm transition hover:border-localo-primary hover:text-localo-primary"
                        href={adminCategoryRoutes.edit(category.id)}
                      >
                        <Icon name="edit" size="sm" tone="current" />
                      </Link>
                      <Dropdown>
                        <DropdownTrigger
                          aria-label={`More actions for ${category.name}`}
                          className="min-h-10 min-w-10 px-0"
                          onClick={() =>
                            setOpenMenuCategoryId((currentId) =>
                              currentId === category.id ? null : category.id
                            )
                          }
                          type="button"
                        >
                          <Icon name="moreHorizontal" size="sm" tone="current" />
                        </DropdownTrigger>
                        {openMenuCategoryId === category.id ? (
                          <DropdownMenu>
                            <DropdownItem disabled type="button">
                              Delete coming soon
                            </DropdownItem>
                          </DropdownMenu>
                        ) : null}
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
