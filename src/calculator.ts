export function add(input: string): number {
    // If the input is empty, return 0
    if (input === "") return 0;

    let delimiters = [',', '\n'];
    let numbersSection = input;

    // Check for custom delimiter
    if (input.startsWith('//')) {
        // Support for delimiters of any length: //[delimiter]\n
        const bracketedDelimiterMatch = input.match(/^\/\/\[(.+)\]\n/);
        if (bracketedDelimiterMatch) {
            delimiters = [bracketedDelimiterMatch[1]];
            numbersSection = input.slice(bracketedDelimiterMatch[0].length);
        } else {
            // Single character delimiter
            const delimiterMatch = input.match(/^\/\/(.+)\n/);
            if (delimiterMatch) {
                delimiters = [delimiterMatch[1]];
                numbersSection = input.slice(delimiterMatch[0].length);
            }
        }
    }

    // Build regex for splitting (support multi-char delimiters)
    const splitRegex = new RegExp(delimiters.map(d => d.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|"));

    // Convert the string to an array of numbers
    const numbers = numbersSection.split(splitRegex).map(Number);

    // Check for negative numbers
    const negatives = numbers.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
    }

    // Check if numbers are greater than 1000
    const over1000 = numbers.filter(num => num > 1000);
    if (over1000.length > 0) {
        throw new Error("numbers cannot be greater than 1000");
    }

    // Return the sum of the numbers
    return numbers.reduce((acc, num) => acc + num, 0);
}