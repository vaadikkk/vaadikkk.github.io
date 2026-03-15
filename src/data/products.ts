export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    price: 999,
    category: "iPhone",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop",
    description: "Титан. Такой прочный. Такой легкий. Такой Pro.",
    features: ["Чип A17 Pro", "Титановый корпус", "Кнопка действия", "Основная камера 48 Мп"]
  },
  {
    id: "macbook-pro-14",
    name: "MacBook Pro 14\"",
    price: 1599,
    category: "Mac",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
    description: "Поражает воображение. Притягивает взгляды.",
    features: ["Чип M3", "Дисплей Liquid Retina XDR", "До 22 часов работы от батареи", "Камера FaceTime HD 1080p"]
  },
  {
    id: "ipad-pro",
    name: "iPad Pro",
    price: 799,
    category: "iPad",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop",
    description: "Невероятная мощь чипа M2.",
    features: ["Чип M2", "Дисплей Liquid Retina", "Технология ProMotion", "Face ID"]
  },
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2",
    price: 799,
    category: "Watch",
    image: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=1000&auto=format&fit=crop",
    description: "Новый уровень приключений.",
    features: ["Чип S9 SiP", "Всегда включенный дисплей Retina", "До 36 часов работы от батареи", "Точный двухчастотный GPS"]
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro (2-го поколения)",
    price: 249,
    category: "AirPods",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1000&auto=format&fit=crop",
    description: "Магическое соединение с вашими устройствами.",
    features: ["Чип H2", "Активное шумоподавление", "Адаптивное аудио", "Персонализированное пространственное аудио"]
  },
  {
    id: "imac-24",
    name: "iMac 24\"",
    price: 1299,
    category: "Mac",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop",
    description: "Еще больше цвета. Еще больше мощи.",
    features: ["Чип M3", "24-дюймовый дисплей 4.5K Retina", "Камера FaceTime HD 1080p", "Микрофоны студийного качества"]
  }
];
