import type { KeyboardCommand } from './useKeyboardShortcuts'
import type { NextRouter } from 'next/router'

export function navigationCommands(
  router: NextRouter | undefined
): KeyboardCommand[] {
  return [
    {
      shortcutKeys: ['g', 'h'],
      actionDescription: 'Go to Home',
      shortcutKeyDescription: 'g then h',
      callback: () => router?.push('/home'),
    },
    // {
    //   shortcutKeys: ['g', 'd'],
    //   callback: () => router.push('/discover'),
    // },
    {
      shortcutKeys: ['b|u'],
      actionDescription: 'Go back',
      shortcutKeyDescription: 'b or u',
      callback: () => router?.back(),
    },
  ]
}

type SearchBarKeyboardAction = 'focusSearchBar' | 'clearSearch'

export function searchBarCommands(
  actionHandler: (action: SearchBarKeyboardAction) => void
): KeyboardCommand[] {
  return [
    {
      shortcutKeys: ['/'],
      actionDescription: 'Focus search bar',
      shortcutKeyDescription: '/',
      callback: () => setTimeout(() => actionHandler('focusSearchBar'), 0),
    },
    {
      shortcutKeys: ['x'],
      actionDescription: 'Clear search bar',
      shortcutKeyDescription: 'x',
      callback: () => actionHandler('clearSearch'),
    },
  ]
}

type PrimaryKeyboardAction =
  | 'themeDarker'
  | 'themeLighter'
  | 'toggleShortcutHelpModalDisplay'

// use these on all authenticated pages
export function primaryCommands(
  actionHandler: (action: PrimaryKeyboardAction) => void
): KeyboardCommand[] {
  return [
    {
      shortcutKeys: ['v', 'd'],
      actionDescription: 'Change theme (darker)',
      shortcutKeyDescription: 'v then d',
      callback: () => actionHandler('themeDarker'),
    },
    {
      shortcutKeys: ['v', 'l'],
      actionDescription: 'Change theme (lighter)',
      shortcutKeyDescription: 'v then l',
      callback: () => actionHandler('themeLighter'),
    },
    {
      shortcutKeys: ['?'],
      actionDescription: 'Show keyboard shortcuts',
      shortcutKeyDescription: '?',
      callback: () => actionHandler('toggleShortcutHelpModalDisplay'),
    },
  ]
}

type LibraryListKeyboardAction =
  | 'openArticle'
  | 'openOriginalArticle'
  | 'moveFocusToNextListItem'
  | 'moveFocusToPreviousListItem'
  | 'moveFocusToNextRowItem'
  | 'moveFocusToPreviousRowItem'
  | 'archiveItem'
  | 'markItemAsRead'
  | 'markItemAsUnread'
  | 'sortDescending'
  | 'sortAscending'
  | 'shareItem'
  | 'showAddLinkModal'

