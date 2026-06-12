"use client";

import { IMAGE_INPUT_ACCEPT, MAX_AVATAR_IMAGE_FILES } from "@/constants/media";
import {
  buildPendingImageUrl,
  formatFileSize,
  validateImageFile,
  withUnchangedImageHint,
} from "@/lib/utils/upload";
import { cn } from "@/lib/utils";
import { ImagePlus, Upload, UserRound, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

interface AccountAvatarUploadProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  onFileChange?: (file: File | null) => void;
  originalValue?: string;
  fallbackText?: string;
}

const getInitials = (value?: string) => {
  if (!value) {
    return "AV";
  }

  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((item) => item.charAt(0).toUpperCase())
    .join("");
};

export default function AccountAvatarUpload({
  value,
  onChange,
  onFileChange,
  originalValue,
  fallbackText,
}: AccountAvatarUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    value || undefined
  );
  const [uploadError, setUploadError] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const hasOriginalImage = Boolean(originalValue);
  const isShowingTemporaryImage = Boolean(file);
  const shouldShowRemoveAction = Boolean(previewUrl);
  const removeActionLabel =
    isShowingTemporaryImage && hasOriginalImage ? "Khôi phục ảnh cũ" : "Xóa";
  const initials = useMemo(() => getInitials(fallbackText), [fallbackText]);

  useEffect(() => {
    if (!value) {
      setFile(null);
      setUploadError(null);
    }
  }, [value]);

  useEffect(() => {
    if (!file) {
      return;
    }

    const pendingValue = buildPendingImageUrl(file.name);

    if (value !== pendingValue) {
      setFile(null);
    }
  }, [file, value]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(value || undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file, value]);

  const resetImageInput = () => {
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const showUploadError = (message: string) => {
    setUploadError(message);
    toast.error(message, { duration: 5000 });
  };

  const handleFileSelect = (selectedFile: File) => {
    setUploadError(null);
    setFile(selectedFile);
    onChange(buildPendingImageUrl(selectedFile.name));
    onFileChange?.(selectedFile);
    resetImageInput();
  };

  const handleFilesChange = (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) {
      return;
    }

    if (selectedFiles.length > MAX_AVATAR_IMAGE_FILES) {
      showUploadError(
        withUnchangedImageHint(
          "Mỗi tài khoản chỉ hỗ trợ 1 ảnh đại diện.",
          Boolean(previewUrl)
        )
      );
      resetImageInput();
      return;
    }

    const [selectedFile] = selectedFiles;
    const validationError = validateImageFile(selectedFile);

    if (validationError) {
      showUploadError(
        withUnchangedImageHint(validationError, Boolean(previewUrl))
      );
      resetImageInput();
      return;
    }

    handleFileSelect(selectedFile);
  };

  const handleRemoveImage = () => {
    setFile(null);
    setUploadError(null);

    if (isShowingTemporaryImage && hasOriginalImage) {
      onChange(originalValue);
    } else {
      onChange(undefined);
    }

    onFileChange?.(null);
    resetImageInput();
  };

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "group relative flex flex-col items-center overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-200",
          uploadError
            ? "border-destructive/70 bg-destructive/5"
            : isDragging
            ? "border-primary/70 bg-primary/5"
            : previewUrl
            ? "border-border/60 bg-muted/20"
            : "border-border bg-muted/10 hover:border-muted-foreground/40"
        )}
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsDragging(false);
          handleFilesChange(Array.from(event.dataTransfer.files ?? []));
        }}
      >
        <input
          type="file"
          accept={IMAGE_INPUT_ACCEPT}
          ref={imageInputRef}
          onChange={(event) => {
            handleFilesChange(Array.from(event.target.files ?? []));
          }}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative mx-auto aspect-square w-full max-w-64 overflow-hidden rounded-[18px] bg-muted">
            <Image
              src={previewUrl}
              alt="Xem trước ảnh đại diện"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-100 transition-all duration-200 sm:bg-black/0 sm:opacity-0 sm:group-hover:bg-black/45 sm:group-hover:opacity-100">
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-md bg-background/90 px-3 py-2 text-xs font-medium text-foreground shadow-md transition-all duration-150 hover:bg-background active:scale-[0.97]"
              >
                <Upload className="h-3.5 w-3.5" />
                Đổi ảnh
              </button>
              {shouldShowRemoveAction ? (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="flex items-center gap-1.5 rounded-md bg-background/90 px-3 py-2 text-xs font-medium text-destructive shadow-md transition-all duration-150 hover:bg-background active:scale-[0.97]"
                >
                  <X className="h-3.5 w-3.5" />
                  {removeActionLabel}
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="mx-auto flex w-full max-w-64 cursor-pointer flex-col items-center justify-center gap-3 rounded-[18px] px-6 py-8 text-center"
          >
            <div className="flex size-24 items-center justify-center rounded-2xl bg-background shadow-sm">
              <div className="flex size-20 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                {fallbackText ? (
                  <span className="text-2xl font-semibold tracking-tight">
                    {initials}
                  </span>
                ) : (
                  <UserRound className="size-10" />
                )}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Tải ảnh đại diện lên
              </p>
              <p className="text-xs text-muted-foreground">
                Bấm để chọn hoặc kéo thả 1 ảnh JPG, PNG hoặc WEBP, tối đa 4MB
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <ImagePlus className="size-3.5" />
              Chọn ảnh
            </div>
          </button>
        )}
      </div>

      {uploadError ? (
        <p className="text-xs font-medium text-destructive" role="alert">
          {uploadError}
        </p>
      ) : null}

      {file ? (
        <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2">
          <ImagePlus className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate text-xs text-muted-foreground">
            {file.name}
          </span>
          <span className="ml-auto shrink-0 text-xs tabular-nums text-muted-foreground">
            {formatFileSize(file.size)}
          </span>
        </div>
      ) : null}
    </div>
  );
}
