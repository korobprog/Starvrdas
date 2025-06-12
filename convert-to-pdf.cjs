const markdownpdf = require('markdown-pdf');
const fs = require('fs');

const inputFile = 'architecture_plan.md';
const outputFile = 'architecture_plan.pdf';

console.log(`Конвертация ${inputFile} в ${outputFile}...`);

markdownpdf()
  .from(inputFile)
  .to(outputFile, function () {
    console.log(`Файл успешно сконвертирован в ${outputFile}`);
  });
