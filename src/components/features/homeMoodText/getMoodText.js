import { moodText } from './moodText';
import { getTimePeriod } from './getTimePeriod';
import { getDayType } from './getDayType';

export function getMoodText() {
  const dayType = getDayType();       // weekday / holiday
  const timePeriod = getTimePeriod(); // morning / afternoon / night

  const texts = moodText[dayType][timePeriod];
  const randomIndex = Math.floor(Math.random() * texts.length);

  return texts[randomIndex];
}
