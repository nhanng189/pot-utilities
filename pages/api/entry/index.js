import fs from "fs";

import DB from "../../../utils/db";
import Helpers from "../../../utils/Helpers";

export default async (req, res) => {
  try {
    const base64Data = req.body.file.replace(/^data:image\/png;base64,/, "");
    await fs.writeFileSync("image.png", base64Data, { encoding: "base64" });
    let downloadURI = "";
    try {
      const result = await DB.bucket.upload(process.cwd() + "/image.png", {
        destination: `${new Date().toISOString()}.png`,
        predefinedAcl: "publicRead",
      });
      downloadURI =
        `https://storage.googleapis.com/` + DB.bucket.name + `/` + result[0].id;
      await fs.unlinkSync(process.cwd() + "/image.png");
    } catch (err) {
      console.log("ERROR:", err);
    }

    const code = Helpers.generateObjectId();
    const { url, title, description } = req.body;
    await DB.db.collection("urlShortener").doc(code).set({
      url,
      title,
      description,
      image: downloadURI,
      code,
      access: 0,
      created: new Date().toISOString(),
    });
    res.status(200).json({ code });
  } catch (e) {
    res.status(400).end();
  }
};
