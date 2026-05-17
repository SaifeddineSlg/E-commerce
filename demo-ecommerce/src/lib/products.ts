export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "T-Shirt Premium",
    description: "T-shirt en coton bio, coupe moderne et confortable.",
    price: 29.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    stock: 50,
  },
  {
    id: "2",
    name: "Jean Slim",
    description: "Jean slim stretch, parfait pour toutes les occasions.",
    price: 59.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    stock: 30,
  },
  {
    id: "3",
    name: "Sneakers Urban",
    description: "Chaussures de ville légères et stylées.",
    price: 89.99,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    stock: 20,
  },
  {
    id: "4",
    name: "Casque Bluetooth",
    description: "Son haute qualité, réduction de bruit active.",
    price: 149.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    stock: 15,
  },
  {
    id: "5",
    name: "Montre Connectée",
    description: "Suivi fitness, notifications, autonomie 7 jours.",
    price: 199.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    stock: 10,
  },
  {
    id: "6",
    name: "Sac à Dos",
    description: "Sac robuste 30L, compartiment laptop 15 pouces.",
    price: 49.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    stock: 25,
  },
  {
    id: "7",
    name: "Lunettes de Soleil",
    description: "Protection UV400, monture légère en acétate.",
    price: 79.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    stock: 40,
  },
  {
    id: "8",
    name: "Veste en Cuir",
    description: "Cuir véritable, doublure confortable, coupe ajustée.",
    price: 249.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    stock: 8,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const categories = [...new Set(products.map((p) => p.category))];
