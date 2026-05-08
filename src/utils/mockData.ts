import { Mudra, CommunityPost } from '../types';

export const mockMudras: Mudra[] = [
  {
    id: '1',
    name: 'Pataka',
    sanskritName: 'पताका',
    meaning: 'Flag',
    description: 'All fingers extended and joined together',
    imageUrl: 'https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'easy',
    category: 'asamyukta',
    usage: ['Wind', 'Rain', 'River', 'Horse']
  },
  {
    id: '2',
    name: 'Tripataka',
    sanskritName: 'त्रिपताका',
    meaning: 'Three Parts of Flag',
    description: 'Ring finger bent while other fingers extended',
    imageUrl: 'https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'easy',
    category: 'asamyukta',
    usage: ['Tree', 'Lightning', 'Lamp']
  },
  {
    id: '3',
    name: 'Kartarimukha',
    sanskritName: 'कर्तरीमुख',
    meaning: 'Scissors Face',
    description: 'Index and middle fingers separated like scissors',
    imageUrl: 'https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'medium',
    category: 'asamyukta',
    usage: ['Disagreement', 'Separation', 'Death']
  },
  {
    id: '4',
    name: 'Mayura',
    sanskritName: 'मयूर',
    meaning: 'Peacock',
    description: 'Thumb touching tip of ring finger',
    imageUrl: 'https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'medium',
    category: 'asamyukta',
    usage: ['Peacock', 'Beauty', 'Pride']
  },
  {
    id: '5',
    name: 'Ardhachandra',
    sanskritName: 'अर्धचन्द्र',
    meaning: 'Half Moon',
    description: 'Thumb bent and other fingers curved',
    imageUrl: 'https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'medium',
    category: 'asamyukta',
    usage: ['Moon', 'Night', 'Shiva']
  },
  {
    id: '6',
    name: 'Arala',
    sanskritName: 'आराल',
    meaning: 'Bent',
    description: 'Index finger and thumb form a circle',
    imageUrl: 'https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'hard',
    category: 'asamyukta',
    usage: ['Poison', 'Drinking', 'Medicine']
  }
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    userId: '1',
    author: 'Priya Sharma',
    title: 'Mastering the Alapadma Mudra - Tips from my Guru',
    content: 'After 3 months of practice, I finally got the perfect hand position for Alapadma. Here are some tips that helped me...',
    likes: 45,
    comments: 12,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    userId: '2',
    author: 'Rahul Krishnan',
    title: 'My Bharatanatyam Performance - Feedback Welcome!',
    content: 'Just completed my first solo performance of Varnam in Kamboji raga. The AI feedback was incredibly helpful!',
    videoUrl: 'https://example.com/video1',
    likes: 78,
    comments: 23,
    createdAt: new Date('2024-01-10')
  },
  {
    id: '3',
    userId: '3',
    author: 'Meera Nair',
    title: 'The Cultural Significance of Mudras in Storytelling',
    content: 'Understanding the deep cultural roots behind each gesture has transformed my dance practice...',
    likes: 92,
    comments: 31,
    createdAt: new Date('2024-01-08')
  }
];