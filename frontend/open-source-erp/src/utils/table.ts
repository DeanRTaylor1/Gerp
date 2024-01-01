import { TableBodyItem } from '../Components/Table/TableRow';

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
): Map<string, TableHeadLabel<T>> {
  const exclusionStore = new Set(exclusions);

  const rowHeads = new Map<string, TableHeadLabel<T>>();

  (Object.keys(entity) as Array<keyof T>)
    .filter((key) => !exclusionStore.has(key as string))
    .map((key) => {
      const label = new StringProcesser(key as string).capitalise().getString();

      rowHeads.set(key as string, {
        id: key as keyof T,
        label: label as keyof T,
      });
    });

  return rowHeads;
}

const dateFieldsArr = ['createdAt', 'updatedAt'];
const imageFieldsArr = ['avatar'];
const dateFields = new Set(dateFieldsArr);
const imageFields = new Set(imageFieldsArr);

function createUserRowData<T extends object>(
  data: T,
  dateFields: Set<string>,
  imageFields: Set<string>
): Map<string, TableBodyItem> {
  const rowData = new Map<string, TableBodyItem>();

  for (const [key, value] of Object.entries(data)) {
    let type: 'string' | 'image' | 'date' = 'string';

    if (imageFields.has(key)) {
      type = 'image';
    } else if (dateFields.has(key)) {
      type = 'date';
    }

    const dataItem: TableBodyItem = { name: key, value, type };
    rowData.set(key, dataItem);
  }

  return rowData;
}

export { getHeadLabels, dateFields, createUserRowData, imageFields };
