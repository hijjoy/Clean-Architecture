import { API_CONFIG } from "../config/api";

export const getImageUrl = (
  path: string | null,
  size: keyof typeof API_CONFIG.IMAGE_SIZES = "POSTER"
): string | null => {
  if (!path) return null;

  const imageSize = API_CONFIG.IMAGE_SIZES[size];
  return `${API_CONFIG.IMAGE_BASE_URL}/${imageSize}${path}`;
};

export const getFullImageUrl = (path: string | null): string | null => {
  if (!path) return null;
  return `${API_CONFIG.IMAGE_BASE_URL}/original${path}`;
};
