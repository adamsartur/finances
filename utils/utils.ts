export function convertUnix(unixDate: number) {
  const date = new Date(unixDate * 1000);
  return date.toLocaleDateString();
}

export function convertBrl(value: number) {
  let amount = value / 100;

  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
export function convertStringToNumber(str: string): number {
  const num: number = Number(str.replace(/\D/g, ""));
  let numReturn = num * 100;
  return str.startsWith("-") ? -numReturn : numReturn;
}
