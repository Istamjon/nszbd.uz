/**
 * Formats dates into DD-MM-YYYY format (e.g., 2026-10-02 -> 02-10-2026).
 */
export function formatDate(dateInput?: string | null): string {
  if (!dateInput) return "";
  const cleanStr = String(dateInput).trim();
  if (!cleanStr) return "";

  // Extract date part before 'T' or space
  const datePart = cleanStr.split("T")[0].split(" ")[0];

  // Match YYYY-MM-DD or YYYY.MM.DD or YYYY/MM/DD
  const ymdMatch = datePart.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (ymdMatch) {
    const [, year, month, day] = ymdMatch;
    return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
  }

  // Fallback to JS Date parsing if not already YYYY-MM-DD
  const d = new Date(cleanStr);
  if (!isNaN(d.getTime())) {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return datePart;
}
