GitHub Repository Explorer
Описание проекта
GitHub Repository Explorer - это веб-приложение, построенное на Next.js, которое позволяет:

Искать репозитории GitHub по имени пользователя

Просматривать ключевую статистику репозиториев (звёзды, форки, последнее обновление)

Анализировать активность коммитов через интерактивные графики

Просматривать и фильтровать issues репозиториев

Технологический стек
Next.js (App Router)

TypeScript

React Query (для работы с GitHub API)

Tailwind CSS + CSS Modules (стилизация)

Recharts (визуализация данных)

GitHub GraphQL API

Установка и запуск
Клонируйте репозиторий:

bash
git clone https://github.com/ваш-username/github-repo-explorer.git
Установите зависимости:

bash
npm install
# или
yarn install
# или
pnpm install
Создайте файл .env.local и добавьте ваш GitHub токен:

env
NEXT_PUBLIC_GITHUB_TOKEN=ваш_github_token_здесь
Запустите development сервер:

bash
npm run dev
# или
yarn dev
# или
pnpm dev
Приложение будет доступно по адресу http://localhost:3000
