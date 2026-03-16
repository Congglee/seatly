import { mediaApiRequest } from "@/apis/media.api";
import { useMutation } from "@tanstack/react-query";

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: mediaApiRequest.uploadImage,
  });
};
