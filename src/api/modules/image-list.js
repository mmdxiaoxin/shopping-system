import service from "@/api";

export function getImageList(id, page = 1) {
  return service.get(`/admin/image_class/${id}/image/${page}`);
}
