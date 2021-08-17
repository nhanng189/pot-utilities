import _ from "lodash";
import axios from "axios";

export default async (req, res) => {
  try {
    const { text } = req.query;

    const { data: generateFileIdData } = await axios.post(
      "https://api.soundoftext.com/sounds",
      {
        engine: "Google",
        data: { text, voice: "vi-VN" },
      }
    );

    const fileId = _.get(generateFileIdData, "id");
    res.status(200).json(`https://storage.soundoftext.com/${fileId}.mp3`);
  } catch (e) {
    res.status(400).end();
  }
};
