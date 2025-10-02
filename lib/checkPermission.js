
import { permissions } from "./permissions";

export function canPerformAction(actorRole, action, targetRole) {
  const allowed = permissions[actorRole]?.[action] || [];
  return allowed.includes(targetRole) || allowed.includes("self");
}
