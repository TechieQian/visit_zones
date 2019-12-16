import zones from "../data/zones";

const calcZone = function(val) {
  if (val.length !== 5) {
    return;
  }
  if (zones.get(1).has(+val)) {
    return {
      zone: 1,
      ac: 65,
      ab: 85
    };
  }
  else if (zones.get(2).has(+val)) {
    return {
      zone: 2,
      ac: 75,
      ab: 95
    };
  }
  else if (zones.get(3).has(+val)) {
    return {
      zone: 3,
      ac: 85,
      ab: 105
    };
  }
  else return;
};

export default calcZone;