export function libraryListCommands(
  actionHandler: (action: LibraryListKeyboardAction) => void
): KeyboardCommand[] {
  return [
    {
      shortcutKeys: ['enter'],
      actionDescription: 'Open article',
      shortcutKeyDescription: 'enter/return',
      callback: () => actionHandler('openArticle'),
    },
    {
      shortcutKeys: ['o'],
      actionDescription: 'Open original article',
      shortcutKeyDescription: 'o',
      callback: () => actionHandler('openOriginalArticle'),
    },
    {
      shortcutKeys: ['a'],
      actionDescription: 'Open Add Link dialog',
      shortcutKeyDescription: 'a',
      callback: () => actionHandler('showAddLinkModal'),
    },
    {
      shortcutKeys: ['j|arrowright'],
      actionDescription: 'Focus next item in list',
      shortcutKeyDescription: 'j or right arrow',
      callback: () => actionHandler('moveFocusToNextListItem'),
    },
    {
      shortcutKeys: ['k|arrowleft'],
      actionDescription: 'Focus previous item in list',
      shortcutKeyDescription: 'k or left arrow',
      callback: () => actionHandler('moveFocusToPreviousListItem'),
    },
    {
      shortcutKeys: ['e'],
      actionDescription: 'Archive item',
      shortcutKeyDescription: 'e',
      callback: () => actionHandler('archiveItem'),
    },
    {
      shortcutKeys: ['shift', 'i'],
      actionDescription: 'Mark item as read',
      shortcutKeyDescription: 'shift + i',
      callback: () => actionHandler('markItemAsRead'),
    },
    {
      shortcutKeys: ['shift', 'u'],
      actionDescription: 'Mark item as unread',
      shortcutKeyDescription: 'shift + u',
      callback: () => actionHandler('markItemAsUnread'),
    },
    {
      shortcutKeys: ['shift', 's'],
      actionDescription: 'Open share modal',
      shortcutKeyDescription: 'shift + s',
      callback: () => actionHandler('shareItem'),
    },
    {
      shortcutKeys: ['s', 'o'],
      actionDescription: 'Sort item in ascending order',
      shortcutKeyDescription: 's then o',
      callback: () => actionHandler('sortAscending'),
    },
    {
      shortcutKeys: ['s', 'n'],
      actionDescription: 'Sort item in descending order',
      shortcutKeyDescription: 's then n',
      callback: () => actionHandler('sortDescending'),
    },
    {
      shortcutKeys: ['arrowdown'],
      actionDescription: 'Move cursor to the next row',
      shortcutKeyDescription: 'v',
      callback: () => actionHandler('moveFocusToNextRowItem'),
    },
    {
      shortcutKeys: ['arrowup'],
      actionDescription: 'Move cursor to the previous row',
      shortcutKeyDescription: 'f',
      callback: () => actionHandler('moveFocusToPreviousRowItem'),
    }
  ]
}

type HighlightBarKeyboardAction =
  | 'createHighlight'
  | 'openNoteModal'
  | 'openPostModal'

export function highlightBarKeyboardCommands(
  actionHandler: (action: HighlightBarKeyboardAction) => void
): KeyboardCommand[] {
  return [
    {
      shortcutKeys: ['shift', 'h'],
      actionDescription: 'Highlight selected text',
      shortcutKeyDescription: 'shift + h',
      callback: () => actionHandler('createHighlight'),
    },
    {
      shortcutKeys: ['shift', 'c'],
      actionDescription: 'Annotate selected text',
      shortcutKeyDescription: 'shift + c',
      callback: () => setTimeout(() => actionHandler('openNoteModal'), 0),
    },
    // {
    //   shortcutKeys: ['shift', 's'],
    //   actionDescription: 'Highlight selected text',
    //   shortcutKeyDescription: 'shift + h',
    //   callback: () => actionHandler('openPostModal'),
    // },
  ]
}

type ArticleKeyboardAction =
  | 'openOriginalArticle'
  | 'incrementFontSize'
  | 'decrementFontSize'
  | 'editLabels'

export function articleKeyboardCommands(
  actionHandler: (action: ArticleKeyboardAction) => void
): KeyboardCommand[] {
  return [
    {
      shortcutKeys: ['o'],
      actionDescription: 'Open original article page',
      shortcutKeyDescription: 'o',
      callback: () => actionHandler('openOriginalArticle'),
    },
    {
      shortcutKeys: ['+'],
      actionDescription: 'Increase font size',
      shortcutKeyDescription: '+',
      callback: () => actionHandler('incrementFontSize'),
    },
    {
      shortcutKeys: ['-'],
      actionDescription: 'Decrease font size',
      shortcutKeyDescription: '-',
      callback: () => actionHandler('decrementFontSize'),
    },
    {
      shortcutKeys: ['l'],
      actionDescription: 'Edit labels',
      shortcutKeyDescription: 'l',
      callback: () => actionHandler('editLabels'),
    },
  ]
}
