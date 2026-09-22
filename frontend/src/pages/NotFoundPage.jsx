export const rolePortalMap = {
  PATIENT: "/patient/dashboard",
  CLINICIAN: "/clinician/dashboard",
  ADMIN: "/admin/dashboard"
};

export function getPortalRoute(role) {
  return rolePortalMap[role] || "/patient/dashboard";
}

export function getPortalLabel(role) {
  return rolePortalMap[role] ? role.replace("_", " ") : "PATIENT";
}

export function getNavStages(role) {
  if (role === "ADMIN") return ["Overview", "Users", "Security", "Audit"];
  if (role === "CLINICIAN") return ["Patients", "Reviews", "Insights"];
  return ["Dashboard", "Habits", "Focus", "Profile"];
}
