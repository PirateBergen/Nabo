# Nabo — Base du site

Site statique en français, anglais et norvégien (bokmål), en HTML, CSS et JavaScript, sans dépendances ni installation.
Ouvrir `index.html` directement dans un navigateur pour le consulter.

## Fichiers

- `index.html` : navigation, accueil, aperçu du menu, présentation, contact et horaires, pied de page.
- `styles.css` : mise en page responsive et variables visuelles regroupées au début du fichier.

`script.js` traduit les textes, les libellés accessibles et les métadonnées. Le sélecteur de langue mémorise le choix si le navigateur autorise le stockage local. Sans JavaScript, le site reste disponible en français et le sélecteur est masqué. Les liens de navigation fonctionnent nativement, y compris sur mobile. Aucun service externe, police distante ou image n'est chargé.

Pour ajouter un texte traduit, lui attribuer une clé `data-i18n` dans le HTML et ajouter cette même clé aux dictionnaires `en` et `nb` dans `script.js`. Le français est lu directement depuis le HTML au chargement. Pour les attributs `aria-label`, utiliser `data-i18n-label`.

## Personnaliser

1. Modifier les textes dans `index.html`. Les commentaires signalent les contenus à compléter.
2. Ajouter le vrai menu, la présentation, l'adresse, les horaires et les coordonnées. Les informations inconnues sont explicitement marquées comme à venir.
3. Lorsque les coordonnées sont disponibles, ajouter des liens `tel:` et `mailto:` avec leurs vraies valeurs. Ajouter un lien de réservation uniquement lorsqu'une destination existe.
4. Modifier les variables au début de `styles.css` pour changer couleurs, police, largeur et espacements.
5. Mettre à jour le titre, la description et l'année du pied de page au besoin.

## Accessibilité et adaptation

La page utilise des régions sémantiques, des titres hiérarchisés, un lien d'accès direct au contenu, des indicateurs de focus visibles et une navigation toujours disponible. Les colonnes passent sur une seule colonne sur les petits écrans. Aucune animation n'est utilisée.

Cette base est locale et n'est pas publiée. Les fichiers sous `sources/` restent des références en lecture seule.
