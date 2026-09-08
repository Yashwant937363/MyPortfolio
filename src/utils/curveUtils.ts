import type { DiagramNode } from "../types/diagramData";

export interface Point {
  x: number;
  y: number;
}

export interface CurveInfo {
  pathD: string;
  pStart: Point;
  pEnd: Point;
  cp1: Point;
  cp2: Point;
}

/**
 * Calculates custom Bezier curve control points and distinct port anchors per node connection.
 * Uses a SINGLE canonical path per node pair for both request and response packet traversal.
 */
export const getCurveInfo = (
  fromId: string,
  toId: string,
  nodes: DiagramNode[]
): CurveInfo => {
  const fromNode = nodes.find((n) => n.id === fromId) || nodes[0];
  const toNode = nodes.find((n) => n.id === toId) || nodes[0];

  // Default start/end points at node centers
  let pStart: Point = { x: fromNode.x, y: fromNode.y };
  let pEnd: Point = { x: toNode.x, y: toNode.y };
  let cp1: Point = {
    x: (fromNode.x + toNode.x) / 2,
    y: (fromNode.y + toNode.y) / 2,
  };
  let cp2: Point = {
    x: (fromNode.x + toNode.x) / 2,
    y: (fromNode.y + toNode.y) / 2,
  };

  const isReverse = (a: string, b: string) =>
    (fromId === b && toId === a);

  // 1. Browser <-> Cache
  if ((fromId === "browser" && toId === "cache") || isReverse("browser", "cache")) {
    const start = { x: 230, y: 360 };
    const end = { x: 340, y: 120 };
    const c1 = { x: 285, y: 360 };
    const c2 = { x: 285, y: 120 };

    pStart = fromId === "browser" ? start : end;
    pEnd = fromId === "browser" ? end : start;
    cp1 = fromId === "browser" ? c1 : c2;
    cp2 = fromId === "browser" ? c2 : c1;

  // 2. Browser <-> Resolver
  } else if ((fromId === "browser" && toId === "resolver") || isReverse("browser", "resolver")) {
    const start = { x: 230, y: 410 };
    const end = { x: 370, y: 480 };
    const c1 = { x: 300, y: 410 };
    const c2 = { x: 300, y: 480 };

    pStart = fromId === "browser" ? start : end;
    pEnd = fromId === "browser" ? end : start;
    cp1 = fromId === "browser" ? c1 : c2;
    cp2 = fromId === "browser" ? c2 : c1;

  // 3. Resolver <-> Root
  } else if ((fromId === "resolver" && toId === "root") || isReverse("resolver", "root")) {
    pStart = { x: 590, y: 480 };
    pEnd = { x: 730, y: 410 };
    cp1 = { x: 660, y: 480 };
    cp2 = { x: 660, y: 410 };

  // 4. Root <-> TLD Dev
  } else if ((fromId === "root" && toId === "tld_dev") || isReverse("root", "tld_dev")) {
    pStart = { x: 950, y: 360 };
    pEnd = { x: 1090, y: 150 };
    cp1 = { x: 1020, y: 360 };
    cp2 = { x: 1020, y: 150 };

  // 5. Root <-> TLD Com
  } else if ((fromId === "root" && toId === "tld_com") || isReverse("root", "tld_com")) {
    pStart = { x: 950, y: 390 };
    pEnd = { x: 1090, y: 390 };
    cp1 = { x: 1020, y: 390 };
    cp2 = { x: 1020, y: 390 };

  // 6. Root <-> TLD Org
  } else if ((fromId === "root" && toId === "tld_org") || isReverse("root", "tld_org")) {
    pStart = { x: 950, y: 420 };
    pEnd = { x: 1090, y: 630 };
    cp1 = { x: 1020, y: 420 };
    cp2 = { x: 1020, y: 630 };

  // 7. TLD Dev <-> Auth DNS
  } else if ((fromId === "tld_dev" && toId === "auth_dns") || isReverse("tld_dev", "auth_dns")) {
    pStart = { x: 1310, y: 150 };
    pEnd = { x: 1450, y: 150 };
    cp1 = { x: 1380, y: 150 };
    cp2 = { x: 1380, y: 150 };

  // 8. Auth DNS <-> Resolver
  } else if ((fromId === "auth_dns" && toId === "resolver") || isReverse("auth_dns", "resolver")) {
    const start = { x: 1560, y: 95 };
    const end = { x: 480, y: 445 };
    const c1 = { x: 1560, y: 30 };
    const c2 = { x: 240, y: 30 };

    pStart = fromId === "auth_dns" ? start : end;
    pEnd = fromId === "auth_dns" ? end : start;
    cp1 = fromId === "auth_dns" ? c1 : c2;
    cp2 = fromId === "auth_dns" ? c2 : c1;

  // 9. SINGLE CANONICAL PATH: Browser <-> API Gateway
  } else if ((fromId === "browser" && toId === "api_gateway") || isReverse("browser", "api_gateway")) {
    const start = { x: 120, y: 445 };
    const end = { x: 1450, y: 530 };
    const c1 = { x: 120, y: 750 };
    const c2 = { x: 1450, y: 750 };

    pStart = fromId === "browser" ? start : end;
    pEnd = fromId === "browser" ? end : start;
    cp1 = fromId === "browser" ? c1 : c2;
    cp2 = fromId === "browser" ? c2 : c1;

  // 10. SINGLE CANONICAL PATH: API Gateway <-> About Server
  } else if ((fromId === "api_gateway" && toId === "about_server") || isReverse("api_gateway", "about_server")) {
    const start = { x: 1670, y: 460 };
    const end = { x: 1870, y: 100 };
    const c1 = { x: 1770, y: 460 };
    const c2 = { x: 1770, y: 100 };

    pStart = fromId === "api_gateway" ? start : end;
    pEnd = fromId === "api_gateway" ? end : start;
    cp1 = fromId === "api_gateway" ? c1 : c2;
    cp2 = fromId === "api_gateway" ? c2 : c1;

  // 11. SINGLE CANONICAL PATH: API Gateway <-> Experience Server
  } else if ((fromId === "api_gateway" && toId === "experience_server") || isReverse("api_gateway", "experience_server")) {
    const start = { x: 1670, y: 480 };
    const end = { x: 1870, y: 300 };
    const c1 = { x: 1770, y: 480 };
    const c2 = { x: 1770, y: 300 };

    pStart = fromId === "api_gateway" ? start : end;
    pEnd = fromId === "api_gateway" ? end : start;
    cp1 = fromId === "api_gateway" ? c1 : c2;
    cp2 = fromId === "api_gateway" ? c2 : c1;

  // 12. SINGLE CANONICAL PATH: API Gateway <-> Education Server
  } else if ((fromId === "api_gateway" && toId === "education_server") || isReverse("api_gateway", "education_server")) {
    const start = { x: 1670, y: 500 };
    const end = { x: 1870, y: 500 };
    const c1 = { x: 1770, y: 500 };
    const c2 = { x: 1770, y: 500 };

    pStart = fromId === "api_gateway" ? start : end;
    pEnd = fromId === "api_gateway" ? end : start;
    cp1 = fromId === "api_gateway" ? c1 : c2;
    cp2 = fromId === "api_gateway" ? c2 : c1;

  // 13. SINGLE CANONICAL PATH: API Gateway <-> Skills Server
  } else if ((fromId === "api_gateway" && toId === "skills_server") || isReverse("api_gateway", "skills_server")) {
    const start = { x: 1670, y: 520 };
    const end = { x: 1870, y: 700 };
    const c1 = { x: 1770, y: 520 };
    const c2 = { x: 1770, y: 700 };

    pStart = fromId === "api_gateway" ? start : end;
    pEnd = fromId === "api_gateway" ? end : start;
    cp1 = fromId === "api_gateway" ? c1 : c2;
    cp2 = fromId === "api_gateway" ? c2 : c1;

  // 14. SINGLE CANONICAL PATH: API Gateway <-> Projects Server
  } else if ((fromId === "api_gateway" && toId === "projects_server") || isReverse("api_gateway", "projects_server")) {
    const start = { x: 1670, y: 540 };
    const end = { x: 1870, y: 900 };
    const c1 = { x: 1770, y: 540 };
    const c2 = { x: 1770, y: 900 };

    pStart = fromId === "api_gateway" ? start : end;
    pEnd = fromId === "api_gateway" ? end : start;
    cp1 = fromId === "api_gateway" ? c1 : c2;
    cp2 = fromId === "api_gateway" ? c2 : c1;
  }

  const pathD = `M ${pStart.x} ${pStart.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${pEnd.x} ${pEnd.y}`;
  return { pathD, pStart, pEnd, cp1, cp2 };
};

/**
 * Computes point on cubic Bezier curve at progress t (0 to 1).
 */
export const getCubicPoint = (
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  t: number
): Point => {
  const oneMinusT = 1 - t;
  const x =
    Math.pow(oneMinusT, 3) * p0.x +
    3 * Math.pow(oneMinusT, 2) * t * p1.x +
    3 * oneMinusT * Math.pow(t, 2) * p2.x +
    Math.pow(t, 3) * p3.x;
  const y =
    Math.pow(oneMinusT, 3) * p0.y +
    3 * Math.pow(oneMinusT, 2) * t * p1.y +
    3 * oneMinusT * Math.pow(t, 2) * p2.y +
    Math.pow(t, 3) * p3.y;
  return { x, y };
};
