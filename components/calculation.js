export function getP50weight(height,sex) {
  return height-100;
}
export function adjustedWeight(weight, height) {
  return getP50weight(height)+0.35*(weight-getP50weight(height));
}

export const calculateWeight = (w, h, s) => {
  if (h > 0) {
    if (w > 0) {
      if (w > 1.2 * getP50weight(h, s)) {
        console.log("overweight");
        let TBW = w;
        let IBW = getP50weight(h, s);
        let ABW = adjustedWeight(w, h);
        console.log(TBW, IBW, ABW);
        return [TBW, IBW, ABW];
      } else {
        console.log("normal weight");
        return w;
      }
    } else {
      return getP50weight(h, s);
    }
  } else {
    return w;
  }
};