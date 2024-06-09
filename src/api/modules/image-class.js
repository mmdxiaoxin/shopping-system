import service from "@/api";

export function getImageClassList(page) {
  return service.get("/admin/image_class/" + page);
}
