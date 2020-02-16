// These are colors for canvas keyframes
// Since the lines are just lighter versions of the keyframes, we need HSL
// If we were using SVGs or just HTML instead of canvas, we could use CSS filter (Brightness)

// These are therefore the hue of HSL, the S & L should be 50%

export const BLUE = 200;
export const TEAL = 170;
export const RED = 0;
export const YELLOW = 60;
export const GREEN = 80;
export const PURPLE = 250;
export const PINK = 320;

export const getRandColor = () => {
  const colors = [RED, TEAL, BLUE, YELLOW, GREEN, PURPLE, PINK]

  const randIndex = Math.floor(Math.random() * colors.length)
  
  return colors[randIndex]
}