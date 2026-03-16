import { IMAGE_INPUT_ACCEPT, MAX_DISH_IMAGE_FILES } from "@/constants/media";
import {
  buildPendingImageUrl,
  formatFileSize,
  validateImageFile,
  withUnchangedImageHint,
} from "@/lib/utils/upload";
import { cn } from "@/lib/utils";
import { ImagePlus, Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface DishImageUploadProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  onFileChange?: (file: File | null) => void;
  altText?: string;
  originalValue?: string;
}

export default function DishImageUpload({
  value,
  onChange,
  onFileChange,
  altText,
  originalValue,
}: DishImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    value || undefined
  );
  const [uploadError, setUploadError] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const hasOriginalImage = Boolean(originalValue);
  const isShowingTemporaryImage = Boolean(file);
  const shouldShowRemoveAction = isShowingTemporaryImage || !hasOriginalImage;
  const removeActionLabel = hasOriginalImage ? "Restore original" : "Remove";

  useEffect(() => {
    if (!value) {
      setFile(null);
      setUploadError(null);
    }
  }, [value]);

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

    if (selectedFiles.length > MAX_DISH_IMAGE_FILES) {
      showUploadError(
        withUnchangedImageHint(
          "Each dish supports only 1 image.",
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

    if (hasOriginalImage) {
      onChange(originalValue);
    } else {
      onChange(undefined);
    }

    onFileChange?.(null);
    resetImageInput();
  };

  return (
    <>
      <div
        className={cn(
          "relative group overflow-hidden rounded-lg border-2 border-dashed transition-all duration-200",
          uploadError
            ? "border-destructive/70 bg-destructive/5"
            : isDragging
            ? "border-primary/70 bg-primary/5"
            : previewUrl
            ? "border-transparent bg-muted/30"
            : "border-border hover:border-muted-foreground/40"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
          handleFilesChange(Array.from(e.dataTransfer.files ?? []));
        }}
      >
        <input
          type="file"
          accept={IMAGE_INPUT_ACCEPT}
          ref={imageInputRef}
          onChange={(e) => {
            handleFilesChange(Array.from(e.target.files ?? []));
          }}
          className="hidden"
        />
        {previewUrl ? (
          <div className="relative h-48">
            <Image
              src={previewUrl}
              alt={altText || "Dish preview"}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-100 transition-all duration-200 sm:bg-black/0 sm:opacity-0 sm:group-hover:bg-black/50 sm:group-hover:opacity-100">
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-md bg-background/90 px-3 py-2 text-xs font-medium text-foreground shadow-md transition-all duration-150 hover:bg-background active:scale-[0.97]"
              >
                <Upload className="h-3.5 w-3.5" />
                Change
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
            className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 px-6 py-8"
          >
            <div className="rounded-full bg-muted p-3 transition-colors duration-200 group-hover:bg-primary/10">
              <ImagePlus className="h-6 w-6 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
            </div>
            <div className="space-y-1 text-center">
              <p className="text-sm font-medium text-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                1 image, JPG, PNG, or WEBP, max 4MB
              </p>
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
    </>
  );
}
