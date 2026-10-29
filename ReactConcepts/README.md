# React Task Tracker

A small task-tracking app built with React and Vite. It demonstrates React fundamentals through a usable interface: add tasks, mark them complete, edit or delete them, filter the list, and track progress.

## Features

- Add tasks; blank submissions are ignored.
- Mark tasks complete or active.
- Edit a task by double-clicking its text. Press Enter or leave the field to save.
- Delete individual tasks or clear all completed tasks.
- Filter the list to show all, active, or completed tasks.
- View completed-task counts and a progress bar.
- Switch between light and dark themes.
- Keep tasks in browser `localStorage` between visits.
- Update the browser tab title with the number of tasks remaining.

Tasks are stored locally in the current browser. They are not synced between browsers or devices.

## React concepts in this project

### Components and composition

The UI is split into focused, reusable components: `Header`, `TaskForm`, `Filters`, `TaskList`, `TaskItem`, and `Stats`. `App` composes them into the page, while `main.jsx` mounts the app and wraps it in `ThemeProvider`.

### Props and one-way data flow

`App` owns the task list and passes data and event handlers down as props. For example, `TaskList` passes each task and its callbacks to `TaskItem`. Child components request changes through callbacks rather than changing the parent's state directly.

### State and event handling

`useState` stores the selected filter, form input, theme, and task-editing state. User actions are handled with React event handlers such as `onSubmit`, `onChange`, and `onClick`.

Task updates use immutable array operations such as `map` and `filter`. When updating based on the previous state, the app uses the functional setter form to avoid relying on a stale value.

### Controlled inputs and refs

The task form and task editor are controlled inputs: their displayed values come from React state and update through `onChange`. `TaskForm` uses `useRef` to focus the input when the component mounts and after a task is added.

### Context and custom hooks

`ThemeProvider` exposes the theme and `toggleTheme` through React Context. `useTheme` provides a small reusable interface for reading that context in `App` and `Header`.

`useLocalStorage` is a custom hook that initializes state from `localStorage` and writes updates back with an effect. This keeps persistence logic separate from the task UI.

### Effects and memoization

`useEffect` updates the browser tab title when task counts change and applies the selected theme to the document body. `useMemo` derives the visible tasks from the task list and current filter.

### Rendering lists and conditional UI

`TaskList` renders tasks with `map` and a stable `key`. The app uses conditional rendering for the empty-list message, the inline task editor, and the “Clear completed” button. `Stats` derives the completion percentage from its props.

## Getting started

You'll need Node.js and npm installed.

```bash
npm ci
npm run dev
```

Vite prints a local URL in the terminal; open it in your browser.

## Available scripts

Run these commands from the project directory:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |

## Project structure

```text
src/
  components/       UI components for tasks, filters, header, and stats
  context/          Theme context, provider, and hook
  hooks/            Reusable localStorage hook
  App.jsx           Task state and app composition
  main.jsx          React entry point
```
