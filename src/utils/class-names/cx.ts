type Falsy = false | 0 | 0n | "" | null | undefined;
type ClassArray = string | Falsy | ClassArray[];

export default function cx(...classes: ClassArray[]) {
  return classes
    .flat(20)
    .filter((c) => c)
    .join(" ");
}
