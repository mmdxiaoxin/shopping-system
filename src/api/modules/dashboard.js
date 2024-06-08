import service from "@/api";

export function getStatistics1() {
  return service.get("/admin/statistics1");
}
