export function add(input: string): number {
    // If the input is empty, return 0
    if (input === "") return 0;

    let delimiters = [',', '\n'];
    let numbersSection = input;

    // Check for custom delimiter
    if (input.startsWith('//')) {
        const delimiterMatch = input.match(/^\/\/(.+)\n/);
        if (delimiterMatch) {
            delimiters = [delimiterMatch[1]];
            numbersSection = input.slice(delimiterMatch[0].length);
        }
    }

    // Regular expression to split the string using any of the delimiters
    const splitRegex = new RegExp(`[${delimiters.map(d => d.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("")}]`);
    
    // Convert the string to an array of numbers
    const numbers = numbersSection.split(splitRegex).map(Number);

    // Check for negative numbers
    const negatives = numbers.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
    }

    // Return the sum of the numbers
    return numbers.reduce((acc, num) => acc + num, 0);
}