/**
 * Detect which of 4 edges the cursor entered/exited from.
 * Extracted from Header/Component.client.tsx for reuse.
 */
export function findClosestEdge4(
  e: { clientX: number; clientY: number },
  el: HTMLElement,
): 'top' | 'bottom' | 'left' | 'right' {
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const w = rect.width
  const h = rect.height
  const nx = (x / w - 0.5) * 2
  const ny = (y / h - 0.5) * 2
  if (Math.abs(nx) > Math.abs(ny)) {
    return nx > 0 ? 'right' : 'left'
  }
  return ny > 0 ? 'bottom' : 'top'
}

export function getEdgeTransform(edge: 'top' | 'bottom' | 'left' | 'right') {
  switch (edge) {
    case 'left':
      return { xPercent: -100, yPercent: 0 }
    case 'right':
      return { xPercent: 100, yPercent: 0 }
    case 'top':
      return { xPercent: 0, yPercent: -100 }
    case 'bottom':
      return { xPercent: 0, yPercent: 100 }
  }
}
