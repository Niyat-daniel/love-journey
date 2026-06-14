import { MemoryCard, LoveReason } from './types';

export const MEMORIES: MemoryCard[] = [
  {
    id: 'first_conv',
    date: 'September 14, 2024',
    title: 'Our First Conversation',
    description: 'It started with a simple, nervous greeting, but very quickly turned into hours of endless chatter. I remember staying up late, staring at my screen with a smile I couldn\'t wipe away. That was the spark that started it all.',
    image: '/first_conversation.jpg'
  },
  {
    id: 'first_laugh',
    date: 'October 02, 2024',
    title: 'The First Time We Laughed',
    description: 'A silly joke, a synchronous giggle, and suddenly the distance disappeared. In that moment, watching your eyes crinkle and hearing your heartwarming belly laugh, I realized your joy was infectious, and I wanted to be the source of it forever.',
    image: '/time_we_laughed.jpg'
  },
  {
    id: 'fav_moment',
    date: 'December 25, 2024',
    title: 'Our Favorite Moment',
    description: 'Sitting cozy together, watching the soft lights twinkle while time stood absolutely still. No rush, no worries, just the magic of your presence. In that beautiful quiet, I felt a deep peace I had never known before.',
    image: '/favorite_moment.jpg'
  },
  {
    id: 'knew_i_loved',
    date: 'February 14, 2025',
    title: 'The Day I Knew I Loved You',
    description: 'Watching the warm rays of the golden-hour sunset reflect in your eyes while we held hands, it was like the universe suddenly made perfect sense. I knew without a single doubt in my soul that you were my forever.',
    image: '/day_i_knew_love.jpg'
  }
];

export const REASONS: LoveReason[] = [
  {
    id: 'smile',
    icon: 'Sparkles',
    title: 'Your Smile',
    description: 'The way your entire face lights up, instantly dissolving my darkest days into pure light. It\'s my favorite view in the whole world.'
  },
  {
    id: 'kindness',
    icon: 'Heart',
    title: 'Your Kindness',
    description: 'How deeply you care for others, always spreading soft warmth and lifting everyone around you with absolute sincerity and grace.'
  },
  {
    id: 'support',
    icon: 'Shield',
    title: 'Your Constant Support',
    description: 'Being my ultimate anchor and cheerleader. Through every high and low, knowing you are standing by me gives me limitless strength.'
  },
  {
    id: 'laugh',
    icon: 'Music',
    title: 'Your Laugh',
    description: 'The sweet, melodic symphony that fills any room with absolute goodness. It\'s a beautiful sound that I will never get tired of hearing.'
  },
  {
    id: 'better',
    icon: 'Sun',
    title: 'How You Improve My Life',
    description: 'You make me want to grow, to be a better human being every single day. You bring out the absolute best version of me.'
  },
  {
    id: 'presence',
    icon: 'Compass',
    title: 'Your Inner Peace',
    description: 'Even in a chaotic world, sitting beside you makes all the noise fade away into beautiful, calming silence. You are my home.'
  }
];

export const NO_RESPONSES = [
  "Are you sure? 🥺",
  "Think again ❤️",
  "I know the answer 😘",
  "You can't escape love! 😆",
  "But my heart beats only for you! 💕",
  "Clicking this is physically impossible! 😉",
  "Nice try, princess! 👑",
  "Give in to love! 🥰",
  "Error: Option unavailable! 🚫❤️"
];
