export function getRoleAccess(role) {
  const map = {
    PATIENT: ["PATIENT"],
    CLINICIAN: ["CLINICIAN", "PATIENT"],
    ADMIN: ["ADMIN", "CLINICIAN", "PATIENT"]
  };

  return map[role] || ["PATIENT"];
}

export function ensureSecureSession(sessionToken) {
  if (!sessionToken || sessionToken.length < 32) {
    throw new Error("Invalid session token");
  }
  return true;
}
