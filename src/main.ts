import { generateRandomString } from "./backend/generator";

const form = document.querySelector<HTMLFormElement>("#generator-form")!;
const output = document.querySelector<HTMLInputElement>("#password")!;
const copyBtn = document.querySelector<HTMLButtonElement>("#copy-btn")!;
const feedback = document.querySelector<HTMLParagraphElement>("#feedback")!;
const lettersInput = form.querySelector<HTMLInputElement>('input[name="letters"]')!;
const uppercaseInput = form.querySelector<HTMLInputElement>('input[name="uppercase"]')!;

function syncUppercase(): void {
  uppercaseInput.disabled = !lettersInput.checked;
}

lettersInput.addEventListener("change", syncUppercase);
syncUppercase();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);

  try {
    output.value = generateRandomString({
      length: Number(data.get("size")),
      letters: data.has("letters"),
      uppercase: data.has("uppercase"),
      numbers: data.has("numbers"),
      symbols: data.has("symbols"),
    });

    copyBtn.disabled = false;
    feedback.textContent = "";
  } catch (error) {
    feedback.textContent =
      error instanceof Error ? error.message : "Something went wrong.";
  }
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    feedback.textContent = "Copied!";
  } catch {
    feedback.textContent = "Could not copy. Select the text and copy it manually.";
  }
});