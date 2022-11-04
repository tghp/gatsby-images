cd wordpress
lando start
lando db-import database.sql.gz
cd ../gatsby
npm install
npm run develop