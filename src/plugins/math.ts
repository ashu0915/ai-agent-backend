//used chat-gpt to generate this matcher

export function runMathPlugin(expression: string): string {
  try {
    const match = expression.match(/(\d+\s*[\+\-\*\/]\s*\d+)/);
    if (!match) return 'Invalid math expression.';
    const result = Function(`return (${match[1]})`)();
    return `The result of ${match[1]} is ${result}`;
  } catch (err) {
    return 'Failed to evaluate math expression.';
  }
}
