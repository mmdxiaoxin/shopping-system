import service from "@/api";

export function getImageClassList(page) {
  return service.get("/admin/image_class/" + page);
}

export function createImageClass(data) {
  return service.post("/admin/image_class", data);
}

export function updateImageClass(id, data) {
  return service.post("/admin/image_class/" + id, data);
}
