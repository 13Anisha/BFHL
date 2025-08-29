import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const createAltCapsString = (words) => {
  const combined = words.join("");
  const reversed = combined.split("").reverse().join("");
  let result = "";
  for (let i = 0; i < reversed.length; i++) {
    result += i % 2 === 0 ? reversed[i].toUpperCase() : reversed[i].toLowerCase();
  }
  return result;
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "'data' must be an array" });
    }

    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];
    const specialChars = [];
    let sum = 0;

    data.forEach(item => {
      if (!isNaN(item) && item.trim() !== "") {
        const num = Number(item);
        if (num % 2 === 0) evenNumbers.push(item);
        else oddNumbers.push(item);
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        specialChars.push(item);
      }
    });

    const concatString = createAltCapsString(alphabets);

    res.json({
      is_success: true,
      user_id: "anisha_plawat_13122003",
      email: "anisha.plawat2022@vitstudent.ac.in",
      roll_number: "22BCE0275",
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets,
      special_characters: specialChars,
      sum: String(sum),
      concat_string: concatString
    });

  } catch (error) {
    res.status(500).json({ is_success: false, message: "Internal server error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
