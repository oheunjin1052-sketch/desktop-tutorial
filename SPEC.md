# Quote Card App — SPEC 요약 (v1.0.0)

## Goal

명언을 감성적인 카드 UI로 제공하고, 발견 → 저장 → 공유 → 재방문 경험을 만든다.

## Stack

HTML5 · CSS3 · Vanilla JavaScript · LocalStorage (No Backend)

## MVP Features

- F01 Today's Quote
- F02 Quote Card (text, author, source, category, theme, background)
- F03 Prev / Next / Touch Swipe
- F04 Categories (8)
- F05 Themes (8)
- F06 Favorites + LocalStorage
- F07 Search
- F08 Share (Web Share / Clipboard)
- F09 Daily Notification **UI only**

## Screens

Home · Explore · Saved · Settings (+ Themes) · Search overlay

## Storage Keys

`favoriteQuotes` · `selectedTheme` · `selectedCategory` · `lastQuote` · `settings`

## Out of Scope (MVP)

React/Vue, Database, Auth, Push Notification 실구현, LLM API Key in frontend

## Design Reference

`xref/xc1503.jpg`, `xref/xc1504.jpg`

