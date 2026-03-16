## Một vài script sẽ dùng nhiều:

```bash
npm run dev
npm run dev:staging

npm run db:generate:dev
npm run db:validate:staging
npm run db:studio:prod

npm run db:migrate:dev
npm run db:deploy:staging
npm run db:deploy:prod
```

```bash
NODE_ENV=development npx tsx src/scripts/seed-dishes.ts
```

Lưu ý nhỏ:

- `db:migrate:dev` phù hợp cho local/dev branch.
- Với staging và production, nên dùng `prisma migrate deploy` để an toàn hơn thay vì `prisma migrate dev`.
