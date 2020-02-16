import { drawKeyframes, getDist, KEYFRAME_SIZE, getNewLine } from "./index";
import { lines, activeLine } from "../stores/canvas";

class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    const { width, height } = window.getComputedStyle(canvas);
    this.width = parseInt(width);
    this.height = parseInt(height);

    // initialized, regardless of params
    this.activeLine = null;
    activeLine.subscribe(n => (this.activeLine = n));

    this.selectedId = null;
    this.draggedId = null;
    this.mousePos = { x: 0, y: 0 };
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.width);

    for (const [id, { hue, keyframes }] of lines) {
      drawKeyframes({
        ctx: this.ctx,
        hue,
        keyframes,
        selectedId: this.selectedId,
        mousePos: this.mousePos,
        active: id == this.activeLine
      });
    }
  }

  getKeyframes() {
    const line = lines.get(this.activeLine);
    return line ? line.keyframes : [];
  }
  setKeyframes(newKeyframes) {
    lines.set(this.activeLine, newKeyframes);
  }

  handleHover(mousePos) {
    this.mousePos = mousePos;
    if (this.draggedId === null) return;
    if (this.isColliding({ ...mousePos, id: this.draggedId })) return;

    const newKeyframes = this.getKeyframes().map(keyframe => {
      if (this.draggedId !== keyframe.id) return keyframe;

      // if dragging, change the dragged keyframe's position to mouse pos
      return { ...mousePos, id: keyframe.id };
    });

    const sortedKeyframes = this.sortKeyframes(newKeyframes);
    this.setKeyframes(sortedKeyframes);
  }

  onClick(mousePos) {
    if (!lines.size) {
      const newLine = getNewLine();
      const id = Symbol();

      activeLine.set(id);
      lines.set(id, newLine);
      console.log({ newLine });
    }

    const keyframes = this.getKeyframes();
    for (const keyframe of keyframes) {
      if (getDist(mousePos, keyframe) >= KEYFRAME_SIZE) continue;

      this.selectedId = this.draggedId = keyframe.id;
      return;
    }

    this.addKeyframe(mousePos);
  }

  addKeyframe(pos) {
    const keyframe = { ...pos, id: Symbol() };

    const sortedKeyframes = this.sortKeyframes([...this.getKeyframes(), keyframe]);
    this.setKeyframes(sortedKeyframes);

    this.draggedId = this.selectedId = keyframe.id;
  }

  onRelease() {
    this.draggedId = null;
  }

  // removes keyframe and reassigns selectedId if any id is selected
  onDelete() {
    if (this.selectedId === null) return;

    const selectedIndex = this.getKeyframeIndex(this.selectedId);
    this.keyframes = this.keyframes.filter(
      keyframe => keyframe.id !== this.selectedId
    );

    // if no more keyframes, set selectedId to null and return
    if (!this.keyframes.length) {
      this.selectedId = null;
      return;
    }
    // change selected ID
    const newIndex =
      this.keyframes.length > selectedIndex ? selectedIndex : selectedIndex - 1;
    this.selectedId = this.keyframes[newIndex].id;
  }

  // sort keyframes by ascending x position
  sortKeyframes(keyframes) {
    return keyframes.sort((pos1, pos2) => pos1.x - pos2.x);
  }

  getKeyframeIndex(id) {
    for (const [index, keyframe] of this.keyframes.entries()) {
      if (keyframe.id === id) return index;
    }
  }

  hasSelected() {
    return this.selectedId !== null;
  }
  deselect() {
    this.selectedId = null;
  }

  getSurroundingKeyframes(xPos) {
    const keyframes = this.getKeyframes();

    // array.prototype.reduce was looking weird, so switched to a for-loop
    let leftIndex = 0;
    for (const [index, pos] of keyframes.entries()) {
      if (xPos <= pos.x) break;
      const { x } = keyframes[leftIndex];
      if (xPos - pos.x < xPos - x) leftIndex = index;
    }

    return {
      prev: keyframes[leftIndex],
      next: keyframes[leftIndex + 1]
    };
  }

  getDist(point, circle) {
    const distX = point.x - circle.x;
    const distY = point.y - circle.y;
    return Math.sqrt(distX ** 2 + distY ** 2);
  }

  isColliding(keyframe) {
    const keyframes = this.getKeyframes();
    return keyframes.some(kf => {
      return Math.abs(keyframe.x - kf.x) < 2 && keyframe.id !== kf.id;
    });
  }
}

export default Canvas;
