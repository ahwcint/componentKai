const statusData = {
  P2002: {
    user: {
      value: 'USERNAME ALREADY EXISTED',
    },
  },
} as const;

export type StatusCode = keyof typeof statusData;
export type EntityName = keyof (typeof statusData)[StatusCode];

export function responseStatusTranslator(
  status: StatusCode | string,
  EntityName: EntityName,
) {
  return statusData[status as StatusCode]?.[EntityName]?.value ?? '';
}
