export function add(input: string): number {
    // If the input is empty, return 0
    if (input === "") return 0;

    // Next line splits the input into an array of numbers by comma or new line
    const numbers = input.split(/,|\n/).map(Number);
    
    // Next line uses reduce to sum the numbers
    return numbers.reduce((acc, num) => acc + num, 0);
}