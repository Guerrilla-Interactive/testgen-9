/**
 * Traverses from `element` upward. At each level:
 *   1. Checks if `current` has "container" in classList
 *   2. Checks siblings of `current` for "container"
 *
 * If found, returns `offset + padding`, i.e.:
 *   container.getBoundingClientRect().left + parseFloat(paddingLeft)
 *
 * If nothing found, returns `0`.
 */
export function getContainerOffsetPlusPadding(element: HTMLElement | null): number {
  if (!element) return 0;

  function hasContainerClass(el: Element) {
    return (
      el instanceof HTMLElement &&
      Array.from(el.classList).some((cls) => cls.includes("container"))
    );
  }

  let current: HTMLElement | null = element;

  while (current) {
    // 1) Check if current itself has a container class
    if (hasContainerClass(current)) {
      return getOffsetPlusPadding(current);
    }
    // 2) Check siblings of current
    const parent: HTMLElement | null = current.parentElement;
    if (parent) {
      for (const sibling of parent.children) {
        if (sibling !== current && hasContainerClass(sibling)) {
          return getOffsetPlusPadding(sibling as HTMLElement);
        }
      }
    }

    // 3) Go up one level
    current = parent;
  }

  // None found
  return 0;
}

/** Helper that returns the container's offset from viewport left + container's left padding. */
function getOffsetPlusPadding(container: HTMLElement): number {
  const rectLeft = container.getBoundingClientRect().left;
  const computed = window.getComputedStyle(container);
  const paddingLeft = Number.parseFloat(computed.paddingLeft) || 0;
  return rectLeft + paddingLeft;
}
