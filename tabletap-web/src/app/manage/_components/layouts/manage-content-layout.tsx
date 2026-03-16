import ManageFilters from "@/app/manage/_components/manage-filters";
import ManageHeading from "@/app/manage/_components/manage-heading";
import ManageNav from "@/app/manage/_components/manage-nav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

interface ManageContentLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: { name: string; href: string }[];
  heading?: string;
  description?: string;
  hasManageFilters?: boolean;
}

export default function ManageContentLayout({
  children,
  breadcrumbs = [],
  heading,
  description,
  hasManageFilters = true,
}: ManageContentLayoutProps) {
  return (
    <>
      <ManageNav />
      <div className="py-8 px-4 sm:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => {
              const isLastBreadcrumb =
                breadcrumbs.indexOf(breadcrumb) === breadcrumbs.length - 1;
              return (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={breadcrumb.href as any}>
                        {breadcrumb.name}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {!isLastBreadcrumb && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="space-y-4">
          <ManageHeading heading={heading} description={description} />
          {hasManageFilters && <ManageFilters />}
        </div>

        {children}
      </div>
    </>
  );
}
