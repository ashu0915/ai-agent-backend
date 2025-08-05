import { runWeatherPlugin } from '../plugins/weather';
import { runMathPlugin } from '../plugins/math';

type PluginResult = {
  plugin: string;
  output: string;
} | null;

export async function detectAndRunPlugin(message: string): Promise<PluginResult> {
  const lowerMsg = message.toLowerCase();

  const output = await runWeatherPlugin(message);
  
  if(output)
    return { plugin: 'weather', output };

  if (/\d+[\+\-\*\/]\d+/.test(lowerMsg)) {
    const output = runMathPlugin(message);
    return { plugin: 'math', output };
  }

  return null;
}
