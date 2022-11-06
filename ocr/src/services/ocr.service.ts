import tesseract from 'tesseract.js';

class OCR {
  async recognizeText(filename: string): Promise<string> {
    const { data } = await tesseract.recognize(
      filename,
      'eng',
      { logger: message => console.log(message) }
    )
    return data.text
  }
}

export { OCR };

