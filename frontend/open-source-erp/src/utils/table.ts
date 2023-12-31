export type TableHeadLabel<T> = { id: keyof T; label: keyof T };

class StringProcesser {
  private artefact: string;

  constructor(artefact: string) {
    this.artefact = artefact;
  }

  getString(): string {
    if (Array.isArray(this.artefact)) {
      return this.artefact.join(' ');
    }
    return this.artefact;
  }

  capitalise(): this {
    const result = this.artefact.replace(/([A-Z])/g, ' $1');

    this.artefact = result.charAt(0).toUpperCase() + result.slice(1);

    return this;
  }
}

function getHeadLabels<T extends object>(
  entity: T,
  exclusions?: string[]
): TableHeadLabel<T>[] {
  const exclusionStore = new Set(exclusions);

  return (Object.keys(entity) as Array<keyof T>)
    .filter((key) => !exclusionStore.has(key as string))
    .map((key) => {
      const label = new StringProcesser(key as string).capitalise().getString();

      return {
        id: key as keyof T,
        label: label as keyof T,
      };
    });
}

export { getHeadLabels };
