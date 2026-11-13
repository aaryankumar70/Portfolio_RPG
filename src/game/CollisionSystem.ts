import { BUILDINGS } from '../data/portfolioData';
import { CollisionBox } from '../types';
import { TUNING } from './TUNING';

export class CollisionSystem {
  public worldWidth = 2800;
  public worldHeight = 2200;
  public tileSize = 32;

  // Solid Collision Boxes (Buildings, Obstacles)
  private solidBoxes: CollisionBox[] = [];

  // Tree Trunk & Landmark Solid Circles: { x, y, r }
  private solidCircles: { x: number; y: number; r: number }[] = [
    // Central Town Square Fountain Basin (Directly from reference screenshot)
    { x: 1200, y: 960, r: 44 },
    // Perimeter Trees
    { x: 420, y: 480, r: 24 },
    { x: 920, y: 460, r: 24 },
    { x: 1480, y: 460, r: 24 },
    { x: 2020, y: 460, r: 24 },
    { x: 420, y: 880, r: 24 },
    { x: 420, y: 1280, r: 24 },
    { x: 420, y: 1680, r: 24 },
    { x: 920, y: 1680, r: 24 },
    { x: 1480, y: 1680, r: 24 },
    { x: 2020, y: 1680, r: 24 }
  ];

  constructor() {
    this.initCollisionBoxes();
  }

  private initCollisionBoxes() {
    this.solidBoxes = [];

    // 1. Buildings Collision Boxes
    BUILDINGS.forEach((b) => {
      this.solidBoxes.push(b.collisionBox);
    });

    // 2. Garden Wooden Fence Perimeter (Middle-left)
    this.solidBoxes.push({ x: 615, y: 915, w: 250, h: 10 }); // Top fence
    this.solidBoxes.push({ x: 615, y: 915, w: 10, h: 210 }); // Left fence
    this.solidBoxes.push({ x: 615, y: 1125, w: 90, h: 10 }); // Bottom fence left of gate
    this.solidBoxes.push({ x: 775, y: 1125, w: 90, h: 10 }); // Bottom fence right of gate
    this.solidBoxes.push({ x: 865, y: 915, w: 10, h: 210 }); // Right fence
  }

  // Check if position is on a walkable stone bridge over the river
  public isOnBridge(x: number, y: number): boolean {
    // East Bridge Crossing: x: 2460 to 2600, y: 880 to 980
    if (x >= 2460 && x <= 2600 && y >= 880 && y <= 980) return true;
    return false;
  }

  // Check if position is inside the eastern river water (not on a bridge)
  public isRiverWater(x: number, y: number): boolean {
    if (this.isOnBridge(x, y)) return false;

    // Eastern River running along x >= 2520 with organic curve
    if (x < 2480) return false;
    const wave = Math.sin(y * 0.008) * 40;
    return x >= (2520 + wave);
  }

  // Checks if a foot capsule/ellipse collides with solid geometry or custom boxes
  public isSolid(
    x: number,
    y: number,
    radius = 10,
    radiusY?: number,
    customBoxes?: CollisionBox[]
  ): boolean {
    const rx = radius;
    const ry = radiusY !== undefined ? radiusY : radius;
    const boxes = customBoxes || this.solidBoxes;

    // Overworld boundary limits & environment
    if (!customBoxes) {
      if (x - rx < 60 || x + rx > this.worldWidth - 60) return true;
      if (y - ry < 320 || y + ry > this.worldHeight - 60) return true;
      if (this.isRiverWater(x, y)) return true;

      // Tree trunks & fountain
      for (const c of this.solidCircles) {
        const dx = Math.abs(x - c.x);
        const dy = Math.abs(y - c.y);
        if (dx > c.r + rx || dy > c.r + ry) continue;
        const normX = dx / (c.r + rx);
        const normY = dy / (c.r + ry);
        if (normX * normX + normY * normY <= 1.0) return true;
      }
    }

    // Building & box collisions
    for (const box of boxes) {
      if (
        x + rx > box.x &&
        x - rx < box.x + box.w &&
        y + ry > box.y &&
        y - ry < box.y + box.h
      ) {
        return true;
      }
    }

    return false;
  }

  // Smooth sliding collision resolution with axis separation and corner forgiveness
  public resolveMovement(
    currX: number,
    currY: number,
    targetX: number,
    targetY: number,
    radiusX: number = TUNING.PLAYER.HITBOX.RADIUS_X,
    radiusY: number = TUNING.PLAYER.HITBOX.RADIUS_Y,
    customBoxes?: CollisionBox[]
  ): { x: number; y: number } {
    // 1. Try full step first
    if (!this.isSolid(targetX, targetY, radiusX, radiusY, customBoxes)) {
      return { x: targetX, y: targetY };
    }

    let newX = currX;
    let newY = currY;

    // 2. Try horizontal sliding step with corner forgiveness
    if (!this.isSolid(targetX, currY, radiusX, radiusY, customBoxes)) {
      newX = targetX;
    } else {
      const cornerNudge = TUNING.PLAYER.CORNER_FORGIVENESS;
      for (let offset = 1; offset <= cornerNudge; offset++) {
        if (!this.isSolid(targetX, currY - offset, radiusX, radiusY, customBoxes)) {
          newX = targetX;
          newY = currY - offset * 0.35;
          break;
        }
        if (!this.isSolid(targetX, currY + offset, radiusX, radiusY, customBoxes)) {
          newX = targetX;
          newY = currY + offset * 0.35;
          break;
        }
      }
    }

    // 3. Try vertical sliding step with corner forgiveness
    if (!this.isSolid(newX, targetY, radiusX, radiusY, customBoxes)) {
      newY = targetY;
    } else {
      const cornerNudge = TUNING.PLAYER.CORNER_FORGIVENESS;
      for (let offset = 1; offset <= cornerNudge; offset++) {
        if (!this.isSolid(currX - offset, targetY, radiusX, radiusY, customBoxes)) {
          newX = currX - offset * 0.35;
          newY = targetY;
          break;
        }
        if (!this.isSolid(currX + offset, targetY, radiusX, radiusY, customBoxes)) {
          newX = currX + offset * 0.35;
          newY = targetY;
          break;
        }
      }
    }

    return { x: newX, y: newY };
  }

