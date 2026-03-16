import AccountActions from "@/app/manage/accounts/_components/account-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Role } from "@/constants/type";
import { formatDateTimeToLocaleString } from "@/lib/utils/date";
import { cn } from "@/lib/utils";
import { type AccountListResType } from "@/schemas/account.schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ShieldCheck, UserCog } from "lucide-react";

type AccountItem = AccountListResType["data"]["items"][number];

const roleConfig = {
  [Role.Owner]: {
    label: "Owner",
    icon: ShieldCheck,
    className:
      "border-sky-500/25 bg-sky-500/15 text-sky-700 hover:bg-sky-500/20 dark:border-sky-400/20 dark:text-sky-400",
  },
  [Role.Employee]: {
    label: "Employee",
    icon: UserCog,
    className:
      "border-amber-500/25 bg-amber-500/15 text-amber-700 hover:bg-amber-500/20 dark:border-amber-400/20 dark:text-amber-400",
  },
} as const;

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((item) => item.charAt(0).toUpperCase())
    .join("");

export const columns: ColumnDef<AccountItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Account
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-10 border border-border/60">
          <AvatarImage src={row.original.avatar ?? undefined} />
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <div className="space-y-0.5">
          <p className="font-medium leading-none">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">ID: {row.original.id}</p>
        </div>
      </div>
    ),
    filterFn: (row, _id, value) => {
      const keyword = String(value ?? "").toLowerCase();
      const target = `${row.original.name} ${row.original.email} ${row.original.id}`.toLowerCase();
      return target.includes(keyword);
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Role
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const config = roleConfig[row.original.role];
      const Icon = config.icon;

      return (
        <Badge
          variant="outline"
          className={cn(
            "gap-1.5 px-2 py-0.5 font-medium transition-colors",
            config.className
          )}
        >
          <Icon className="size-3.5" />
          {config.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDateTimeToLocaleString(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <AccountActions accountId={row.original.id} />,
  },
];
