/**
 * String Calculator Kata
 * 
 * Adds numbers in a string, supporting:
 * - Comma, newline, or custom delimiters (single/multi/multiple)
 * - Negative number detection (throws with all negatives listed)
 * - Numbers > 1000 (throws error)
 * 
 * @param input - String of numbers with delimiters
 * @returns Sum of the numbers
 * @throws Error for negative numbers or numbers > 1000
 */
export function add(input: string): number {
    // Return 0 for empty input
    if (input === "") return 0;

    let delimiters = [',', '\n']; // Default delimiters
    let numbersSection = input;

    // Check for custom delimiter(s) at the start of the string
    if (input.startsWith('//')) {
        // Support for multiple delimiters: //[delim1][delim2]\n
        const multipleDelimitersMatch = input.match(/^\/\/(\[.+?\])+\n/);
        if (multipleDelimitersMatch) {
            const delimiterSection = multipleDelimitersMatch[0];
            // Extract all delimiters between square brackets
            delimiters = Array.from(delimiterSection.matchAll(/\[(.+?)\]/g)).map(match => match[1]);
            numbersSection = input.slice(delimiterSection.length);
        } else {
            // Single delimiter (either one char or multi-char, but not multiple)
            const delimiterMatch = input.match(/^\/\/(.+)\n/);
            if (delimiterMatch) {
                delimiters = [delimiterMatch[1]];
                numbersSection = input.slice(delimiterMatch[0].length);
            }
        }
    }

    // Build a regex to split by any of the delimiters (handles multi-char delimiters)
    const splitRegex = new RegExp(delimiters.map(d => d.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|"));
    // Convert the split strings to numbers
    const numbers = numbersSection.split(splitRegex).map(Number);

    // Check for negative numbers and throw with all negatives listed
    const negatives = numbers.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
    }

    // Check for numbers greater than 1000 and throw if any found
    const over1000 = numbers.filter(num => num > 1000);
    if (over1000.length > 0) {
        throw new Error("numbers cannot be greater than 1000");
    }

    // Return the sum of the numbers
    return numbers.reduce((acc, num) => acc + num, 0);
}