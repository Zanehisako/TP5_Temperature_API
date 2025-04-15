/* function averageTemp(temps) {
  let result = 0;
  for (let index = 0; index < temps.length; index++) {
    result += temps[index];
  }
  return Math.floor(result / temps.length);
}

function averageTempRange(temps, startIndex = 0, endIndex = temps.length - 1) {
  let result = 0;
  for (let index = startIndex; index < endIndex; index++) {
    result += temps[index];
  }
  return Math.floor(result / temps.length);
} */

const { getTempData, getSingleTemp } = require("./model/temperature.js");
const express = require('express')


const app = express()
app.set("view engine", "ejs")
app.set("views", "./views")

app.listen(3000, () => {
  console.log("Server running on port 3000");
})

app.get("/temperatures/api", (_, res) => {
  res.json({ "metrique": "celsuis", "data": getTempData() });
});

app.get("/temperatures/api/:heure", (req, res) => {
  const { heure } = req.params;
  result = getSingleTemp(heure)
  if (JSON.stringify(result) == `{"message" :"heure n'pas valide"}`) {
    res.status(404).send("heure n'pas valide")
  } else if (JSON.stringify(result) == `{"message" :"il ya pas un temperature avec cette heure"}`) {
    res.status(404).send("il ya pas un temperature avec cette heure")
  }
  res.json(result);
});
app.get("/temperatures", (_, res) => {
  res.render("temperatures", { tableau: getTempData() })
});
