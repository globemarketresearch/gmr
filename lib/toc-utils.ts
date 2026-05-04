// Sidebar TOC Item - for page navigation to actual sections
export interface SidebarTOCItem {
  id: string;
  title: string;
  level: number;
}

// Full Report TOC Item - for comprehensive chapter structure display
export interface TOCItem {
  id: string;
  title: string;
  number?: string; // e.g., "1.1", "3.2.1", "8.11.1.1"
  children?: TOCItem[];
}

export interface TOCChapter extends TOCItem {
  children: TOCItem[];
}

/**
 * Groups a flat table of contents array into hierarchical chapters
 * Supports multi-level nesting based on number format (e.g., "1", "1.1", "1.1.1")
 * @param items - Flat array of TOC items
 * @returns Array of chapters with nested children
 */
export function groupTableOfContents(items: TOCItem[]): TOCChapter[] {
  const chapters: TOCChapter[] = [];
  const itemMap = new Map<string, TOCItem>();

  // First pass: create all items with empty children arrays
  items.forEach((item) => {
    const tocItem: TOCItem = {
      ...item,
      children: [],
    };
    itemMap.set(item.number || item.id, tocItem);
  });

  // Second pass: build hierarchy based on numbering
  items.forEach((item) => {
    const number = item.number || '';
    const parts = number.split('.');

    if (parts.length === 1) {
      // Top-level chapter (e.g., "1", "2")
      const chapter = itemMap.get(number) as TOCChapter;
      if (chapter) {
        chapters.push(chapter);
      }
    } else {
      // Child item - find parent by removing last number segment
      const parentNumber = parts.slice(0, -1).join('.');
      const parent = itemMap.get(parentNumber);
      const child = itemMap.get(number);

      if (parent && child) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(child);
      }
    }
  });

  return chapters;
}
