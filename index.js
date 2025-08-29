import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const buildAltCapsString = (letters) => {
  const joined = letters.join("");
  const reversed = joined.split("").reverse().join("");
  let finalStr = "";
  for (let i = 0; i < reversed.length; i++) {
    finalStr += i % 2 === 0 ? reversed[i].toUpperCase() : reversed[i].toLowerCase();
  }
  return finalStr;
};

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input, 'data' must be an array"
      });
    }

    const evens = [];
    const odds = [];
    const letters = [];
    const specials = [];
    let total = 0;

    data.forEach(element => {
      if (!isNaN(element) && element.trim() !== "") {
        const numVal = Number(element);
        if (numVal % 2 === 0) {
          evens.push(element);
        } else {
          odds.push(element);
        }
        total += numVal;
      } else if (/^[a-zA-Z]+$/.test(element)) {
        letters.push(element.toUpperCase());
      } else {
        specials.push(element);
      }
    });

    const altCapsReversed = buildAltCapsString(letters);

    return res.status(200).json({
      is_success: true,
      user_id: "anisha_plawat_13122003",
      email: "anishaplawat13@gmail.com",
      roll_number: "22BCE0275",
      odd_numbers: odds,
      even_numbers: evens,
      alphabets: letters,
      special_characters: specials,
      sum: String(total),
      concat_string: altCapsReversed
    });
  } catch (err) {
    return res.status(500).json({
      is_success: false,
      message: "Internal server error",
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
