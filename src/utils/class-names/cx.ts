const cx = (...classes: (string | false | 0 | 0n | null | undefined)[]) =>
  classes.filter((c) => c).join(" ");

export default cx;
