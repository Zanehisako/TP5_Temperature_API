const generateRandomTemperatures = (size) => {
  const temperatures = [];

  for (let i = 0; i < size; i++) {
    const isCelsius = Math.random() < 0.5;
    const metrique = isCelsius ? "celsius" : "fahrenheit";

    // Temperature range: 
    // Celsius: -10 to 40
    // Fahrenheit: 14 to 104
    const temperature = isCelsius
      ? (Math.random() * 50 - 10).toFixed(1)
      : (Math.random() * 90 + 14).toFixed(1);

    const heure = Number(`${String(Math.floor(Math.random() * 24)).padStart(2, '0')}`);

    temperatures.push({
      index: i,
      temperature: parseFloat(temperature),
      heure,
      metrique
    });
  }

  return temperatures;
}

const tempratureData = generateRandomTemperatures(Math.random() * 100);

const isAM = (heure) => {
  if (heure.toLocaleLowerCase().includes("am") || heure.toLocaleLowerCase().includes("pm")) {
    return true;
  }
  return false;
}
const AMto24 = (heure) => {
  if (heure.toLocaleLowerCase().includes("pm")) {
    return Number(heure) + 12;
  } else {
    return Number(heure);
  }
}

const isHeureValide = (heure) => {
  if (isAM(heure)) {
    heure = AMto24(heure.replace(/(0*\d+)([a-zA-Z]*)/, '$1'));
    if (heure <= 24 && heure >= 1) {
      return true;
    } else {
      return false;
    }
  }
  else if (heure <= 24 && heure >= 1) {
    return true;
  }
  else {
    return false;
  }
}

const getSingleTemp = (heure) => {
  if (isHeureValide(heure)) {
    switch (isAM(heure)) {
      case true:
        heure = AMto24(heure.replace(/(0*\d+)([a-zA-Z]*)/, '$1'));
        let d0 = new Date();
        return {
          "heure_actuelle": d0.getHours(),
          "index": tempratureData.filter((t) => t.heure == heure).map((temp) => temp.index),
          "temperature": tempratureData.filter((t) => t.heure == heure).map((temp) => temp.temperature),
          "metrique": tempratureData.filter((t) => t.heure == heure).map((temp) => temp.metrique),
        };

      case false:
        let d1 = new Date();
        console.log(heure)
        return {
          "heure_actuelle": d1.getHours(),
          "index": tempratureData.filter((t) => t.heure == heure).map((temp) => temp.index),
          "temperature": tempratureData.filter((t) => t.heure == heure).map((temp) => temp.temperature),
          "metrique": tempratureData.filter((t) => t.heure == heure).map((temp) => temp.metrique),
        };
      default:
        break;
    }
  } else {
    return { "message": "heure n'pas valide" }
  }
  return { "message": "il ya pas un temperature avec cette heure" }
}

const avgTemp = (metric) => {
  let somme = 0
  for (let index = 0; index < tempratureData.length; index++) {
    const element = tempratureData.at(index);
    if (metric == "C") {
      element.metrique == "celsius" ? somme += element.temperature : somme += ((element.temperature - 32) / 1.8)
    } else if (metric == "F") {
      element.metrique == "fahrenheit" ? somme += element.temperature : somme += (element.temperature * 1.8 + 32)
    }
  }
  return {
    "metrique": metric, "avgTemp": somme / tempratureData.length
  }

}

const getTempData = (from = 0, to = tempratureData.length - 1, avg = false, metric = 'C') => {
  if (avg == "true") {
    return avgTemp(metric)
  } else {
    return tempratureData.slice(from, to)
  }
}

module.exports = { getTempData, isAM, isHeureValide, getSingleTemp, AMto24 }

