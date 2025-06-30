declare module 'plural-forms/minimal-safe';

declare module 'dedent' {
    export function dedent(literals: string): string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export function dedent(literals: TemplateStringsArray, ...placeholders: any[]): string;
    export default dedent;
}
