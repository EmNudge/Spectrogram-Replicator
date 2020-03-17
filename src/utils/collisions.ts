export interface Point {
	x: number;
	y: number;
}
export interface Box {
	x: number;
	y: number;
	width: number;
	height: number;
}
export interface Range {
	min: number;
	max: number;
}

// returns whether a 1d point is inside a 1d range or not
export function pointInRange({ point, range }: { point: number; range: Range }) {
	if (point < range.min || point > range.max) return false;

	return true;
}


// returns whether a 2d point is inside a 2d box or not
export function pointInBox({ point, box }: { point: Point; box: Box }): boolean {
	const range1 = {
		min: box.x,
		max: box.x + box.width
  };
  const xColliding = pointInRange({ point: point.x, range: range1 })
	if (!xColliding) return false;
  
	const range2 = {
    min: box.y,
		max: box.y + box.height
	};
  const yColliding = pointInRange({ point: point.y, range: range2 })
	if (!yColliding) return false;

	return true;
}

// returns whether a 1d range is inside another 1d range or not
export function rangeInRange({ range1, range2 }: { range1: Range, range2: Range }): boolean {
  if (range1.min > range2.max) return false;
  if (range1.max < range2.min) return false; 
  
  return true;
}

// returns whether a 2d box is inside another 2d box or not
// this could have been written more concisely, but I think this is clearer
export function boxInBox({ box1, box2 }: { box1: Box, box2: Box}): boolean {
  const box1RangeX = {
    min: box1.x,
    max: box1.x + box1.width,
  }
  const box2RangeX = {
    min: box2.x,
    max: box2.x + box2.width,
  }
  const xColliding = rangeInRange({ range1: box1RangeX, range2: box2RangeX });
  if (!xColliding) return false; 

  const box1RangeY = {
    min: box1.y,
    max: box1.y + box1.height,
  }
  const box2RangeY = {
    min: box2.y,
    max: box2.y + box2.height,
  }
  const yColliding = rangeInRange({ range1: box1RangeY, range2: box2RangeY });
  if (!yColliding) return false; 
  
  return true;
}