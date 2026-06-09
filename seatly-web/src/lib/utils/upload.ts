import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_FILE_SIZE,
} from "@/constants/media";
import envConfig from "@/config/environment";

export const formatFileSize = (size: number) => {
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export const getFileExtension = (fileName: string) => {
  const extensionIndex = fileName.lastIndexOf(".");

  if (extensionIndex === -1) {
    return "";
  }

  return fileName.slice(extensionIndex).toLowerCase();
};

export const buildPendingImageUrl = (fileName: string) => {
  return new URL(fileName, `${envConfig.NEXT_PUBLIC_URL}/`).toString();
};

export const withUnchangedImageHint = (
  message: string,
  hasCurrentImage: boolean
) => {
  if (!hasCurrentImage) {
    return message;
  }

  return `${message} The current image remains unchanged.`;
};

export const validateImageFile = (selectedFile: File) => {
  if (selectedFile.size === 0) {
    return `Image \"${selectedFile.name}\" is empty or cannot be read.`;
  }

  const extension = getFileExtension(selectedFile.name);

  if (
    !ALLOWED_IMAGE_EXTENSIONS.includes(
      extension as (typeof ALLOWED_IMAGE_EXTENSIONS)[number]
    )
  ) {
    return "Only JPG, JPEG, PNG, or WEBP images are allowed.";
  }

  if (
    !ALLOWED_IMAGE_MIME_TYPES.includes(
      selectedFile.type as (typeof ALLOWED_IMAGE_MIME_TYPES)[number]
    )
  ) {
    return "Invalid image format. Please choose a JPG, PNG, or WEBP file.";
  }

  if (selectedFile.size > MAX_IMAGE_FILE_SIZE) {
    return `Image \"${
      selectedFile.name
    }\" exceeds the size limit. Maximum ${formatFileSize(
      MAX_IMAGE_FILE_SIZE
    )} per image.`;
  }

  return null;
};
