const fs = require("fs");

console.log("Loading...");

const find_words = fs.readFileSync(__dirname + "/inputs/find_words.txt", {
  encoding: "utf8",
  flag: "r",
});

const french_dictionary = fs.readFileSync(
  __dirname + "/inputs/french_dictionary.csv",
  {
    encoding: "utf8",
    flag: "r",
  }
);

let t8shakespeare = fs.readFileSync(__dirname + "/inputs/t8.shakespeare.txt", {
  encoding: "utf8",
  flag: "r",
});

const find_words_array = find_words.split("\n");

const french_dictionary_array = french_dictionary.split("\n");

let content = "English, French, Frequency \n";

find_words_array.forEach((word) => {
  const words = french_dictionary_array.filter((words) => {
    const [english] = words.split(",");
    return english === word;
  });

  const [english, french] = words[0].split(",");

  const regex = new RegExp(word, "gi");

  const frequency = (t8shakespeare.match(regex) || []).length;

  t8shakespeare = t8shakespeare.replaceAll(regex, french);

  content += `${english}, ${french}, ${frequency} \n`;
});

fs.writeFileSync(__dirname + "/outputs/frequency.csv", content);

fs.writeFileSync(
  __dirname + "/outputs/t8.shakespeare.translated.txt",
  t8shakespeare
);

console.log("Done!");
