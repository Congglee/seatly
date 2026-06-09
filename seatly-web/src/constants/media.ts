export const MAX_DISH_IMAGE_FILES = 1;
export const MAX_IMAGE_FILE_SIZE = 4 * 1024 * 1024;

export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;
export const ALLOWED_IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
] as const;

export const IMAGE_INPUT_ACCEPT = [
  ...ALLOWED_IMAGE_EXTENSIONS,
  ...ALLOWED_IMAGE_MIME_TYPES,
].join(",");
