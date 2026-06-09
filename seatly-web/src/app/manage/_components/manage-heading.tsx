interface ManageHeadingProps {
  heading?: string;
  description?: string;
}

export default function ManageHeading({
  heading = "Dashboard",
  description = "Manage and monitor the system",
}: ManageHeadingProps) {
  return (
    <div className="space-y-1 py-4 border-b">
      <h2 className="text-2xl lg:text-3xl font-medium tracking-tight">
        {heading}
      </h2>
      <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
