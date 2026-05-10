type Category = 'card' | 'deposit' | 'credit';

export type Product = {
  id: number;
  category: Category;
  categoryLabel: string;
  tag: null | string;
  name: string;
  description: string;
  stats: Array<{ label: string; value: string; unit: string }>;
  features: Array<string>;
};
