const { getTempData, getSingleTemp } = require("./model/temperature.js");
const express = require('express')


const app = express()
app.set("view engine", "ejs")
app.set("views", "./views")

app.listen(3000, () => {
  console.log("Server running on port 3000");
})

app.use((req, res, next) => {
  if (req.headers.cookie == null) {
    const clientCookie = {
      "clientID": Math.floor(Math.random() * 1e10),
      "expiresAt": Date.now() + 5 * 60 * 100,
    }
    res.setHeader("Set-Cookie", JSON.stringify(clientCookie))
  }
  next()
})

app.get("/temperatures/api", (req, res) => {
  const from = req.query.from
  const to = req.query.to
  const avg = req.query.avg
  const metric = req.query.metric

  res.json({ "ClientID": JSON.parse(req.headers.cookie), "data": getTempData(from, to, avg, metric) });
});

app.get("/temperatures/api/:heure", (req, res) => {
  const { heure } = req.params;
  if (heure == "now") {
    const d = new Date()
    result = getSingleTemp(`${(d.getHours())}`)
  } else {
    result = getSingleTemp(heure)
  }
  if (JSON.stringify(result) == `{"message" :"heure n'pas valide"}`) {
    res.status(404).send("heure n'pas valide")
  } else if (JSON.stringify(result) == `{"message" :"il ya pas un temperature avec cette heure"}`) {
    res.status(404).send("il ya pas un temperature avec cette heure")
  }
  res.json(result);
});

app.get("/temperatures/api/now", (_, res) => {
  const d = new Date()
  console.log("now:", d.getHours())
  //result = getSingleTemp(d.getHours())
  /* if (JSON.stringify(result) == `{"message" :"heure n'pas valide"}`) {
    res.status(404).send("heure n'pas valide")
  } else if (JSON.stringify(result) == `{"message" :"il ya pas un temperature avec cette heure"}`) {
    res.status(404).send("il ya pas un temperature avec cette heure")
  } */
  res.json(d.getHours());
});
app.get("/temperatures", (_, res) => {
  res.render("temperatures", { tableau: getTempData() })
});