  // -----------------------------------------------------------------
  // A* PATHFINDING FOR CLICK-TO-MOVE
  // -----------------------------------------------------------------
  public findPath(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): { x: number; y: number }[] {
    const gridScale = 36; // 36px navigation cells for speed & accuracy
    const startCol = Math.floor(startX / gridScale);
    const startRow = Math.floor(startY / gridScale);
    const endCol = Math.floor(endX / gridScale);
    const endRow = Math.floor(endY / gridScale);

    // If destination is blocked, clamp to nearest walkable cell
    if (this.isSolid(endX, endY, 12)) {
      return [{ x: endX, y: endY }];
    }

    interface Node {
      c: number;
      r: number;
      g: number;
      h: number;
      f: number;
      parent?: Node;
    }

    const openList: Node[] = [];
    const closedSet = new Set<string>();

    const h = (c: number, r: number) => Math.hypot(c - endCol, r - endRow);

    const startNode: Node = {
      c: startCol,
      r: startRow,
      g: 0,
      h: h(startCol, startRow),
      f: h(startCol, startRow)
    };
    openList.push(startNode);

    let iterations = 0;
    const maxIterations = 800; // Performance safeguard

    while (openList.length > 0 && iterations < maxIterations) {
      iterations++;
      // Get lowest f cost node
      openList.sort((a, b) => a.f - b.f);
      const current = openList.shift()!;

      // Reached destination cell
      if (Math.hypot(current.c - endCol, current.r - endRow) <= 1.2) {
        const waypoints: { x: number; y: number }[] = [];
        let curr: Node | undefined = current;
        while (curr) {
          waypoints.unshift({
            x: curr.c * gridScale + gridScale / 2,
            y: curr.r * gridScale + gridScale / 2
          });
          curr = curr.parent;
        }
        waypoints.push({ x: endX, y: endY });
        return this.smoothWaypoints(waypoints);
      }

      const key = `${current.c},${current.r}`;
      closedSet.add(key);

      // 4-directional cardinal neighbors
      const neighbors = [
        { c: current.c + 1, r: current.r },
        { c: current.c - 1, r: current.r },
        { c: current.c, r: current.r + 1 },
        { c: current.c, r: current.r - 1 }
      ];

      for (const n of neighbors) {
        const nKey = `${n.c},${n.r}`;
        if (closedSet.has(nKey)) continue;

        const worldX = n.c * gridScale + gridScale / 2;
        const worldY = n.r * gridScale + gridScale / 2;

        if (this.isSolid(worldX, worldY, 14)) {
          closedSet.add(nKey);
          continue;
        }

        const gScore = current.g + 1;
        const existing = openList.find((node) => node.c === n.c && node.r === n.r);

        if (!existing) {
          const neighborNode: Node = {
            c: n.c,
            r: n.r,
            g: gScore,
            h: h(n.c, n.r),
            f: gScore + h(n.c, n.r),
            parent: current
          };
          openList.push(neighborNode);
        } else if (gScore < existing.g) {
          existing.g = gScore;
          existing.f = gScore + existing.h;
          existing.parent = current;
        }
      }
    }

    // Direct fallback if pathfinder didn't find path within iterations
    return [{ x: endX, y: endY }];
  }

  // String pulling / path smoothing: removes redundant in-line nodes
  private smoothWaypoints(pts: { x: number; y: number }[]): { x: number; y: number }[] {
    if (pts.length <= 2) return pts;
    const result: { x: number; y: number }[] = [pts[0]];

    let i = 0;
    while (i < pts.length - 1) {
      let furthest = i + 1;
      for (let j = pts.length - 1; j > i + 1; j--) {
        if (this.hasLineOfSight(pts[i], pts[j])) {
          furthest = j;
          break;
        }
      }
      result.push(pts[furthest]);
      i = furthest;
    }

    return result;
  }

  // Raycast line of sight check between two points
  public hasLineOfSight(p1: { x: number; y: number }, p2: { x: number; y: number }): boolean {
    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const steps = Math.ceil(dist / 16);
    for (let s = 1; s < steps; s++) {
      const t = s / steps;
      const x = p1.x + (p2.x - p1.x) * t;
      const y = p1.y + (p2.y - p1.y) * t;
      if (this.isSolid(x, y, 12)) return false;
    }
    return true;
  }
}

export const collisionSystem = new CollisionSystem();
