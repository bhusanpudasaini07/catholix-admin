export function isValidLatLng(lat: number, lng: number): boolean {
  const isLatValid = lat >= -90 && lat <= 90;
  const isLngValid = lng >= -180 && lng <= 180;
  return isLatValid && isLngValid;
}
