// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";

// const app = express();
// const PORT = process.env.PORT || 3000;


// app.use(cors());
// app.use(bodyParser.json());

// const buildAltCapsString = (letters) => {
//   const joined = letters.join("");
//   const reversed = joined.split("").reverse().join("");
//   let finalStr = "";
//   for (let i = 0; i < reversed.length; i++) {
//     finalStr += i % 2 === 0 ? reversed[i].toUpperCase() : reversed[i].toLowerCase();
//   }
//   return finalStr;
// };

// app.post("/bfhl", (req, res) => {
//   try {
//     const { data } = req.body;

//     if (!Array.isArray(data)) {
//       return res.status(400).json({
//         is_success: false,
//         message: "Invalid input, 'data' must be an array"
//       });
//     }

//     const evens = [];
//     const odds = [];
//     const letters = [];
//     const specials = [];
//     let total = 0;

//     data.forEach(element => {
//       if (!isNaN(element) && element.trim() !== "") {
//         const numVal = Number(element);
//         if (numVal % 2 === 0) {
//           evens.push(element);
//         } else {
//           odds.push(element);
//         }
//         total += numVal;
//       } else if (/^[a-zA-Z]+$/.test(element)) {
//         letters.push(element.toUpperCase());
//       } else {
//         specials.push(element);
//       }
//     });

//     const altCapsReversed = buildAltCapsString(letters);

//     return res.status(200).json({
//       is_success: true,
//       user_id: "anisha_plawat_13122003",
//       email: "anishaplawat13@gmail.com",
//       roll_number: "22BCE0275",
//       odd_numbers: odds,
//       even_numbers: evens,
//       alphabets: letters,
//       special_characters: specials,
//       sum: String(total),
//       concat_string: altCapsReversed
//     });
//   } catch (err) {
//     return res.status(500).json({
//       is_success: false,
//       message: "Internal server error",
//       error: err.message
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

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
      email: "anishaplawat13@gmail.com",
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
