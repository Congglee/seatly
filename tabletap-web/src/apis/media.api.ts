import http from "@/lib/http";
import { type UploadImageResType } from "@/schemas/media.schema";

export const mediaApiRequest = {
  uploadImage: (formData: FormData) =>
    http.post<UploadImageResType>("/media/upload", formData),
};
