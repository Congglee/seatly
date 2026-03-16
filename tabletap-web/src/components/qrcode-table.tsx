"use client";

import { getTableLink } from "@/lib/utils/table-link";
import QRCode from "qrcode";
import { useEffect, useRef } from "react";

interface QRCodeTableProps {
  token: string;
  tableNumber: number;
  width?: number;
}

export default function QRCodeTable({
  token,
  tableNumber,
  width = 250,
}: QRCodeTableProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.height = width;
    canvas.width = width;

    const canvasContext = canvas.getContext("2d")!;
    canvasContext.fillStyle = "#fff";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    const virtualCanvas = document.createElement("canvas");

    QRCode.toCanvas(
      virtualCanvas,
      getTableLink({ token, tableNumber }),
      { width, margin: 4 },
      function (error: any) {
        if (error) console.error(error);
        canvasContext.drawImage(virtualCanvas, 0, 0, width, width);
      }
    );
  }, [token, tableNumber, width]);

  return (
    <div className="inline-flex flex-col items-center gap-1.5">
      <div className="rounded-md overflow-hidden border border-border/50 bg-white p-0.5">
        <canvas
          ref={canvasRef}
          style={{ width, height: width }}
          className="block rounded-sm"
        />
      </div>
      <div className="flex flex-col items-center gap-0.5 text-center">
        <span className="text-xs font-medium leading-tight">
          Table {tableNumber}
        </span>
        <span className="text-[10px] leading-tight text-muted-foreground">
          Scan QR code to order
        </span>
      </div>
    </div>
  );
}
