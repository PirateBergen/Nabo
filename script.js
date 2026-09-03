// Le norvégien reste disponible dans le HTML, même sans JavaScript.
// Ajouter les futurs textes avec une clé data-i18n et ses traductions ici.
(() => {
  const translations = {
    en: {
      language: 'Language', skip: 'Skip to content', homeLabel: 'Nabo — Home',
      navigation: 'Main navigation', home: 'Home', menu: 'Menu', about: 'About',
      contact: 'Contact', restaurant: 'Restaurant',
      intro: 'Simple, generous, seasonal food.', discoverMenu: 'Explore the menu',
      findUs: 'Find us', ourMenu: 'Our menu', menuIntro: 'Discover our selection of dishes.',
      menuSoon: 'The menu will be available here soon.', aboutNabo: 'About Nabo',
      aboutIntro: 'Our food, our team, our story.', aboutSoon: 'We’ll share more with you soon.',
      address: 'Address', addressSoon: 'Address and city coming soon.',
      hours: 'Opening hours', hoursSoon: 'Opening hours coming soon.',
      contactSoon: 'Phone number and email coming soon.',
      title: 'Nabo — Restaurant',
      description: 'Nabo restaurant. Discover our food and find practical information for your visit.'
    },
    nb: {
      language: 'Språk', skip: 'Hopp til innhold', homeLabel: 'Nabo — Hjem',
      navigation: 'Hovedmeny', home: 'Hjem', menu: 'Meny', about: 'Om oss',
      contact: 'Kontakt', restaurant: 'Restaurant',
      intro: 'Enkel og raus mat med sesongens råvarer.', discoverMenu: 'Se menyen',
      findUs: 'Finn oss', ourMenu: 'Menyen vår', menuIntro: 'Oppdag vårt utvalg av retter.',
      menuSoon: 'Menyen kommer snart her.', aboutNabo: 'Om Nabo',
      aboutIntro: 'Maten vår, menneskene våre, historien vår.', aboutSoon: 'Vi forteller snart mer.',
      address: 'Adresse', addressSoon: 'Adresse og sted kommer snart.',
      hours: 'Åpningstider', hoursSoon: 'Åpningstidene kommer snart.',
      contactSoon: 'Telefonnummer og e-postadresse kommer snart.',
      title: 'Nabo — Restaurant',
      description: 'Nabo restaurant. Oppdag maten vår og finn praktisk informasjon før besøket ditt.'
    }
  };
  const textNodes = document.querySelectorAll('[data-i18n]');
  const labelNodes = document.querySelectorAll('[data-i18n-label]');
  const description = document.querySelector('meta[name="description"]');
  const selector = document.querySelector('#language');
  const storageKey = 'nabo-language';
  function setLanguage(language) {
    const validLanguage = Object.hasOwn(translations, language) ? language : 'nb';
    const copy = translations[validLanguage];
    textNodes.forEach(node => { node.textContent = copy[node.dataset.i18n]; });
    labelNodes.forEach(node => { node.setAttribute('aria-label', copy[node.dataset.i18nLabel]); });
    document.documentElement.lang = validLanguage;
    document.title = copy.title;
    description.content = copy.description;
    selector.value = validLanguage;
  }

  let savedLanguage = 'nb';
  // Certains navigateurs bloquent le stockage en mode privé ou pour les fichiers locaux.
  try { savedLanguage = localStorage.getItem(storageKey) || 'nb'; } catch { /* Garder le norvégien. */ }
  setLanguage(savedLanguage);
  selector.addEventListener('change', () => {
    setLanguage(selector.value);
    try { localStorage.setItem(storageKey, selector.value); } catch { /* La traduction reste utilisable. */ }
  });
  document.querySelector('.language-picker').hidden = false;
})();
