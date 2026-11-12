export type Photo = {
  id: string;
  title: string;
  author: string;
  url: string;
  description: string;
  camera?: string;
  location?: string;
};

export const photos: Photo[] = [
  {
    id: "1",
    title: "Mountain Sunrise",
    author: "Elena Rostova",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    description: "Golden hour over the snow-capped Alpine peaks.",
    camera: "Sony A7R IV • 24-70mm f/2.8",
    location: "Swiss Alps",
  },
  {
    id: "2",
    title: "Urban Architecture",
    author: "Marcus Chen",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "Minimalist glass and steel facade reflecting morning light.",
    camera: "Fujifilm X-T4 • 16-55mm f/2.8",
    location: "Tokyo, Japan",
  },
  {
    id: "3",
    title: "Deep Forest Pathway",
    author: "Sarah Jenkins",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    description: "Misty pine forest shrouded in peaceful morning fog.",
    camera: "Canon EOS R5 • 50mm f/1.2",
    location: "Pacific Northwest, USA",
  },
  {
    id: "4",
    title: "Coastal Sunset",
    author: "Liam O'Connor",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description: "Gentle evening waves rolling onto the untouched golden sand.",
    camera: "Nikon Z7 II • 24-120mm f/4",
    location: "Maui, Hawaii",
  },
];
