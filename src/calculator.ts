export function add(input: string): number {
    const numbers = input.split(',').map(Number);
    return numbers.reduce((acc, num) => acc + num, 0);
  }