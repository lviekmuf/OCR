import { OCR } from "../services/ocr.service";

const imageUrl = "https://onlinetexttools.com/images/examples-onlinetexttools/text-custom-font.png";
const text = `Every path 1s
the right path.`
describe('OCR Service testing', () => {
  test('Recognizing test', () => {
    const ocrService = new OCR()
    expect(ocrService.recognizeText(imageUrl)).resolves.toBe(text);
  });
})
