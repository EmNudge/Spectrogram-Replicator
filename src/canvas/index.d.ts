export interface Dim {
  x: number,
  y: number,
  width: number,
  height: number,
}
export interface Node {
  x: number,
  y: number,
  id: Symbol,
}
export interface Segment {
  name: string,
  nodes: Node[],
  dimensions?: Dim,
}
export interface Line {
  hue: Number,
  name: String,
  segments: Map<Symbol, Segment>,
  dimensions?: Dim,
}