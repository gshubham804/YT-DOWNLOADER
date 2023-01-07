const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();
app.use(cors());
app.get("/download", async (req, res) => {
  try {
    const url = req.query.url;
    const videoId = await ytdl.getURLVideoID(url);
    const metaInfo = await ytdl.getInfo(url);

    let data = {
      url: "https://www.youtube.com/embed/" + videoId,
      info: metaInfo.formats,
    };
    return res.send(data);
  } catch (error) {
    return res.status(500);
  }
});

app.listen(4000, () => {
  console.log("success");
});

// const bodyParser = require('body-parser');
// const server = express();
// // use middleware
// server.use(cors());
// server.use(bodyParser.json());
// server.post('/demo',(req,res)=>{
//     console.log(req.body);
//     res.json(req.body);
// })

// server.listen(8080,()=>{
//     console.log("success");
// })
