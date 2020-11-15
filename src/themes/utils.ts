import { themes } from './index';

export interface ITheme {
    [key: string]: string;
}

export interface IThemes {
    [key: string]: ITheme;
}

export interface IMappedTheme {
    [key: string]: string | null;
}

export const mapTheme = (variables: ITheme): IMappedTheme => {
    return {
        '--color-text-primary': variables.textPrimary || '',
        '--color-text-secondary': variables.textSecondary|| '',
        '--background-primary': variables.backgroundPrimary || '',
        '--background-secondary': variables.backgroundSecondary || '',
        '--background-hover': variables.backgroundHover || '',
        '--background-blockquote': variables.blockquoteBackground || '',
        '--background-inline-code': variables.inlineCodeBackground || '',
    };
};

export const applyTheme = (theme: string): void => {
    const themeObject: IMappedTheme = mapTheme(themes[theme]);
    if (!themeObject) return;

    const root = document.documentElement;

    Object.keys(themeObject).forEach((property) => {
        if (property === 'name') {
            return;
        }

        root.style.setProperty(property, themeObject[property]);
    });
};

export const extend = (
    extending: ITheme,
    newTheme: ITheme
  ): ITheme => {
    return { ...extending, ...newTheme };
  };