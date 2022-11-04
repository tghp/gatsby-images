cd ./wordpress
zcat database.sql.gz | mysql wordpress
wp search-replace //gatsbyimage.lndo.site //gatsbyimage.tghp.co.uk --allow-root
wp search-replace http://gatsbyimage.tghp.co.uk https://gatsbyimage.tghp.co.uk --allow-root
cd ../