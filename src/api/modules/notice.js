import service from "@/api";

export function getNoticeList(page) {
  return service.get(`/admin/notice/${page}`);
}

export function createNotice(data) {
  return service.post("/admin/notice", data);
}

export function updateNotice(id, data) {
  return service.post("/admin/notice/" + id, data);
}

export function deleteNotice(id) {
  return service.post(`/admin/notice/${id}/delete`);
}
