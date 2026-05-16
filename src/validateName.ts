export function validateName(name: string): boolean {
    return !!name.match(/^[A-Z][a-z]+ [A-Z][a-z]+$/);
}
