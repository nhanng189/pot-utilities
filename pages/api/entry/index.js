import DB from "../../../utils/db";
import Helpers from "../../../utils/Helpers";

export default async (req, res) => {
  try {
    const code = Helpers.generateObjectId();
    const { url, title, description, image } = req.body;
    await DB.db.collection("urlShortener").doc(code).set({
      url,
      title,
      description,
      image,
      code,
      access: 0,
      created: new Date().toISOString(),
    });
    res.status(200).json({ code });
  } catch (e) {
    res.status(400).end();
  }
};
