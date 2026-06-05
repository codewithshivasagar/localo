"use client";

import Link from "next/link";
import {
  Button,
  ErrorState,
  Icon,
  LoadingState,
  PageContainer,
  PageHeader,
} from "@localo/ui";
import { Breadcrumbs, Card } from "@localo/ui";
import { AdminRoutes } from "../../../config";
import { adminCategoryRoutes } from "../config";
import { useAdminCategoriesList } from "../hooks";
import { CategoryFilterToolbar } from "../blocks/category-filter-toolbar";
import { CategoryGuidelinesCard } from "../blocks/category-guidelines-card";
import { CategoryStructureCard } from "../blocks/category-structure-card";
import { CategorySummaryCards } from "../blocks/category-summary-cards";
import { CategoriesTable } from "../blocks/categories-table";

export function CategoriesListTemplate() {
  const {
    categories,
    error,
    filters,
    hasActiveFilters,
    isLoading,
    isRefreshing,
    metrics,
    pagination,
    refresh,
    resetFilters,
    updateFilter,
  } = useAdminCategoriesList();

  return (
    <PageContainer className="space-y-6">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: AdminRoutes.Dashboard },
            { label: "Categories", current: true },
          ]}
        />
        <PageHeader
          actions={
            <Link
              className="inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-localo-lg bg-localo-primary px-5 text-sm font-bold text-localo-primary-foreground shadow-localo-md shadow-localo-primary/20 transition hover:bg-localo-primary/90 focus:outline-none focus:ring-2 focus:ring-localo-primary/30"
              href={adminCategoryRoutes.create}
            >
              <Icon name="plus" size="sm" tone="current" />
              Create Category
            </Link>
          }
          description="Organize the Localo catalog by managing category hierarchy, visibility, and display order."
          eyebrow="Admin"
          title="Categories"
        />
      </div>

      <CategorySummaryCards metrics={metrics} />

      <div className="grid">
        <div className="min-w-0 space-y-4">
          <CategoryFilterToolbar
            filters={filters}
            hasActiveFilters={hasActiveFilters}
            isRefreshing={isRefreshing}
            onRefresh={refresh}
            onReset={resetFilters}
            onUpdateFilter={updateFilter}
          />

          {isLoading ? (
            <LoadingState
              description="Fetching the latest category records."
              label="Loading categories"
            />
          ) : error ? (
            <ErrorState
              action={
                <Button
                  leftIcon={<Icon name="refresh" size="sm" tone="current" />}
                  onClick={refresh}
                  type="button"
                >
                  Retry
                </Button>
              }
              description={error}
              title="Unable to load categories"
            />
          ) : (
            <>
              <CategoriesTable
                categories={categories}
                hasActiveFilters={hasActiveFilters}
                isRefreshing={isRefreshing}
              />

              {pagination ? (
                <Card className="space-y-2">
                  <p className="text-sm font-bold text-localo-text">
                    Pagination
                  </p>
                  <p className="text-sm leading-6 text-localo-text-muted">
                    {pagination.page} of {pagination.totalPages} pages shown
                    across {pagination.total} categories.
                  </p>
                </Card>
              ) : null}
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
