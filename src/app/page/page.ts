export class Page<T>
{
  content: Array<T>;
  last: boolean;
  first: boolean;
  number: number;
  totalPages: number;
}
