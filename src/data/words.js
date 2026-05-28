export const CATEGORIES = [
  { id: 'family',   label: 'Family',   emoji: '👨‍👩‍👧', color: '#FF6B6B', bg: '#FFEBEE' },
  { id: 'food',     label: 'Food',     emoji: '🍽️',    color: '#FFA500', bg: '#FFF3E0' },
  { id: 'animals',  label: 'Animals',  emoji: '🐾',    color: '#4ECDC4', bg: '#E0F7FA' },
  { id: 'body',     label: 'Body',     emoji: '🫶',    color: '#7BC67E', bg: '#E8F5E9' },
  { id: 'objects',  label: 'Things',   emoji: '🏠',    color: '#5B9BD5', bg: '#EBF2FB' },
  { id: 'actions',  label: 'Actions',  emoji: '🏃',    color: '#F4A261', bg: '#FFF3E0' },
  { id: 'feelings', label: 'Feelings', emoji: '😊',    color: '#C9B1FF', bg: '#F3E5F5' },
];

export const WORDS = [
  // ── Family ──────────────────────────────────────────────────────────────────
  { id: 'family_mama',    category: 'family', emoji: '👩',    english: 'Mama',    filipino: 'Nanay',            bisaya: 'Inahan'          },
  { id: 'family_papa',    category: 'family', emoji: '👨',    english: 'Papa',    filipino: 'Tatay',            bisaya: 'Amahan'          },
  { id: 'family_baby',    category: 'family', emoji: '👶',    english: 'Baby',    filipino: 'Sanggol',          bisaya: 'Bata'            },
  { id: 'family_lola',    category: 'family', emoji: '👵',    english: 'Lola',    filipino: 'Lola',             bisaya: 'Lola'            },
  { id: 'family_lolo',    category: 'family', emoji: '👴',    english: 'Lolo',    filipino: 'Lolo',             bisaya: 'Lolo'            },
  { id: 'family_ate',     category: 'family', emoji: '👧',    english: 'Ate',     filipino: 'Ate',              bisaya: 'Ate'             },
  { id: 'family_kuya',    category: 'family', emoji: '👦',    english: 'Kuya',    filipino: 'Kuya',             bisaya: 'Kuya'            },
  { id: 'family_tito',    category: 'family', emoji: '🧔',    english: 'Tito',    filipino: 'Tito',             bisaya: 'Tito'            },
  { id: 'family_tita',    category: 'family', emoji: '👩‍🦰',   english: 'Tita',    filipino: 'Tita',             bisaya: 'Tita'            },
  { id: 'family_brother', category: 'family', emoji: '🧒‍♂️',  english: 'Brother', filipino: 'Kapatid na Lalaki',bisaya: 'Igsoon nga Lalaki'},
  { id: 'family_sister',  category: 'family', emoji: '🧒‍♀️',  english: 'Sister',  filipino: 'Kapatid na Babae', bisaya: 'Igsoon nga Babae' },

  // ── Food ────────────────────────────────────────────────────────────────────
  { id: 'food_rice',   category: 'food', emoji: '🍚', english: 'Rice',   filipino: 'Kanin',    bisaya: 'Kan-on'   },
  { id: 'food_water',  category: 'food', emoji: '💧', english: 'Water',  filipino: 'Tubig',    bisaya: 'Tubig'    },
  { id: 'food_milk',   category: 'food', emoji: '🥛', english: 'Milk',   filipino: 'Gatas',    bisaya: 'Gatas'    },
  { id: 'food_banana', category: 'food', emoji: '🍌', english: 'Banana', filipino: 'Saging',   bisaya: 'Saging'   },
  { id: 'food_fish',   category: 'food', emoji: '🐟', english: 'Fish',   filipino: 'Isda',     bisaya: 'Isda'     },
  { id: 'food_egg',    category: 'food', emoji: '🥚', english: 'Egg',    filipino: 'Itlog',    bisaya: 'Itlog'    },
  { id: 'food_bread',  category: 'food', emoji: '🍞', english: 'Bread',  filipino: 'Tinapay',  bisaya: 'Tinapay'  },
  { id: 'food_apple',  category: 'food', emoji: '🍎', english: 'Apple',  filipino: 'Mansanas', bisaya: 'Mansanas' },
  { id: 'food_juice',  category: 'food', emoji: '🧃', english: 'Juice',  filipino: 'Katas',    bisaya: 'Katas'    },

  // ── Animals ─────────────────────────────────────────────────────────────────
  { id: 'animals_cat',     category: 'animals', emoji: '🐱', english: 'Cat',     filipino: 'Pusa',   bisaya: 'Milo'   },
  { id: 'animals_dog',     category: 'animals', emoji: '🐶', english: 'Dog',     filipino: 'Aso',    bisaya: 'Iro'    },
  { id: 'animals_bird',    category: 'animals', emoji: '🐦', english: 'Bird',    filipino: 'Ibon',   bisaya: 'Langgam'},
  { id: 'animals_cow',     category: 'animals', emoji: '🐄', english: 'Cow',     filipino: 'Baka',   bisaya: 'Baka'   },
  { id: 'animals_pig',     category: 'animals', emoji: '🐷', english: 'Pig',     filipino: 'Baboy',  bisaya: 'Baboy'  },
  { id: 'animals_duck',    category: 'animals', emoji: '🦆', english: 'Duck',    filipino: 'Pato',   bisaya: 'Pato'   },
  { id: 'animals_frog',    category: 'animals', emoji: '🐸', english: 'Frog',    filipino: 'Palaka', bisaya: 'Palaka' },
  { id: 'animals_fish',    category: 'animals', emoji: '🐠', english: 'Fish',    filipino: 'Isda',   bisaya: 'Isda'   },
  { id: 'animals_chicken', category: 'animals', emoji: '🐔', english: 'Chicken', filipino: 'Manok',  bisaya: 'Manok'  },
  { id: 'animals_horse',   category: 'animals', emoji: '🐴', english: 'Horse',   filipino: 'Kabayo', bisaya: 'Kabayo' },

  // ── Body ────────────────────────────────────────────────────────────────────
  { id: 'body_eyes',  category: 'body', emoji: '👀', english: 'Eyes',  filipino: 'Mata',   bisaya: 'Mata'      },
  { id: 'body_nose',  category: 'body', emoji: '👃', english: 'Nose',  filipino: 'Ilong',  bisaya: 'Ilong'     },
  { id: 'body_mouth', category: 'body', emoji: '👄', english: 'Mouth', filipino: 'Bibig',  bisaya: 'Baba'      },
  { id: 'body_ear',   category: 'body', emoji: '👂', english: 'Ear',   filipino: 'Tainga', bisaya: 'Dalunggan' },
  { id: 'body_hand',  category: 'body', emoji: '✋', english: 'Hand',  filipino: 'Kamay',  bisaya: 'Kamot'     },
  { id: 'body_foot',  category: 'body', emoji: '🦶', english: 'Foot',  filipino: 'Paa',    bisaya: 'Tiil'      },
  { id: 'body_head',  category: 'body', emoji: '🗣️', english: 'Head',  filipino: 'Ulo',    bisaya: 'Ulo'       },
  { id: 'body_teeth', category: 'body', emoji: '🦷', english: 'Teeth', filipino: 'Ngipin', bisaya: 'Ngipon'    },
  { id: 'body_hair',  category: 'body', emoji: '💇', english: 'Hair',  filipino: 'Buhok',  bisaya: 'Buhok'     },

  // ── Things (everyday objects) ────────────────────────────────────────────────
  { id: 'objects_ball',  category: 'objects', emoji: '⚽', english: 'Ball',  filipino: 'Bola',    bisaya: 'Bola'    },
  { id: 'objects_book',  category: 'objects', emoji: '📚', english: 'Book',  filipino: 'Libro',   bisaya: 'Libro'   },
  { id: 'objects_cup',   category: 'objects', emoji: '☕', english: 'Cup',   filipino: 'Tasa',    bisaya: 'Tasa'    },
  { id: 'objects_spoon', category: 'objects', emoji: '🥄', english: 'Spoon', filipino: 'Kutsara', bisaya: 'Kutsara' },
  { id: 'objects_shoe',  category: 'objects', emoji: '👟', english: 'Shoe',  filipino: 'Sapatos', bisaya: 'Sapatos' },
  { id: 'objects_bed',   category: 'objects', emoji: '🛏️', english: 'Bed',   filipino: 'Kama',    bisaya: 'Katri'   },
  { id: 'objects_car',   category: 'objects', emoji: '🚗', english: 'Car',   filipino: 'Kotse',   bisaya: 'Kotse'   },
  { id: 'objects_chair', category: 'objects', emoji: '🪑', english: 'Chair', filipino: 'Silya',   bisaya: 'Silya'   },

  // ── Actions ──────────────────────────────────────────────────────────────────
  { id: 'actions_eat',   category: 'actions', emoji: '😋', english: 'Eat',   filipino: 'Kain',    bisaya: 'Kaon'   },
  { id: 'actions_drink', category: 'actions', emoji: '🥤', english: 'Drink', filipino: 'Inom',    bisaya: 'Inom'   },
  { id: 'actions_sleep', category: 'actions', emoji: '😴', english: 'Sleep', filipino: 'Tulog',   bisaya: 'Tulog'  },
  { id: 'actions_walk',  category: 'actions', emoji: '🚶', english: 'Walk',  filipino: 'Lakad',   bisaya: 'Lakaw'  },
  { id: 'actions_play',  category: 'actions', emoji: '🎮', english: 'Play',  filipino: 'Laro',    bisaya: 'Dula'   },
  { id: 'actions_sit',   category: 'actions', emoji: '🪑', english: 'Sit',   filipino: 'Upo',     bisaya: 'Lingkod'},
  { id: 'actions_come',  category: 'actions', emoji: '🙋', english: 'Come',  filipino: 'Halika',  bisaya: 'Dali'   },
  { id: 'actions_stop',  category: 'actions', emoji: '🛑', english: 'Stop',  filipino: 'Hinto',   bisaya: 'Hunong' },
  { id: 'actions_run',   category: 'actions', emoji: '🏃', english: 'Run',   filipino: 'Takbo',   bisaya: 'Dalagan'},
  { id: 'actions_jump',  category: 'actions', emoji: '🤸', english: 'Jump',  filipino: 'Tumalon', bisaya: 'Lukso'  },
  { id: 'actions_go',    category: 'actions', emoji: '👉', english: 'Go',    filipino: 'Pumunta', bisaya: 'Adto'   },
  { id: 'actions_open',  category: 'actions', emoji: '🚪', english: 'Open',  filipino: 'Buksan',  bisaya: 'Ablihi' },

  // ── Feelings & social words ──────────────────────────────────────────────────
  { id: 'feelings_happy',  category: 'feelings', emoji: '😊', english: 'Happy',  filipino: 'Masaya',    bisaya: 'Malipayon'  },
  { id: 'feelings_sad',    category: 'feelings', emoji: '😢', english: 'Sad',    filipino: 'Malungkot', bisaya: 'Masulob-on' },
  { id: 'feelings_hungry', category: 'feelings', emoji: '😋', english: 'Hungry', filipino: 'Gutom',     bisaya: 'Gutom'      },
  { id: 'feelings_tired',  category: 'feelings', emoji: '😴', english: 'Tired',  filipino: 'Pagod',     bisaya: 'Kapoy'      },
  { id: 'feelings_yes',    category: 'feelings', emoji: '✅', english: 'Yes',    filipino: 'Oo',        bisaya: 'Oo'         },
  { id: 'feelings_no',     category: 'feelings', emoji: '❌', english: 'No',     filipino: 'Hindi',     bisaya: 'Dili'       },
  { id: 'feelings_more',   category: 'feelings', emoji: '🤲', english: 'More',   filipino: 'Pa',        bisaya: 'Pa'         },
  { id: 'feelings_help',   category: 'feelings', emoji: '🆘', english: 'Help',   filipino: 'Tulong',    bisaya: 'Tabang'     },
  { id: 'feelings_want',   category: 'feelings', emoji: '👐', english: 'Want',   filipino: 'Gusto',     bisaya: 'Gusto'      },
  { id: 'feelings_hi',     category: 'feelings', emoji: '👋', english: 'Hi',     filipino: 'Kumusta',   bisaya: 'Kumusta'    },
  { id: 'feelings_bye',    category: 'feelings', emoji: '✌️', english: 'Bye',    filipino: 'Paalam',    bisaya: 'Babay'      },
  { id: 'feelings_please', category: 'feelings', emoji: '🙏', english: 'Please', filipino: 'Pakiusap',  bisaya: 'Palihug'    },
];

export const getCategoryWords = (categoryId) =>
  WORDS.filter((w) => w.category === categoryId);

export const getWordById = (id) => WORDS.find((w) => w.id === id);

export const getCategoryMeta = (categoryId) =>
  CATEGORIES.find((c) => c.id === categoryId);

export const getWordText = (word, language) => {
  if (language === 'filipino') return word.filipino;
  if (language === 'bisaya') return word.bisaya;
  return word.english;
};
