
export const createLanguageLink = (slug, lang) => {
    // const rawSlug = slug.replace(`${lang}/`, '');
    return targetLang =>
        targetLang === 'en' ? `/${slug}` : `/${targetLang}/${slug}`;
};