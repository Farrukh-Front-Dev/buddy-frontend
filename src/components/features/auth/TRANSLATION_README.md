# Auth & Team Multi-Language Support

## Overview
Auth and Team pages now support 3 languages: **Uzbek (UZ)**, **Russian (RU)**, and **English (EN)**.

## Translation Files

### Auth Translations
- `src/locales/uz/auth.json` - Uzbek (default)
- `src/locales/ru/auth.json` - Russian
- `src/locales/en/auth.json` - English

### Team Translations
- `src/locales/uz/team.json` - Uzbek (default)
- `src/locales/ru/team.json` - Russian
- `src/locales/en/team.json` - English

## Usage

### In Auth Components
```tsx
import { useTranslation } from '../../../hooks/useTranslation';

const MyComponent = () => {
  const { t } = useTranslation('auth');
  
  return <h1>{t('header.login_title', 'Xush kelibsiz!')}</h1>;
};
```

### In Team Component
```tsx
import { useTranslation } from '../../hooks/useTranslation';

const Team = () => {
  const { t } = useTranslation('team');
  
  return <h1>{t('title_highlight', 'Kuratorlar')}</h1>;
};
```

## Translation Keys

### Auth Keys
- `header.*` - Page headers and titles
- `roles.*` - Role names (student, curator)
- `form.*` - Form labels and placeholders
- `buttons.*` - Button text
- `toggle.*` - Toggle between login/signup

### Team Keys
- `title_*` - Section titles
- `description_*` - Section descriptions
- `select_*` - Selection prompts and descriptions
- `*_buddy` - Buddy type labels
- `empty_*` - Empty state messages

## Language Switching
Users can switch languages using the LanguageSwitcher component in the navbar. The selected language is persisted in localStorage.

## Adding New Translations
1. Add the key-value pair to all 3 language files (uz, ru, en)
2. Use the translation in your component: `t('your.key', 'Default Value')`
3. Test language switching to verify all translations work

## Components Updated
- ✅ AuthHeader
- ✅ RoleSelector
- ✅ FormInput (via AuthPage)
- ✅ PasswordInput
- ✅ SubmitButton
- ✅ AuthToggle
- ✅ Team
- ✅ TeamMemberCard
- ✅ EmptyState
