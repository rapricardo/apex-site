export class InputError extends Error {
  constructor(public code: string, message: string) { super(message); }
}
export type Schema = {
  type: 'object' | 'array' | 'string' | 'integer' | 'boolean';
  properties?: Record<string, Schema>;
  required?: string[];
  additionalProperties?: false;
  items?: Schema;
  minItems?: number;
  maxItems?: number;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  enum?: readonly (string | number | boolean)[];
  description?: string;
};
export const textSchema = (maxLength = 1500, minLength = 1): Schema => ({ type: 'string', minLength, maxLength });
export const enumSchema = (values: readonly string[]): Schema => ({ type: 'string', enum: values });
export const objectSchema = (properties: Record<string, Schema>, required = Object.keys(properties)): Schema => ({ type: 'object', properties, required, additionalProperties: false });
export const arraySchema = (items: Schema, maxItems: number, minItems = 1): Schema => ({ type: 'array', items, minItems, maxItems });
export const revisionSchema: Schema = { type: 'integer', minimum: 0, maximum: Number.MAX_SAFE_INTEGER - 1 };
export function isRecord(input: unknown): input is Record<string, unknown> {
  return input !== null && typeof input === 'object' && !Array.isArray(input) && (Object.getPrototypeOf(input) === Object.prototype || Object.getPrototypeOf(input) === null);
}

// Validar no runtime as mesmas restrições anunciadas no contrato das ferramentas.
export function validate(schema: Schema, input: unknown, path = 'input'): void {
  const fail = (message: string): never => { throw new InputError('invalid_input', `${path}: ${message}`); };
  if (schema.type === 'object') {
    if (!isRecord(input)) return fail('esperado objeto');
    for (const key of Object.keys(input)) {
      if (!Object.hasOwn(schema.properties ?? {}, key)) fail(`campo desconhecido: ${key}`);
    }
    for (const key of schema.required ?? []) if (!Object.hasOwn(input, key)) fail(`campo obrigatório: ${key}`);
    for (const [key, value] of Object.entries(input)) validate(schema.properties![key], value, `${path}.${key}`);
  } else if (schema.type === 'array') {
    if (!Array.isArray(input)) return fail('esperada lista');
    if (input.length < (schema.minItems ?? 0) || input.length > (schema.maxItems ?? 100)) fail('quantidade de itens inválida');
    input.forEach((item, index) => validate(schema.items!, item, `${path}[${index}]`));
  } else if (schema.type === 'string') {
    if (typeof input !== 'string') return fail('esperado texto');
    if (input.trim().length < (schema.minLength ?? 0) || input.length > (schema.maxLength ?? 10000)) fail('tamanho de texto inválido');
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(input)) fail('caractere de controle não permitido');
  } else if (schema.type === 'integer') {
    if (typeof input !== 'number' || !Number.isSafeInteger(input) || input < (schema.minimum ?? 0) || input > (schema.maximum ?? Number.MAX_SAFE_INTEGER)) fail('inteiro fora do intervalo');
  } else if (schema.type === 'boolean' && typeof input !== 'boolean') fail('esperado booleano');
  if (schema.enum && !schema.enum.includes(input as string | number | boolean)) fail(`valor deve ser um de: ${schema.enum.join(', ')}`);
}
