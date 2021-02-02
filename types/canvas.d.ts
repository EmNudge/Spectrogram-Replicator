declare module Canvas {
  interface Dim {
    x: number,
    y: number,
    width: number,
    height: number,
  }

  interface Node {
    x: number,
    y: number,
    id: Symbol,
  }

  interface Segment {
    name: string,
    nodes: Canvas.Node[],
    dimensions?: Dim,
  }
  
  interface Line {
    hue: number,
    name: string,
    segments: Map<Symbol, Segment>,
    dimensions?: Dim,
    isEditing?: boolean,
  }

  interface Selection {
    lineId: Symbol;
    segmentId: Symbol | null;
    segments: Map<Symbol, Set<Symbol>>;
  }
}