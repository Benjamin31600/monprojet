export const demoChild = {
  id: 'child-demo-1', firstName: 'Léo', age: '22 mois', group: 'Les Renardeaux',
  allergies: ['Arachides'], emergency: 'Marie — 514 555-0132'
};

export const today = [
  { time: '08:14', type: 'Arrivée', title: 'Léo est arrivé', detail: 'Accueil par Amélie · bonne humeur', icon: 'sunny-outline' as const },
  { time: '09:20', type: 'Activité', title: 'Peinture avec des éponges', detail: 'Motricité fine · couleurs · 25 min', icon: 'color-palette-outline' as const },
  { time: '11:36', type: 'Repas', title: 'Dîner', detail: 'Poulet, riz et légumes · très bon appétit', icon: 'restaurant-outline' as const },
  { time: '12:42', type: 'Sieste', title: 'Sieste en cours', detail: 'Endormi à 12:42', icon: 'moon-outline' as const }
];

export const groupChildren = [
  { name: 'Léo', status: 'Présent', note: 'Arachides', tone: 'butter' },
  { name: 'Emma', status: 'Présente', note: 'RAS', tone: 'mint' },
  { name: 'Noah', status: 'Présent', note: 'Inhalateur', tone: 'sky' },
  { name: 'Alice', status: 'Absente', note: 'Vacances', tone: 'lavender' }
] as const;
