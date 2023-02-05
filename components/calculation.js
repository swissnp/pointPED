export function getP50weight(height,sex) {
  return height-100;
}
export function adjustedWeight(weight, height) {
  return getP50weight(height)+0.35*(weight-getP50weight(height));
}