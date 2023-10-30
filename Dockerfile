# Определение базового образа Node.js
FROM node:18

RUN npm install -g http-server
# Установка рабочей директории внутри контейнера
WORKDIR /VUE-APP

# Копирование зависимостей и файла package.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование всех файлов из текущей директории внутрь контейнера
COPY . .

# Установка переменной среды для порта

# Сборка приложения
RUN npm run build

ENV PORT 8080


# Определение команды для запуска приложения
#CMD ["npm", "run", "dev"]
CMD ["http-server", "dist"]