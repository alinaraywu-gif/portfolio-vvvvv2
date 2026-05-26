const baseUrl = import.meta.env.BASE_URL || "/";

export function assetPath(path: string) {
  if (/^(?:https?:|data:|blob:|#)/.test(path)) {
    return path;
  }

  return `${baseUrl}${path.replace(/^\/+/, "")}`;
}

export function appPath(path: string) {
  if (/^(?:https?:|data:|blob:|#)/.test(path)) {
    return path;
  }

  return `${baseUrl}${path.replace(/^\/+/, "")}`;
}

export function stripBasePath(pathname: string) {
  const basePath = baseUrl === "/" ? "" : `/${baseUrl.replace(/^\/+|\/+$/g, "")}`;

  if (!basePath) {
    return pathname;
  }

  if (pathname === basePath) {
    return "/";
  }

  return pathname.startsWith(`${basePath}/`) ? pathname.slice(basePath.length) : pathname;
}
