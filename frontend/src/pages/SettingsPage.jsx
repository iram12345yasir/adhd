export function isPermitted(userRole, requiredRole) {
  const levels = {
    PATIENT: 1,
    CLINICIAN: 2,
    ADMIN: 3
  };

  const userLevel = levels[userRole] || 0;
  const requiredLevel = levels[requiredRole] || 0;

  return userLevel >= requiredLevel;
}

export function buildPortalProfile(user) {
  return {
    id: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    access: user.role === "ADMIN" ? ["ADMIN", "CLINICIAN", "PATIENT"] : user.role === "CLINICIAN" ? ["CLINICIAN", "PATIENT"] : ["PATIENT"]
  };
}
