
npm run build --prod 
echo "updating links to ensure that the pages can be easily served e.g. via gh pages"
sed -i 's/href="\//href=".\//g' ../docs/index.html 
sed -i 's/src="\//src=".\//g' ../docs/index.html
sed -i 's/import("\//import(".\//g' ../docs/index.html
cp -r ../docs/_app/ ../docs/app/
sed -i 's/_app/app/g' ../docs/index.html
echo "ready for take off"