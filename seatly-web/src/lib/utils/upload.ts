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

  return `${message} Ảnh hiện tại vẫn được giữ nguyên.`;
};

export const validateImageFile = (selectedFile: File) => {
  if (selectedFile.size === 0) {
    return `Ảnh \"${selectedFile.name}\" đang rỗng hoặc không thể đọc.`;
  }

  const extension = getFileExtension(selectedFile.name);

  if (
    !ALLOWED_IMAGE_EXTENSIONS.includes(
      extension as (typeof ALLOWED_IMAGE_EXTENSIONS)[number]
    )
  ) {
    return "Chỉ cho phép ảnh JPG, JPEG, PNG hoặc WEBP.";
  }

  if (
    !ALLOWED_IMAGE_MIME_TYPES.includes(
      selectedFile.type as (typeof ALLOWED_IMAGE_MIME_TYPES)[number]
    )
  ) {
    return "Định dạng ảnh không hợp lệ. Vui lòng chọn tệp JPG, PNG hoặc WEBP.";
  }

  if (selectedFile.size > MAX_IMAGE_FILE_SIZE) {
    return `Ảnh \"${
      selectedFile.name
    }\" vượt quá giới hạn dung lượng. Tối đa ${formatFileSize(
      MAX_IMAGE_FILE_SIZE
    )} cho mỗi ảnh.`;
  }

  return null;
};
