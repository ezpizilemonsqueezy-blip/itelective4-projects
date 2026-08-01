# Creative Studio Dashboard

A React + TypeScript + Vite application built as a creative project management dashboard. This project demonstrates modern React state management patterns, reusable hooks, and a clean UI for presenting project status and hidden detail views.

## Overview

This dashboard displays a list of active projects with:

- current status labels
- priority indicators
- a hidden detail section that appears when the user toggles "Show details"
- search filtering using an input field

The app is intentionally designed for classroom demonstration of React fundamentals, including `useState`, `useEffect`, `useRef`, and custom hooks.

## Key Features

- `useState` for managing project data, loading state, search input, and detail visibility
- `useEffect` to simulate loading mock data on component mount
- `useRef` to automatically focus the search input after data loads
- `useToggle` custom hook for compact boolean state toggling
- `usePrevious` custom hook for tracking previous values across renders
- Clean card-based UI with conditional detail rendering
- Simple project search and visual status badges

## Files and Structure

- `src/App.tsx` — main dashboard UI and project list component
- `src/hooks/useToggle.ts` — reusable `useToggle` hook with explicit return types
- `src/hooks/usePrevious.ts` — reusable `usePrevious` hook that tracks previous state values
- `src/index.css` — base styling for the app layout
- `index.html` — Vite entry point

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open the application in your browser using the local Vite URL.

## How the app works

1. When the page loads, `ProjectList` starts with empty state and a loading indicator.
2. A `useEffect` hook simulates fetching mock project data and then populates the project list.
3. `useRef` keeps a reference to the search field and focuses it after loading completes.
4. Users can type into the search field to filter projects by name.
5. The "Show details" button toggles a hidden detail section for every card, revealing progress and status information.

## Commit & Git Notes

This project repository has been reset to a fresh commit with a custom author identity and a final commit message set to:

- `GT2 Part 2: useState, useEffect, useRef, custom hooks`

## Recommended Improvements

To make this dashboard stronger, you can add:

- a real API data source instead of mock data
- click-to-select interactions for individual project cards
- animations for detail reveal transitions
- a mobile-first responsive design using Tailwind CSS or custom utility classes

## Licensing

This project is provided as a class assignment demo and is not currently licensed for distribution.

