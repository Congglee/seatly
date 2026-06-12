import SectionHeading from "@/app/(public)/_components/section-heading";
import { LANDING_COMPARISON_ROWS } from "@/constants/landing-content";
import { Check, Minus } from "lucide-react";

export default function Comparison() {
  return (
    <section
      aria-labelledby="comparison-heading"
      className="border-b border-border/60 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="comparison-heading"
          eyebrow="Định vị sản phẩm"
          title="Seatly vs hệ thống quản lý lớn — chọn đúng công cụ cho quy mô của bạn"
          description="Không phải quán nào cũng cần ERP. Seatly giải quyết tốt một quy trình cụ thể: gọi món và phục vụ tại bàn."
        />

        <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">
              So sánh Seatly với hệ thống POS hoặc FnB suite lớn
            </caption>
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th scope="col" className="px-4 py-3 font-semibold">
                  Tiêu chí
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-primary"
                >
                  Seatly
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-muted-foreground"
                >
                  POS / FnB suite lớn
                </th>
              </tr>
            </thead>
            <tbody>
              {LANDING_COMPARISON_ROWS.map((row) => (
                <tr
                  key={row.criteria}
                  className="border-b border-border last:border-0"
                >
                  <th
                    scope="row"
                    className="px-4 py-4 align-top font-medium text-foreground"
                  >
                    {row.criteria}
                  </th>
                  <td className="px-4 py-4 align-top">
                    <div className="flex gap-2">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{row.seatly}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top text-muted-foreground">
                    <div className="flex gap-2">
                      <Minus
                        className="mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{row.legacy}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
