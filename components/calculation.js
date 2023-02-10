import { dataBoy, dataGirl } from "./data";
export function getP50weight(height, sex) {
  let heightFloat = parseFloat(height);
  try {
    if (sex === "Male") {
      let payload = dataBoy[heightFloat];
      if (payload === undefined) {
        return estimateDecimalHeight(heightFloat, dataBoy);
      } else {
        return payload;
      }
    } else if (sex === "Female") {
      let payload = dataGirl[heightFloat];
      if (payload === undefined) {
        return estimateDecimalHeight(heightFloat, dataGirl);
      } else {
        return payload;
      }
    } else if (sex === undefined){} //catch undefined
    else {
      throw "invalidSex";
    }
  } catch (e) {
    console.error(e);
  }
}

export function adjustedWeight(weight, height, sex) {
  let P50weight = getP50weight(height,sex);
  return (P50weight + 0.35*(weight - P50weight));
}

function estimateDecimalHeight(height, data) {
  let ceil = data[Math.ceil(height * 2) / 2];
  let floor = data[Math.floor(height * 2) / 2];
  let dif = height - Math.floor(height * 2) / 2;
  let result = floor + (dif * (ceil - floor)) / 0.5;
  if (isNaN(result)) {
    throw "invalidHeight";
  } else {
    return result;
  }
}

export const calculateWeight = (weight, height, s) => {
  let w = parseFloat(weight);
  let h = parseFloat(height);
  try {
    if (h > 0) {
      if (w > 0) {
        if (w > 1.2 * getP50weight(h, s)) {
          console.log("overweight");
          let TBW = w;
          let IBW = getP50weight(h, s);
          let ABW = adjustedWeight(w, h,s);
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
  } catch (e) {
    console.error(e);
  }
};
