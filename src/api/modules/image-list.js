import service from "@/api";

export function getImageList(id, page = 1) {
  return service.get(`/admin/image_class/${id}/image/${page}`);
}

export function updateImage(id, name) {
  return service.post(`/admin/image/${id}`, { name });
}

export function deleteImage(ids) {
  return service.post(`/admin/image/delete_all`, { ids });
}
